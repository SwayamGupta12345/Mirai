import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";
import axios from "axios";

export async function POST(req) {
  try {
    const { convoId, userMessageId, aiResponseId } = await req.json();

    if (!convoId || !userMessageId || !aiResponseId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Step 1: Add message pair to `conversations`
    const updateResult = await db.collection("conversations").updateOne(
      { _id: new ObjectId(convoId) },
      {
        $push: {
          messages: {
            userMessageId: new ObjectId(userMessageId),
            aiResponseId: new ObjectId(aiResponseId),
          },
        },
      },
      { upsert: true }
    );

    // Step 2: Get updated conversation
    const conversation = await db
      .collection("conversations")
      .findOne({ _id: new ObjectId(convoId) });

    // Step 3: If it's the first message pair, generate a title
    if (conversation?.messages?.length === 1) {
      // console.log("First message pair added, generating chat title...");
      const messagesCollection = db.collection("messages");

      const userMessage = await messagesCollection.findOne({
        _id: new ObjectId(userMessageId),
      });
      const aiResponse = await messagesCollection.findOne({
        _id: new ObjectId(aiResponseId),
      });

      const summaryInput =
        `Please Generate a title of max 3 words only and return it to me in json format like title:"<title>" D not generate or return anything else i dont need any resposne only 3 words nothing else. I repeat: minimum 2 words, maximum 3. Based on: ${
          userMessage?.text || ""
        } ${aiResponse?.text || ""}`.trim();

      let renameRes;

      try {
        try {
          renameRes = await axios.post(
            process.env.NEXT_PUBLIC_AGENTIC_BACKEND_URL+"/chat",
            {
              user_id: "Name Maker",
              message: summaryInput,
            },
            {
              timeout: 15000,
            }
          );
        } catch (err) {
          if (err.code === "ECONNRESET") {
            console.warn("ECONNRESET, retrying in 2s...");
            await new Promise((res) => setTimeout(res, 2000));
            renameRes = await axios.post(
              process.env.NEXT_PUBLIC_AGENTIC_BACKEND_URL+"/chat",
              {
                user_id: "Name Maker",
                message: summaryInput,
              },
              {
                timeout: 15000,
              }
            );
          } else {
            throw err;
          }
        }
        const raw = renameRes.data?.response;
        // console.log("Rename response:", raw);

        // Extract the title from string using regex
        const match = raw?.match(/"title"\s*:\s*"([^"]{2,35}?)"/i);
        let title;

        if (match && match[1]) {
          title = match[1];
          //console.log("Extracted title:", title);
        } else {
          //console.warn("Title not found in response string.");
          title = "Untitled Chat";
        }

        if (title) {
          //console.log("Generated title:", title);
          await db.collection("chats").updateOne(
            { convoId: new ObjectId(convoId) },
            {
              $set: {
                name: title,
                lastModified: new Date(),
              },
            }
          );
        }
      } catch (err) {
        //console.error("Failed to rename chat:", err.message || err);
      }
    }

    return NextResponse.json({
      success: true,
      modifiedCount: updateResult.modifiedCount,
    });
  } catch (error) {
    //console.error("Error adding message pair:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

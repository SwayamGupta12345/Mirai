// // app/api/delete-ai-chat/route.js
// import { NextResponse } from "next/server";
// import { ObjectId } from "mongodb";
// import { connectToDatabase } from "@/lib/mongodb";

// export async function POST(req) {
//   try {
//     const { chatId, convoId } = await req.json();
//     if (!chatId || !convoId) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }
 
//     const { db } = await connectToDatabase();

//     const convo = await db.collection("conversations").findOne({ _id: new ObjectId(convoId) });
//     if (convo?.messages?.length > 0) {
//       const messageIds = convo.messages.flatMap((msg) => [msg.userMessageId, msg.aiResponseId]);
//       await db.collection("messages").deleteMany({ _id: { $in: messageIds } });
//     }

//     await db.collection("conversations").deleteOne({ _id: new ObjectId(convoId) });
//     await db.collection("chats").deleteOne({ _id: new ObjectId(chatId) });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Delete chat error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
// app/api/delete-ai-chat/route.js
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth"; // Assuming you use NextAuth

export async function POST(req) {
  try {
    const { chatId, convoId } = await req.json();
    if (!chatId || !convoId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ Get current user session
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();

    // Get current user's ObjectId
    const currentUser = await db.collection("users").findOne({ email: session.user.email });
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const currentUserId = currentUser._id;

    const chat = await db.collection("chats").findOne({ _id: new ObjectId(chatId) });
    if (!chat) return NextResponse.json({ error: "Chat not found" }, { status: 404 });

    // Remove current user from owners
    const updatedOwners = chat.owners.filter(owner => owner.toString() !== currentUserId.toString());

    if (updatedOwners.length === 0) {
      // No owners left → delete everything
      const convo = await db.collection("conversations").findOne({ _id: new ObjectId(convoId) });
      if (convo?.messages?.length > 0) {
        const messageIds = convo.messages.flatMap(msg => [msg.userMessageId, msg.aiResponseId]);
        await db.collection("messages").deleteMany({ _id: { $in: messageIds } });
      }
      await db.collection("conversations").deleteOne({ _id: new ObjectId(convoId) });
      await db.collection("chats").deleteOne({ _id: new ObjectId(chatId) });
    } else {
      // Update chat owners array
      await db.collection("chats").updateOne(
        { _id: new ObjectId(chatId) },
        { $set: { owners: updatedOwners } }
      );
    }

    // Remove chat from user's chats_arr
    await db.collection("users").updateOne(
      { _id: new ObjectId(currentUserId) },
      { $pull: { chats_arr: new ObjectId(chatId) } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete chat error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

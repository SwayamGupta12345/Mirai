import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { messageId, chatboxId } = await req.json();
    if (!messageId || !chatboxId) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // 1. Delete message
    await db.collection("frnd_msg").deleteOne({ _id: new ObjectId(messageId) });

    // 2. Remove from chatbox messages array
    await db.collection("chatboxes").updateOne(
      { _id: new ObjectId(chatboxId) },
      { $pull: { messages: new ObjectId(messageId) } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete message failed:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
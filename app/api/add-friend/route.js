import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  try {
    let userEmail, friendEmail, chatboxId;

    try {
      const body = await req.json();
      userEmail = body.userEmail;
      friendEmail = body.friendEmail;
      chatboxId = body.chatboxId;
    } catch (jsonError) {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    if (!userEmail || !friendEmail || !chatboxId) {
      return NextResponse.json({ message: "Missing parameters" }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const userUpdate = await db.collection("users").updateOne(
      { email: userEmail },
      { $addToSet: { frnd_arr: new ObjectId(chatboxId) } }
    );

    const friendUpdate = await db.collection("users").updateOne(
      { email: friendEmail },
      { $addToSet: { frnd_arr: new ObjectId(chatboxId) } }
    );

    if (userUpdate.matchedCount === 0 || friendUpdate.matchedCount === 0) {
      return NextResponse.json({ message: "User or friend not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Friend (chatbox) added successfully" });

  } catch (err) {
    console.error("Add friend failed:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

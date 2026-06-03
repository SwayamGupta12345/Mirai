import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs"; // npm install bcryptjs
import jwt from "jsonwebtoken"; // npm install jsonwebtoken

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }
    const rawName = email.split("@")[0];
    const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    const { db } = await connectToDatabase();

    // Check if user exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date(),
      name: name,
      chats_arr: [],
      frnd_arr: [],
    });

    // Create JWT token
    const token = jwt.sign(
      { id: result.insertedId, email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

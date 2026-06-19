// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function POST() {
//   const response = NextResponse.json(
//     { message: "Logged out successfully" },
//     { status: 200 }
//   );

//   const cookieStore = await cookies();

//   // Remove ALL your app cookies here
//   const allCookies = cookieStore.getAll();

//   for (const c of allCookies) {
//     response.cookies.set(c.name, "", {
//       expires: new Date(0),
//       path: "/",
//     });
//   }

//   return response;
// }

// app/api/logout/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  // delete all cookies
  for (const c of allCookies) {
    response.cookies.set(c.name, "", {
      expires: new Date(0),
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
  }

  // explicitly kill these in case they're missed
  const cookiesToKill = [
    "auth_token",
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
    "next-auth.csrf-token",
    "__Secure-next-auth.csrf-token",
    "next-auth.callback-url",
    "__Secure-next-auth.callback-url",
  ];

  for (const name of cookiesToKill) {
    response.cookies.set(name, "", {
      expires: new Date(0),
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
  }

  return response;
}
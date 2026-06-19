// // proxy.js (at project root, same level as app/ or pages/)
// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// export async function proxy(request) {
//   const { pathname } = request.nextUrl;

//   const jwtToken = request.cookies.get("auth_token")?.value;
//   const nextAuthToken =
//     request.cookies.get("next-auth.session-token")?.value ||
//     request.cookies.get("__Secure-next-auth.session-token")?.value;

//   // ✅ Prevent crash if ENV is missing
//   if (!process.env.JWT_SECRET) {
//     console.error("❌ JWT_SECRET is missing in environment!");
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   const secret = new TextEncoder().encode(process.env.JWT_SECRET);

//   if (jwtToken) {
//     try {
//       await jwtVerify(jwtToken, secret);
//       return NextResponse.next();
//     } catch (error) {
//       console.error("❌ JWT invalid or expired:", error.message);

//       const response = NextResponse.redirect(new URL("/", request.url));
//       response.cookies.delete("auth_token");

//       return response;
//     }
//   }

//   if (nextAuthToken) {
//     return NextResponse.next();
//   }

//   const response = NextResponse.redirect(new URL("/", request.url));
//   return response;
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/chat/:path*", "/ask-doubt/:path*", "/profile/:path*"],
// };


// proxy.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getToken } from "next-auth/jwt";

export async function proxy(request) {
  const jwtToken = request.cookies.get("auth_token")?.value;

  if (!process.env.JWT_SECRET) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // Check custom JWT
  if (jwtToken) {
    try {
      await jwtVerify(jwtToken, secret);
      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("auth_token");
      return response;
    }
  }

  // Check NextAuth session properly
  const nextAuthToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (nextAuthToken) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/chat/:path*",
    "/ask-doubt/:path*",
    "/profile/:path*",
  ],
};
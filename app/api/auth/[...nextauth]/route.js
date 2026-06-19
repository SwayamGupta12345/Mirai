import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [

    // ✅ Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ✅ Manual Email + Password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const { db } = await connectToDatabase()

        const user = await db.collection("users").findOne({
          email: credentials.email
        })

        if (!user) throw new Error("User not found")

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isMatch) throw new Error("Incorrect password")

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || ""
        }
      }
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60
  },

  callbacks: {
    async signIn({ user }) {
      try {
        const { db } = await connectToDatabase()

        const existingUser = await db.collection("users")
          .findOne({ email: user.email })

        if (!existingUser) {
          const newUser = await db.collection("users").insertOne({
            email: user.email,
            name: user.name || "",
            createdAt: new Date(),
            password: "",      // google users
            nickname: "",
            chats_arr: [],
            frnd_arr: []
          })

          user.id = newUser.insertedId.toString()
        } else {
          user.id = existingUser._id.toString()
        }

        return true

      } catch (err) {
        console.error(err)
        return false
      }
    },

    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },

    async session({ session, token }) {
      session.user.id = token.id
      return session
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`
    }
  },

  pages: {
    signIn: "/login"
  },

  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

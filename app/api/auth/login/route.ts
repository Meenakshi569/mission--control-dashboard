import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // For demo purposes, we'll use hardcoded credentials
    // In production, you should hash passwords and store them in the database
    if (username === "admin" && password === "password") {
      const token = generateToken({ username })

      const response = NextResponse.json({ success: true })
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400, // 24 hours
      })

      return response
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

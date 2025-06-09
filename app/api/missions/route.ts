import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Mission from "@/lib/models/Mission"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const missions = await Mission.find({}).sort({ createdAt: -1 })
    return NextResponse.json(missions)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    const { title, description, status, startTime, endTime, location } = body

    if (!title || !description || !startTime) {
      return NextResponse.json({ error: "Title, description, and start time are required" }, { status: 400 })
    }

    const mission = new Mission({
      title,
      description,
      status: status || "active",
      startTime: new Date(startTime),
      endTime: endTime ? new Date(endTime) : undefined,
      location,
    })

    await mission.save()
    return NextResponse.json(mission, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

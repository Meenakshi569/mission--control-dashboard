import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Mission from "@/lib/models/Mission"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = getTokenFromRequest(request)
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const mission = await Mission.findById(params.id)

    if (!mission) {
      return NextResponse.json({ error: "Mission not found" }, { status: 404 })
    }

    return NextResponse.json(mission)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = getTokenFromRequest(request)
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    const mission = await Mission.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })

    if (!mission) {
      return NextResponse.json({ error: "Mission not found" }, { status: 404 })
    }

    return NextResponse.json(mission)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = getTokenFromRequest(request)
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const mission = await Mission.findByIdAndDelete(params.id)

    if (!mission) {
      return NextResponse.json({ error: "Mission not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

const express = require("express")
const Mission = require("../models/Mission")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all missions
router.get("/", auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query

    const filter = {}
    if (status) filter.status = status

    const missions = await Mission.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Mission.countDocuments(filter)

    res.json({
      missions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    console.error("Get missions error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Get single mission
router.get("/:id", auth, async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id)

    if (!mission) {
      return res.status(404).json({ error: "Mission not found" })
    }

    res.json(mission)
  } catch (error) {
    console.error("Get mission error:", error)
    if (error.name === "CastError") {
      return res.status(404).json({ error: "Mission not found" })
    }
    res.status(500).json({ error: "Server error" })
  }
})

// Create mission
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, status, startTime, endTime, location } = req.body

    if (!title || !description || !startTime) {
      return res.status(400).json({
        error: "Title, description, and start time are required",
      })
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
    res.status(201).json(mission)
  } catch (error) {
    console.error("Create mission error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Update mission
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, status, startTime, endTime, location } = req.body

    const updateData = {}
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (status) updateData.status = status
    if (startTime) updateData.startTime = new Date(startTime)
    if (endTime) updateData.endTime = new Date(endTime)
    if (location !== undefined) updateData.location = location

    const mission = await Mission.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true })

    if (!mission) {
      return res.status(404).json({ error: "Mission not found" })
    }

    res.json(mission)
  } catch (error) {
    console.error("Update mission error:", error)
    if (error.name === "CastError") {
      return res.status(404).json({ error: "Mission not found" })
    }
    res.status(500).json({ error: "Server error" })
  }
})

// Delete mission
router.delete("/:id", auth, async (req, res) => {
  try {
    const mission = await Mission.findByIdAndDelete(req.params.id)

    if (!mission) {
      return res.status(404).json({ error: "Mission not found" })
    }

    res.json({ message: "Mission deleted successfully" })
  } catch (error) {
    console.error("Delete mission error:", error)
    if (error.name === "CastError") {
      return res.status(404).json({ error: "Mission not found" })
    }
    res.status(500).json({ error: "Server error" })
  }
})

// Get mission statistics
router.get("/stats/overview", auth, async (req, res) => {
  try {
    const total = await Mission.countDocuments()
    const active = await Mission.countDocuments({ status: "active" })
    const completed = await Mission.countDocuments({ status: "completed" })

    res.json({
      total,
      active,
      completed,
    })
  } catch (error) {
    console.error("Get stats error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router

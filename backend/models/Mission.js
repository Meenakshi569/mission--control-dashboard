const mongoose = require("mongoose")

const MissionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  },
)

// Index for better query performance
MissionSchema.index({ status: 1, createdAt: -1 })

module.exports = mongoose.model("Mission", MissionSchema)

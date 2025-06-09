"use client"

import { useState, useEffect } from "react"

const Timer = ({ startTime, className = "" }) => {
  const [elapsed, setElapsed] = useState("00:00:00")

  useEffect(() => {
    const updateTimer = () => {
      const start = new Date(startTime).getTime()
      const now = new Date().getTime()
      const diff = now - start

      if (diff < 0) {
        setElapsed("00:00:00")
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setElapsed(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      )
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  return <div className={`font-mono ${className}`}>{elapsed}</div>
}

export default Timer

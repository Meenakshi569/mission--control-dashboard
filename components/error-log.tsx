"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LogEntry {
  id: string
  timestamp: string
  level: "info" | "warning" | "error"
  message: string
}

interface ErrorLogProps {
  missionId: string
}

export function ErrorLog({ missionId }: ErrorLogProps) {
  const [logs, setLogs] = useState<LogEntry[]>([])

  useEffect(() => {
    // Simulate log entries for demo purposes
    const simulatedLogs: LogEntry[] = [
      {
        id: "1",
        timestamp: new Date().toISOString(),
        level: "info",
        message: "Mission started successfully",
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 300000).toISOString(),
        level: "info",
        message: "All systems operational",
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 600000).toISOString(),
        level: "warning",
        message: "Communication delay detected",
      },
      {
        id: "4",
        timestamp: new Date(Date.now() - 900000).toISOString(),
        level: "info",
        message: "Mission parameters updated",
      },
    ]

    setLogs(simulatedLogs)
  }, [missionId])

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <ScrollArea className="h-64">
      <div className="space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Badge variant="secondary" className={getLevelColor(log.level)}>
              {log.level.toUpperCase()}
            </Badge>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{log.message}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(log.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No logs available for this mission.</p>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}

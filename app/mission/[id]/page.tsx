"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, MapPin, Calendar, Trash2 } from "lucide-react"
import Link from "next/link"
import { Timer } from "@/components/timer"
import { MapView } from "@/components/map-view"
import { ErrorLog } from "@/components/error-log"

interface Mission {
  _id: string
  title: string
  description: string
  status: "active" | "completed"
  startTime: string
  endTime?: string
  location?: string
  createdAt: string
  updatedAt: string
}

export default function MissionDetails() {
  const [mission, setMission] = useState<Mission | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      fetchMission(params.id as string)
    }
  }, [params.id])

  const fetchMission = async (id: string) => {
    try {
      const response = await fetch(`/api/missions/${id}`)
      if (response.ok) {
        const data = await response.json()
        setMission(data)
      } else if (response.status === 401) {
        router.push("/login")
      } else {
        setError("Mission not found")
      }
    } catch (error) {
      setError("Error fetching mission details")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (newStatus: "active" | "completed") => {
    if (!mission) return

    try {
      const response = await fetch(`/api/missions/${mission._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...mission, status: newStatus }),
      })

      if (response.ok) {
        const updatedMission = await response.json()
        setMission(updatedMission)
      }
    } catch (error) {
      console.error("Error updating mission:", error)
    }
  }

  const handleDelete = async () => {
    if (!mission || !confirm("Are you sure you want to delete this mission?")) return

    try {
      const response = await fetch(`/api/missions/${mission._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error deleting mission:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading mission details...</p>
        </div>
      </div>
    )
  }

  if (error || !mission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mission Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/dashboard">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 ml-4">Mission Details</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusUpdate(mission.status === "active" ? "completed" : "active")}
              >
                Mark as {mission.status === "active" ? "Completed" : "Active"}
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mission Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{mission.title}</CardTitle>
                    <CardDescription className="mt-2">
                      Created on {new Date(mission.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={mission.status === "active" ? "default" : "secondary"}
                    className={`text-sm ${mission.status === "active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                  >
                    {mission.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{mission.description}</p>
              </CardContent>
            </Card>

            {/* Mission Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Start Time:</span>
                  </div>
                  <span className="text-sm">{new Date(mission.startTime).toLocaleString()}</span>
                </div>

                {mission.endTime && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">End Time:</span>
                    </div>
                    <span className="text-sm">{new Date(mission.endTime).toLocaleString()}</span>
                  </div>
                )}

                {mission.location && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">Location:</span>
                    </div>
                    <span className="text-sm">{mission.location}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Map View */}
            {mission.location && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MapView location={mission.location} />
                </CardContent>
              </Card>
            )}

            {/* Error Logs */}
            <Card>
              <CardHeader>
                <CardTitle>Mission Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <ErrorLog missionId={mission._id} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timer Card */}
            {mission.status === "active" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Mission Timer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <Timer startTime={mission.startTime} className="text-2xl font-mono" />
                    <p className="text-sm text-gray-500 mt-2">Time elapsed</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge variant={mission.status === "active" ? "default" : "secondary"}>{mission.status}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Created:</span>
                  <span className="text-sm">{new Date(mission.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Updated:</span>
                  <span className="text-sm">{new Date(mission.updatedAt).toLocaleDateString()}</span>
                </div>
                {mission.location && (
                  <>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm">{mission.location}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Timer from "../components/Timer"
import MapView from "../components/MapView"
import ErrorLog from "../components/ErrorLog"
import api from "../services/api"
import { ArrowLeft, Clock, MapPin, Calendar, Trash2, AlertCircle } from "lucide-react"

const MissionDetails = () => {
  const [mission, setMission] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchMission()
  }, [id])

  const fetchMission = async () => {
    try {
      const response = await api.get(`/missions/${id}`)
      setMission(response.data)
    } catch (error) {
      setError("Mission not found")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await api.put(`/missions/${id}`, {
        ...mission,
        status: newStatus,
      })
      setMission(response.data)
    } catch (error) {
      console.error("Error updating mission:", error)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this mission?")) return

    try {
      await api.delete(`/missions/${id}`)
      navigate("/dashboard")
    } catch (error) {
      console.error("Error deleting mission:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p>Loading mission details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !mission) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mission Not Found</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link to="/dashboard" className="btn-primary flex items-center mx-auto w-fit">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/dashboard" className="btn-secondary flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleStatusUpdate(mission.status === "active" ? "completed" : "active")}
              className="btn-secondary"
            >
              Mark as {mission.status === "active" ? "Completed" : "Active"}
            </button>
            <button onClick={handleDelete} className="btn-danger flex items-center">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mission Overview */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{mission.title}</h1>
                    <p className="text-gray-600 mt-1">Created on {new Date(mission.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={mission.status === "active" ? "status-active" : "status-completed"}>
                    {mission.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed">{mission.description}</p>
              </div>
            </div>

            {/* Mission Timeline */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Timeline
                </h2>
              </div>
              <div className="p-6 space-y-4">
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
              </div>
            </div>

            {/* Map View */}
            {mission.location && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location Map
                  </h2>
                </div>
                <div className="p-6">
                  <MapView location={mission.location} />
                </div>
              </div>
            )}

            {/* Error Logs */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Mission Logs</h2>
              </div>
              <div className="p-6">
                <ErrorLog missionId={mission._id} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timer Card */}
            {mission.status === "active" && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-center">Mission Timer</h3>
                </div>
                <div className="p-6">
                  <div className="text-center">
                    <Timer startTime={mission.startTime} className="text-2xl font-mono" />
                    <p className="text-sm text-gray-500 mt-2">Time elapsed</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Quick Stats</h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={mission.status === "active" ? "status-active" : "status-completed"}>
                    {mission.status}
                  </span>
                </div>
                <hr />
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
                    <hr />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm">{mission.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MissionDetails

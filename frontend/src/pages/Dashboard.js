"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Timer from "../components/Timer"
import api from "../services/api"
import { Clock, MapPin, Eye, Plus } from "lucide-react"

const Dashboard = () => {
  const [missions, setMissions] = useState([])
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [missionsResponse, statsResponse] = await Promise.all([
        api.get("/missions"),
        api.get("/missions/stats/overview"),
      ])

      setMissions(missionsResponse.data.missions || missionsResponse.data)
      setStats(statsResponse.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const activeMissions = missions.filter((m) => m.status === "active")

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p>Loading missions...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Missions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Missions</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Missions</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
              </div>
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Active Missions */}
        {activeMissions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-green-700">Active Missions</h2>
            <div className="grid gap-4">
              {activeMissions.map((mission) => (
                <div
                  key={mission._id}
                  className="bg-white rounded-lg shadow mission-card border-l-4 border-l-green-500"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{mission.title}</h3>
                          <span className="status-active">Active</span>
                        </div>
                        <p className="text-gray-600 mb-3">{mission.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Started: {new Date(mission.startTime).toLocaleString()}
                          </div>
                          {mission.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {mission.location}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Timer startTime={mission.startTime} className="text-lg" />
                        <Link to={`/mission/${mission._id}`} className="btn-secondary flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Missions Table */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">All Missions</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {missions.map((mission) => (
                    <tr key={mission._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{mission.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{mission.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={mission.status === "active" ? "status-active" : "status-completed"}>
                          {mission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(mission.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mission.location || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link to={`/mission/${mission._id}`} className="btn-secondary flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {missions.length === 0 && (
          <div className="text-center py-12">
            <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No missions yet</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first mission.</p>
            <Link to="/create-mission" className="btn-primary flex items-center mx-auto w-fit">
              <Plus className="h-4 w-4 mr-2" />
              Create Mission
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard

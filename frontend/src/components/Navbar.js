"use client"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Plus, LogOut, Shield } from "lucide-react"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <Link to="/dashboard" className="text-2xl font-bold text-gray-900">
              Mission Control
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/create-mission" className="btn-primary flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              New Mission
            </Link>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Welcome, {user?.username}</span>
              <button onClick={handleLogout} className="btn-secondary flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

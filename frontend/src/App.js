import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import CreateMission from "./pages/CreateMission";
import MissionDetails from "./pages/MissionDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> {/* ✅ ADD THIS LINE */}
            <Route path="/" element={<Navigate to="/dashboard" />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-mission"
              element={
                <ProtectedRoute>
                  <CreateMission />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mission/:id"
              element={
                <ProtectedRoute>
                  <MissionDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

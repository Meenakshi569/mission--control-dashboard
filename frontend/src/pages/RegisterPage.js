// src/pages/RegisterPage.js
import React, { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      setMsg("Registered successfully");
    } catch (err) {
      setMsg(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h2 style={styles.heading}>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>

        {msg && <p style={styles.message}>{msg}</p>}
      </form>
    </div>
  );
}

// Inline CSS styles
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f2f2f2",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "2rem",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "1.5rem",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    margin: "0.5rem 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "1rem",
  },
  message: {
    marginTop: "1rem",
    color: "red",
    fontWeight: "bold",
  },
};

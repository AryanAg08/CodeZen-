import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem("token", "mock-token"); // Mock token
      navigate("/dashboard");
    }
  };

  return (
    <div style={{ backgroundColor: "#1e1e1e", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
      <h2 style={{ marginBottom: "20px" }}>Sign In</h2>
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", marginBottom: "10px", width: "250px", borderRadius: "4px", border: "none" }}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px", width: "250px", borderRadius: "4px", border: "none" }}
      />
      <button onClick={handleLogin} style={{ padding: "10px 20px", backgroundColor: "#4fc3f7", border: "none", borderRadius: "4px", color: "#000", fontWeight: "bold" }}>
        Log In
      </button>
    </div>
  );
}

export default Login;

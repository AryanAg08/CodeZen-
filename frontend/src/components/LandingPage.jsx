import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#1e1e1e", height: "100vh", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Welcome to CodeZen</h1>
      <p style={{ marginBottom: "2rem", fontSize: "1.1rem", color: "#ccc" }}>
        A collaborative and powerful online code editor
      </p>
      <div>
        <button onClick={() => navigate("/login")} style={{ padding: "10px 20px", backgroundColor: "#4fc3f7", border: "none", color: "#000", fontWeight: "bold", marginRight: "10px", borderRadius: "4px", cursor: "pointer" }}>
          Sign In
        </button>
        <button onClick={() => navigate("/signup")} style={{ padding: "10px 20px", backgroundColor: "#4fc3f7", border: "none", color: "#000", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

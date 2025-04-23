import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { starryNight } from "../styles/starry";

function LandingPage() {
  const canvasRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    const animate = starryNight(canvas, ctx);
    const interval = setInterval(animate, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          background: "linear-gradient(to right, rgba(1, 82, 102, 0.8), rgba(0,0,0,0.6))",
          color: "white",
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
        }}
      >
      {/* Logo + Brand Name */}
       <div style={{ display: "flex", alignItems: "center", marginRight: "auto" }}>
      <img
      src="/logo.png" 
      alt="Logo"
      style={{ height: "40px", marginRight: "10px" }}
      />
      <h2 style={{ margin: 0 }}>CodeZen</h2>
      </div>

        <button
          onClick={() => navigate("/login")}
          style={{
            background: "linear-gradient(to right, #82d6ff, #e584fc)",
            border: "none",
            borderRadius: "4px",
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            marginRight: "4rem",
          }}
        >
          Login
        </button>
      </nav>

      {/* Welcome Section */}
      <section
        id="home"
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          paddingTop: "4rem",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            animation: "bounceFade 2s ease-in-out",
          }}
        >
          Welcome to CodeZen
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            marginTop: "1rem",
            animation: "fadeIn 3s ease-in-out",
          }}
        >
          A powerful online code editor
        </p>
      </section>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceFade {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(10px);
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default LandingPage;

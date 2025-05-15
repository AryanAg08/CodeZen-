import React, { useState } from "react";
import axios from "axios";
import "../styles/LoginSignup.css";
import { useNavigate } from "react-router-dom";  

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      resetForm(); 
      if (isLogin) {
        // Login
        // response = await axios.post("http://localhost:8080/api/auth/login", {
        //   email,
        //   password,
        // });
       // console.log("Login Success:", response.data);
        navigate("/dashboard");
      } else {
        // Signup
        response = await axios.post("http://localhost:8080/api/auth/signup", {
          username,
          email,
          password,
        });
        console.log("Signup Success:", response.data);
        resetForm(); 
        setIsLogin(true); 
      }
    } catch (error) {
      console.error("Auth Error:", error);
      setError(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="login-signup-wrapper">
      <div className={`login-signup-container ${isLogin ? "login-mode" : "signup-mode"}`}>
        <form onSubmit={handleSubmit} className="animated-form">
          <h2 className="form-title">{isLogin ? "Login" : "Sign Up"}</h2>

          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {error && <p className="error-message">{error}</p>}

          <p className="switch-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span className="switch-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Sign up" : " Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;
// Modifications that can be done 
// - JWT Token
// - Email Verification
// - Forgot Password
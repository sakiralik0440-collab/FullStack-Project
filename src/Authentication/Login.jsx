import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/login.css";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newError = {};

    if (!emailRegex.test(formData.email)) newError.email = "Enter a valid email";
    if (!formData.password.trim()) newError.password = "Password is required";

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(result.message);
        setIsError(false);

        // Save user in context & localStorage
        localStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);

        navigate("/home"); // go to home after login
      } else {
        setMessage(result.message || "Login Failed");
        setIsError(true);
      }

    } catch (err) {
      console.log(err);
      setMessage("Server not responding");
      setIsError(true);
    }
  };

  const handleReset = () => {
    setFormData({ email: "", password: "" });
    setError({});
    setMessage("");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>
        <p className="subtitle">Welcome back to Quiz App</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {error.email && <p className="error">{error.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {error.password && <p className="error">{error.password}</p>}

          <div className="btn-group">
            <button type="submit" className="login-btn">Login</button>
            <button type="reset" onClick={handleReset} className="reset-btn">Reset</button>
          </div>
        </form>

        {message && <p className={isError ? "error" : "success"}>{message}</p>}

        <p className="switch-auth">
          Don't have an account?{" "}
          <button
            className="switch-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
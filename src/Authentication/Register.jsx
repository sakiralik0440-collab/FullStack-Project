import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Register.css";
import { UserContext } from "../Context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({ name: "", email: "", password: "", contact: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation skipped for brevity

    const res = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (res.ok) {
      // Save user in localStorage & context
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);

      navigate("/home/my-results"); // redirect to My Results
    } else {
      setMessage(result.message || "Registration failed");
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", password: "", contact: "" });
    setError({});
    setMessage("");
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join us and start your learning journey</p>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
          <input type="tel" name="contact" placeholder="Enter contact number" value={formData.contact} onChange={handleChange} />

          <div className="btn-group">
            <button type="submit" className="register-btn">Register</button>
            <button type="reset" onClick={handleReset} className="reset-btn">Reset</button>
          </div>
        </form>

        {message && <p className="error">{message}</p>}

        <p className="switch-auth">
          Already have an account?{" "}
          <button className="switch-btn" onClick={() => navigate("/")}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
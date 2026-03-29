import React, { useState } from "react";
import "../CSS/Feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Mono: "",
    Response: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  const MoboRegex = /^[0-9]{10}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validationForm = () => {
    let newError = {};

    if (formData.Name.trim().length < 5) {
      newError.Name = "Enter your name minimum 5 characters";
    }

    if (!MoboRegex.test(formData.Mono)) {
      newError.Mono = "Mobile number must be exactly 10 digits";
    }

    if (formData.Response.trim().length < 40) {
      newError.Response = "Your response must be at least 40 characters";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validationForm()) return;

    try {
      const res = await fetch("http://localhost:4000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(result.message || "Feedback Submitted Successfully");
        setIsError(false);
        setFormData({ Name: "", Mono: "", Response: "" });
      } else {
        setMessage(result.message || "Submission Failed");
        setIsError(true);
      }
    } catch {
      setMessage("Server is not responding");
      setIsError(true);
    }
  };

  const handleReset = () => {
    setFormData({ Name: "", Mono: "", Response: "" });
    setError({});
    setMessage("");
  };

  return (
    <div className="feedback-wrapper">

      <div className="feedback-card">

        <h2>Give Feedback</h2>
        <p className="subtitle">We value your honest feedback</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="Name"
            placeholder="Enter Your Name"
            value={formData.Name}
            onChange={handleChange}
          />
          {error.Name && <p className="error">{error.Name}</p>}

          <input
            type="text"
            name="Mono"
            placeholder="Enter Mobile Number"
            value={formData.Mono}
            onChange={handleChange}
          />
          {error.Mono && <p className="error">{error.Mono}</p>}

          <textarea
            name="Response"
            placeholder="Write your feedback..."
            value={formData.Response}
            onChange={handleChange}
            rows="5"
          />
          {error.Response && <p className="error">{error.Response}</p>}

          <div className="btn-group">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" onClick={handleReset} className="reset-btn">
              Reset
            </button>
          </div>

        </form>

        {message && (
          <p className={isError ? "error" : "success"}>{message}</p>
        )}

      </div>

    </div>
  );
};

export default Feedback;


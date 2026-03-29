import React, { useState } from "react";
import "../CSS/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Mobo: "",
    Problem: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^[0-9]{10}$/;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validationForm = () => {
    let newError = {};

    if (formData.Name.trim().length < 5) {
      newError.Name = "Enter at least 5 characters";
    }

    if (!emailRegex.test(formData.Email)) {
      newError.Email = "Enter valid email";
    }

    if (!contactRegex.test(formData.Mobo)) {
      newError.Mobo = "Enter only 10 digits";
    }

    if (formData.Problem.trim().length < 20) {
      newError.Problem = "Enter at least 20 characters";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validationForm()) return;

    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(result.message);
        setIsError(false);
        setFormData({
          Name: "",
          Email: "",
          Mobo: "",
          Problem: "",
        });
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
    setFormData({
      Name: "",
      Email: "",
      Mobo: "",
      Problem: "",
    });
    setError({});
    setMessage("");
  };

  return (
    <div className="contact-wrapper">

      <div className="contact-card">

        <h2>Contact Us</h2>
        <p className="subtitle">Send us your query and we will help you</p>

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
            name="Email"
            placeholder="Enter Your Email"
            value={formData.Email}
            onChange={handleChange}
          />
          {error.Email && <p className="error">{error.Email}</p>}

          <input
            type="tel"
            name="Mobo"
            placeholder="Enter Your Contact Number"
            value={formData.Mobo}
            onChange={handleChange}
          />
          {error.Mobo && <p className="error">{error.Mobo}</p>}

          <textarea
            name="Problem"
            placeholder="Describe your problem..."
            value={formData.Problem}
            onChange={handleChange}
            rows="4"
          />
          {error.Problem && <p className="error">{error.Problem}</p>}

          <div className="btn-group">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
          </div>

        </form>

        {message && (
          <p className={isError ? "error" : "success"}>{message}</p>
        )}

      </div>

    </div>
  );
};

export default Contact;

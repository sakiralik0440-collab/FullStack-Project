import React from "react";
import "../CSS/about.css";

const About = () => {
  return (
    <div className="about-page">

      <div className="about-container">

        <h1 className="about-title">About Quiz-Web</h1>

        <p className="about-description">
          Quiz-Web is an interactive platform where students can test their
          knowledge through engaging quizzes. Each quiz contains 15 questions
          and provides instant feedback so users can evaluate their
          performance and improve their understanding of different subjects.
        </p>

        {/* Statistics */}
        <div className="about-stats">

          <div className="stat-box">
            <h2>15+</h2>
            <p>Questions per Quiz</p>
          </div>

          <div className="stat-box">
            <h2>5+</h2>
            <p>Quiz Categories</p>
          </div>

          <div className="stat-box">
            <h2>100+</h2>
            <p>Quiz Attempts</p>
          </div>

        </div>

        {/* Features */}
        <div className="about-features">

          <div className="feature-card">
            <h3>🧠 Knowledge Testing</h3>
            <p>
              Test your knowledge through multiple quiz categories
              designed for learning and practice.
            </p>
          </div>

          <div className="feature-card">
            <h3>⚡ Instant Results</h3>
            <p>
              Get your results immediately after finishing the quiz
              with correct and wrong answers.
            </p>
          </div>

          <div className="feature-card">
            <h3>📱 Responsive Design</h3>
            <p>
              The platform works smoothly on desktop, tablet,
              and mobile devices.
            </p>
          </div>

        </div>

        {/* Developer */}
        <div className="developer">
          <h2>Developed By</h2>
          <p>
            Sakirali Kodaliya – Full Stack Developer (React.js)
          </p>
        </div>

      </div>

    </div>
  );
};

export default About;
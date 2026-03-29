import React from "react";
import "../CSS/header.css";

const Header = () => {
  return (
    <header className="header">

      <div className="header-content">

        <h1 className="header-title">
          Test Your Knowledge with Quiz-Web
        </h1>

        <p className="header-subtitle">
          Challenge yourself with interactive quizzes, improve your thinking,
          and track your progress with fun and engaging questions.
        </p>

        <div className="header-line"></div>

      </div>

    </header>
  );
};

export default Header;
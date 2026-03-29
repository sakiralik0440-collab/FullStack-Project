import React from "react";
import { useNavigate } from "react-router-dom";
import HomeData from "../JSON/HomeData.json";
import "../CSS/home.css";
import Header from "../Components/Header";

const Home = () => {

  const navigate = useNavigate();

  return (
    <>
    <Header/>
    <div className="home-wrapper">

      <h2 className="home-title">
        🧠 Test Your Knowledge
      </h2>

      <p className="home-subtitle">
        Choose a quiz category and challenge yourself.
      </p>

      <div className="course-container">

        {HomeData.Courses.map((quiz) => (

          <div
            key={quiz.CourseID}
            className="course-card"
            onClick={() => navigate(`/home/questions/${quiz.CourseID}`)}
          >

            <div className="course-image">
              <img src={quiz.image} alt={quiz.CourseName} />
            </div>

            <h3 className="course-name">
              {quiz.CourseName}
            </h3>

            {/* Description from JSON */}
            <p className="course-desc">
              {quiz.description}
            </p>

            <button className="start-btn">
              Start Quiz →
            </button>

          </div>

        ))}

      </div>

    </div>
    </>
  );
};

export default Home;
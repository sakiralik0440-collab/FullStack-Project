import { useParams } from "react-router-dom";
import { useState } from "react";
import HomeData from "../JSON/HomeData.json";
import axios from "axios";
import "../CSS/question.css";

const Question = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const { id } = useParams();

  const selectedCourse = HomeData.Courses.find(
    (course) => course.CourseID === Number(id)
  );

  if (!selectedCourse) {
    return <h2>Course Not Found</h2>;
  }

  const currentQuestion = selectedCourse.questions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleSubmit = async () => {
    let newScore = score;

    if (selectedAnswer === currentQuestion.CorrectAnswer) {
      newScore = score + 1;
      setScore(newScore);
    }

    setSelectedAnswer("");

    if (currentQuestionIndex < selectedCourse.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const loggedUser = JSON.parse(localStorage.getItem("user"));

      const resultData = {
        userId: loggedUser?._id || "anonymous",
        courseName: selectedCourse.CourseName,
        totalQuestions: selectedCourse.questions.length,
        correctAnswers: newScore,
        wrongAnswers: selectedCourse.questions.length - newScore,
      };

      try {
        const res = await axios.post(
          "http://localhost:4000/api/save-result",
          resultData
        );
        console.log("Result saved:", res.data);
      } catch (err) {
        console.log("Error saving result:", err);
      }

      setShowResult(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedCourse.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Quiz Finished");
    }
  };

  if (showResult) {
    return (
      <div className="quiz-result">
        <h2>Quiz Result</h2>
        <h3>Total Questions: {selectedCourse.questions.length}</h3>
        <h3>Correct Answers: {score}</h3>
        <h3>Wrong Answers: {selectedCourse.questions.length - score}</h3>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>{selectedCourse.CourseName} Quiz</h2>

      <h3>
        Question {currentQuestionIndex + 1} /{" "}
        {selectedCourse.questions.length}
      </h3>

      <p className="question">{currentQuestion.question}</p>

      <ul className="options">
        {["option1", "option2", "option3", "option4"].map((opt) => (
          <li
            key={opt}
            className={selectedAnswer === opt ? "active" : ""}
            onClick={() => handleOptionSelect(opt)}
          >
            <input
              type="radio"
              checked={selectedAnswer === opt}
              readOnly
            />
            {currentQuestion[opt]}
          </li>
        ))}
      </ul>

      <div className="btn-group">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleNext}>Skip</button>
      </div>
    </div>
  );
};

export default Question;
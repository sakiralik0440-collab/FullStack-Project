import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/myresults.css";

const MyResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser?._id) {
      axios.get(`http://localhost:4000/api/my-results/${loggedUser._id}`)
        .then(res => setResults(res.data))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <h3>Loading your results...</h3>;
  if (!results.length) return <h3>No results yet</h3>;

  return (
    <div className="my-results">
      <h2>My Quiz Results</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Total</th>
            <th>Correct</th>
            <th>Wrong</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.courseName}</td>
              <td>{r.totalQuestions}</td>
              <td>{r.correctAnswers}</td>
              <td>{r.wrongAnswers}</td>
              <td>{new Date(r.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyResults;
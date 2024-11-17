"use client";

import { useState } from "react";
import "./game.css";
import Link from "next/link";

export default function Game() {
  const [points, setPoints] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [cryptoCount, setCryptoCount] = useState(0);
  const [feedback, setFeedback] = useState("");

  const questions = [
    {
      question: "Which of the following is an example of a fixed expense?",
      options: ["Groceries", "Rent", "Entertainment", "Travel"],
      correct: 1,
    },
    // Additional questions can be added here
  ];

  const handleAnswer = (index) => {
    if (index === questions[questionIndex].correct) {
      setFeedback("Correct!");
      const newPoints = points + 5;
      setPoints(newPoints);

      if (newPoints >= 50) {
        setCryptoCount(cryptoCount + 1);
        setPoints(0);
      }
    } else {
      setFeedback("Wrong! Try Again.");
    }

    setTimeout(() => {
      setFeedback("");
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        setQuestionIndex(0);
      }
    }, 1000);
  };

  const resetGame = () => {
    setPoints(0);
    setQuestionIndex(0);
    setCryptoCount(0);
    setFeedback("");
  };

  return (
    <div className="game-container">
      
      <header className="banner">
        <h1>Knowledge Quiz</h1>
        <p>Earn points and unlock rewards while testing your knowledge!</p>
      </header>

      <div className="game-stats">
        <div className="stat-box">
          <h2>Points</h2>
          <p>{points}</p>
        </div>
        <div className="stat-box">
          <h2>Crypto Earned</h2>
          <p>{cryptoCount}</p>
        </div>
      </div>

      <div className="question-container">
        <h3>{questions[questionIndex].question}</h3>
        <div className="options-container">
          {questions[questionIndex].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="option-button"
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && (
          <div
            className={`feedback-message ${
              feedback === "Correct!" ? "feedback-correct" : "feedback-wrong"
            }`}
          >
            {feedback}
          </div>
        )}
      </div>

      <div className="controls-container">
        <button onClick={resetGame} className="reset-button">
          Reset Game
        </button>
        <Link href="/">
          <button className="back-button">Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

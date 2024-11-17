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
      question: "What is the capital of France?",
      options: ["Paris", "London", "Rome", "Berlin"],
      correct: 0,
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: 1,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 1,
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      correct: 2,
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Shakespeare", "Hemingway", "Tolkien", "Dickens"],
      correct: 0,
    },
  ];

  const handleAnswer = (index) => {
    if (index === questions[questionIndex].correct) {
      setFeedback("Correct!");
      const newPoints = points + 5;
      setPoints(newPoints);

      if (newPoints >= 50) {
        setCryptoCount(cryptoCount + 1);
        setPoints(0); // Reset points after earning a crypto
      }
    } else {
      setFeedback("Wrong! Try Again.");
    }

    // Move to the next question or restart the game
    setTimeout(() => {
      setFeedback("");
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        setQuestionIndex(0); // Restart the game
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
    <main className="game-container">
      <header className="banner">
        <h1>Investment Options</h1>
        <p>Grow your wealth with our tailored investment plans.</p>
      </header>

      <div className="score">
        <h2>Your Points: {points}</h2>
        <h2>Crypto Earned: {cryptoCount}</h2>
      </div>

      <div className="question-box">
        <h3>{questions[questionIndex].question}</h3>
        <div className="options">
          {questions[questionIndex].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="option-button"
              aria-live="polite"
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && <p className={`feedback ${feedback === "Correct!" ? "correct" : "wrong"}`}>{feedback}</p>}
      </div>

      <div className="controls">
        <button onClick={resetGame} className="reset-button">
          Reset Game
        </button>
        <Link href="/">
          <button className="back-button">Back to Dashboard</button>
        </Link>
      </div>
    </main>
  );
}

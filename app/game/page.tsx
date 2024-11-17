"use client";

import { useState } from "react";
import "./game.css";
import Link from "next/link";

export default function Game() {
  const [points, setPoints] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [cryptoCount, setCryptoCount] = useState(0);

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
      const newPoints = points + 5;
      setPoints(newPoints);

      if (newPoints >= 50) {
        setCryptoCount(cryptoCount + 1);
        setPoints(0); // Reset points after earning a crypto
      }
    }

    // Move to the next question or restart the game
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setQuestionIndex(0); // Restart the game
    }
  };

  return (
    <main className="game-container">
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
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="back-link">
        <Link href="/">
          <button className="back-button">Back to Dashboard</button>
        </Link>
      </div>
    </main>
  );
}

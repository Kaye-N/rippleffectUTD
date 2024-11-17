"use client";

import { useState, useEffect } from "react";
import "./game.css";
import Link from "next/link";

export default function Game() {
  const [points, setPoints] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [cryptoCount, setCryptoCount] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [questions, setQuestions] = useState([]);

  const initialQuestions = [
    {
      question: "Which of the following is an example of a fixed expense?",
      options: ["Groceries", "Rent", "Entertainment", "Travel"],
      correct: 1,
    },
    {
      question: "What is the purpose of a budget?",
      options: [
        "To save money for emergencies",
        "To track income and expenses",
        "To make investments",
        "To avoid paying taxes",
      ],
      correct: 1,
    },
    {
      question:
        "Which of these is the best description of compound interest?",
      options: [
        "Interest calculated only on the initial amount of money",
        "Interest calculated on both the initial investment and accumulated interest",
        "Interest that decreases over time",
        "Interest that is not taxable",
      ],
      correct: 1,
    },
    {
      question: "Which of the following is considered a 'good' credit score?",
      options: ["300–400", "400–500", "600–700", "700–800"],
      correct: 3,
    },
    {
      question: "What does an emergency fund provide?",
      options: [
        "Money for retirement",
        "Money for paying off debt",
        "Money for unexpected expenses",
        "Money for vacations",
      ],
      correct: 2,
    },
    {
      question: "What is the most common form of debt for a typical consumer?",
      options: [
        "Credit card debt",
        "Student loans",
        "Mortgage loans",
        "Auto loans",
      ],
      correct: 0,
    },
    {
      question: "Which of the following is an example of an asset?",
      options: [
        "Credit card balance",
        "Mortgage loan",
        "Cash in savings account",
        "Car loan",
      ],
      correct: 2,
    },
    {
      question: "What is a 401(k) plan?",
      options: [
        "A government bond",
        "A type of credit card",
        "A retirement savings account",
        "A student loan repayment plan",
      ],
      correct: 2,
    },
    {
      question: "What does the term 'liquidity' refer to?",
      options: [
        "The amount of money invested",
        "The ease with which an asset can be converted to cash",
        "The safety of an investment",
        "The growth potential of a financial asset",
      ],
      correct: 1,
    },
    {
      question:
        "Which of these is a consequence of carrying a credit card balance from month to month?",
      options: [
        "Building a positive credit history",
        "Paying interest on the balance",
        "Earning rewards points",
        "Avoiding penalties",
      ],
      correct: 1,
    },
    {
      question: "What is diversification in investing?",
      options: [
        "Investing in only one type of asset",
        "Spreading investments across different types of assets to reduce risk",
        "Investing solely in international stocks",
        "Focusing on high-risk investments for higher returns",
      ],
      correct: 1,
    },
    {
      question: "Which of the following best describes a 'bull market'?",
      options: [
        "A market in which stock prices are falling",
        "A market in which stock prices are rising",
        "A market that only involves bonds",
        "A market that is stable with little change",
      ],
      correct: 1,
    },
    {
      question: "What is the main purpose of a credit report?",
      options: [
        "To track how much money you owe on your credit cards",
        "To show a record of your creditworthiness",
        "To calculate your income tax",
        "To show your savings account balance",
      ],
      correct: 1,
    },
    {
      question:
        "If an investment has a high risk, what does that generally mean for the potential return?",
      options: [
        "Lower return",
        "No return",
        "Higher return",
        "Return is fixed and guaranteed",
      ],
      correct: 2,
    },
    {
      question: "What is an index fund?",
      options: [
        "A single stock that tracks the performance of a company",
        "A type of bond issued by a corporation",
        "A mutual fund that tracks a specific market index",
        "A savings account that earns interest based on the index",
      ],
      correct: 2,
    },
    {
      question: "What does the 'rule of 72' help you calculate?",
      options: [
        "The amount of money you will save by cutting expenses",
        "How long it will take for your investment to double at a given interest rate",
        "The amount of taxes you owe on investment earnings",
        "The amount of interest you pay on a loan",
      ],
      correct: 1,
    },
    {
      question: "Which of the following would likely be considered a tax-deferred investment?",
      options: ["Roth IRA", "Traditional IRA", "Taxable brokerage account", "Municipal bond"],
      correct: 1,
    },
    {
      question: "What is the purpose of an 'asset allocation' strategy in investing?",
      options: [
        "To ensure all investments are in cash or bonds",
        "To balance investments across different asset classes to manage risk and return",
        "To only invest in high-risk, high-reward assets",
        "To choose investments with the highest possible returns regardless of risk",
      ],
      correct: 1,
    },
    {
      question: "What is a dividend in the context of investing in stocks?",
      options: [
        "The initial purchase price of a stock",
        "A payment made by a company to its shareholders from profits",
        "A tax paid to the government on stock gains",
        "The interest earned on a bond investment",
      ],
      correct: 1,
    },
  ];

  useEffect(() => {
    setQuestions(shuffleArray(initialQuestions));
  }, []);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleAnswer = (index) => {
    if (index === questions[questionIndex].correct) {
      setFeedback("Correct!");
      const newPoints = points + 5;
      setPoints(newPoints);
      if (newPoints >= 15) {
        setCryptoCount(cryptoCount + 1);
        setPoints(0);
      }
    } else {
      setFeedback("Wrong! Try Again.");
    }

    setTimeout(() => {
      setFeedback("");
      setQuestionIndex((prev) => (prev + 1) % questions.length);
    }, 1000);
  };

  const resetGame = () => {
    setPoints(0);
    setCryptoCount(0);
    setFeedback("");
    setQuestions(shuffleArray(initialQuestions));
    setQuestionIndex(0);
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

      {questions.length > 0 && (
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
            <div className={`feedback-message ${feedback === "Correct!" ? "feedback-correct" : "feedback-wrong"}`}>
              {feedback}
            </div>
          )}
        </div>
      )}

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

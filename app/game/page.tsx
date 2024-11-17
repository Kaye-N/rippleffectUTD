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
      correct: 1, // Rent
    },
    {
      question: "What is the purpose of a budget?",
      options: [
        "To save money for emergencies",
        "To track income and expenses",
        "To make investments",
        "To avoid paying taxes",
      ],
      correct: 1, // To track income and expenses
    },
    {
      question: "Which of these is the best description of compound interest?",
      options: [
        "Interest calculated only on the initial amount of money",
        "Interest calculated on both the initial investment and accumulated interest",
        "Interest that decreases over time",
        "Interest that is not taxable",
      ],
      correct: 1, // Interest calculated on both the initial investment and accumulated interest
    },
    {
      question: "Which of the following is considered a 'good' credit score?",
      options: ["300–400", "400–500", "600–700", "700–800"],
      correct: 3, // 700–800
    },
    {
      question: "What does an emergency fund provide?",
      options: [
        "Money for retirement",
        "Money for paying off debt",
        "Money for unexpected expenses",
        "Money for vacations",
      ],
      correct: 2, // Money for unexpected expenses
    },
    {
      question: "What is the most common form of debt for a typical consumer?",
      options: ["Credit card debt", "Student loans", "Mortgage loans", "Auto loans"],
      correct: 0, // Credit card debt
    },
    {
      question: "Which of the following is an example of an asset?",
      options: [
        "Credit card balance",
        "Mortgage loan",
        "Cash in savings account",
        "Car loan",
      ],
      correct: 2, // Cash in savings account
    },
    {
      question: "What is a 401(k) plan?",
      options: [
        "A government bond",
        "A type of credit card",
        "A retirement savings account",
        "A student loan repayment plan",
      ],
      correct: 2, // A retirement savings account
    },
    {
      question: "What does the term 'liquidity' refer to?",
      options: [
        "The amount of money invested",
        "The ease with which an asset can be converted to cash",
        "The safety of an investment",
        "The growth potential of a financial asset",
      ],
      correct: 1, // The ease with which an asset can be converted to cash
    },
    {
      question: "Which of these is a consequence of carrying a credit card balance from month to month?",
      options: [
        "Building a positive credit history",
        "Paying interest on the balance",
        "Earning rewards points",
        "Avoiding penalties",
      ],
      correct: 1, // Paying interest on the balance
    },
    {
      question: "What is diversification in investing?",
      options: [
        "Investing in only one type of asset",
        "Spreading investments across different types of assets to reduce risk",
        "Investing solely in international stocks",
        "Focusing on high-risk investments for higher returns",
      ],
      correct: 1, // Spreading investments across different types of assets to reduce risk
    },
    {
      question: "Which of the following best describes a 'bull market'?",
      options: [
        "A market in which stock prices are falling",
        "A market in which stock prices are rising",
        "A market that only involves bonds",
        "A market that is stable with little change",
      ],
      correct: 1, // A market in which stock prices are rising
    },
    {
      question: "What is the main purpose of a credit report?",
      options: [
        "To track how much money you owe on your credit cards",
        "To show a record of your creditworthiness",
        "To calculate your income tax",
        "To show your savings account balance",
      ],
      correct: 1, // To show a record of your creditworthiness
    },
    {
      question: "If an investment has a high risk, what does that generally mean for the potential return?",
      options: [
        "Lower return",
        "No return",
        "Higher return",
        "Return is fixed and guaranteed",
      ],
      correct: 2, // Higher return
    },
    {
      question: "What is an index fund?",
      options: [
        "A single stock that tracks the performance of a company",
        "A type of bond issued by a corporation",
        "A mutual fund that tracks a specific market index",
        "A savings account that earns interest based on the index",
      ],
      correct: 2, // A mutual fund that tracks a specific market index
    },
    {
      question: "What does the 'rule of 72' help you calculate?",
      options: [
        "The amount of money you will save by cutting expenses",
        "How long it will take for your investment to double at a given interest rate",
        "The amount of taxes you owe on investment earnings",
        "The amount of interest you pay on a loan",
      ],
      correct: 1, // How long it will take for your investment to double at a given interest rate
    },
    {
      question: "Which of the following would likely be considered a tax-deferred investment?",
      options: [
        "Roth IRA",
        "Traditional IRA",
        "Taxable brokerage account",
        "Municipal bond",
      ],
      correct: 1, // Traditional IRA
    },
    {
      question: "What is the purpose of an 'asset allocation' strategy in investing?",
      options: [
        "To ensure all investments are in cash or bonds",
        "To balance investments across different asset classes to manage risk and return",
        "To only invest in high-risk, high-reward assets",
        "To choose investments with the highest possible returns regardless of risk",
      ],
      correct: 1, // To balance investments across different asset classes to manage risk and return
    },
    {
      question: "What is a dividend in the context of investing in stocks?",
      options: [
        "The initial purchase price of a stock",
        "A payment made by a company to its shareholders from profits",
        "A tax paid to the government on stock gains",
        "The interest earned on a bond investment",
      ],
      correct: 1, // A payment made by a company to its shareholders from profits
    },
    {
      question: "What is the 'Capital Gains Tax'?",
      options: [
        "A tax on the interest earned from a savings account",
        "A tax on income from your salary",
        "A tax on profits from the sale of investments like stocks or real estate",
        "A tax on business income",
      ],
      correct: 2, // A tax on profits from the sale of investments like stocks or real estate
    },
    {
      question: "Which of the following is an example of 'systematic risk'?",
      options: [
        "The risk that a specific company’s stock price will decline",
        "The risk that interest rates will rise, affecting all investments",
        "The risk that a company will go bankrupt",
        "The risk of losing a single investment due to market sentiment",
      ],
      correct: 1, // The risk that interest rates will rise, affecting all investments
    },
    {
      question: "What is the primary purpose of a '401(k)' match from an employer?",
      options: [
        "To pay for your health insurance premiums",
        "To encourage employees to save for retirement by contributing matching funds",
        "To give you a loan option for personal expenses",
        "To allow you to invest in employer stock without any tax implications",
      ],
      correct: 1, // To encourage employees to save for retirement by contributing matching funds
    },
    {
      question: "If you are in the 24% federal income tax bracket, how much tax will you owe on $10,000 of investment gains (excluding other considerations)?",
      options: ["$1,000", "$2,400", "$10,000", "$0 (capital gains are tax-free)"],
      correct: 1, // $2,400
    },
    {
      question: "What is the primary risk associated with investing in foreign stocks in emerging markets?",
      options: [
        "Low potential for returns",
        "Currency risk, where exchange rates can impact the value of investments",
        "High tax rates on foreign earnings",
        "Guaranteed losses",
      ],
      correct: 1, // Currency risk, where exchange rates can impact the value of investments
    },
    {
      question: "What is 'Short Selling' in the context of stock trading?",
      options: [
        "Buying stocks in the short term and holding for quick gains",
        "Borrowing shares to sell them at a high price, betting that the stock will fall in value, and buying them back at a lower price",
        "Selling stocks for a short period, then reinvesting the funds into real estate",
        "Buying stocks in companies with short-term growth",
      ],
      correct: 1, // Borrowing shares to sell them at a high price, betting that the stock will fall in value, and buying them back at a lower price
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
    <div className="game-container">
      <header className="banner">
        <h1>Game</h1>
        <p>Test your knowledge and earn cryptocurrency rewards!</p>
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
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && (
          <p className={`feedback ${feedback === "Correct!" ? "correct" : "wrong"}`}>
            {feedback}
          </p>
        )}
      </div>

      <div className="controls">
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

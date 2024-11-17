"use client";

import "./invest.css"; // Add specific styles for the investment page
import Link from "next/link";

export default function Invest() {
  const handleInvestment = (event) => {
    event.preventDefault();
    // Logic for handling investment
    alert("Investment Successful!");
  };

  return (
    <div className="invest-containter"> 

      <header className="banner">
        <h1>Investment Options</h1>
        <p>Grow your wealth with our tailored investment plans.</p>
      </header>

      <div className="investment-options">
        <div className="plan">
          <h3>Plan A</h3>
          <p>40% Apple, Microsoft, Johnson & Johnson</p>
          <p>30% Bond ETFs</p>
          <p>20% dividend ETFs</p>
          <p>10% cash</p>
          <p>Low risk, steady returns. Ideal for beginners.</p>
          <p>Expected ROI: 5% per year</p>
        </div>
        <div className="plan">
          <h3>Plan B</h3>
          <p>30% Apple, Microsoft, Johnson & Johnson</p>
          <p>25% Tesla, Square</p>
          <p>20% International Stocks (Developed and Emerging Markets)</p>
          <p>15% Bond ETFs (Government and Investment-Grade Corporate Bonds)</p>
          <p>10% Real Estate Investment Trusts (REITs)</p>
          <p>Moderate risk, balanced growth. Perfect for growing portfolios.</p>
          <p>Expected ROI: 10% per year</p>
        </div>
        <div className="plan">
          <h3>Plan C</h3>
          <p>40% Growth Stocks (Tech, Biotechnology, Consumer Discretionary)</p>
          <p>30% Small-Cap Stocks</p>
          <p>15% International Stocks (Emerging Markets)</p>
          <p>10% Sector-Specific ETFs (e.g., Technology, Healthcare)</p>
          <p>5% Cryptocurrency or Alternative Assets (Optional)</p>
          <p>High risk, high reward. Best for experienced investors.</p>
          <p>Expected ROI: 20% per year</p>
        </div>
      </div>

      <div className="investment-form">
        <form onSubmit={handleInvestment}>
          <div className="form-group">
            <label htmlFor="investment-plan">Select Plan</label>
            <select id="investment-plan" name="plan" required>
              <option value="">--Choose a plan--</option>
              <option value="Plan A">Plan A</option>
              <option value="Plan B">Plan B</option>
              <option value="Plan C">Plan C</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Investment Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount to invest"
              required
              min="1"
            />
          </div>

          <button type="submit" className="invest-button">
            Invest Now
          </button>
        </form>
      </div>

      <div className="back-link">
        <Link href="/">
          <button className="back-button">Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}
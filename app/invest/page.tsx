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
    <main>
      <div className="container">
        <div className="content">
          <h1>Investment Options</h1>
          <p>Grow your wealth with our tailored investment plans.</p>
        </div>
      </div>

      <div className="investment-options">
        <div className="plan">
          <h3>Plan A</h3>
          <p>Low risk, steady returns. Ideal for beginners.</p>
          <p>Expected ROI: 5% per year</p>
        </div>
        <div className="plan">
          <h3>Plan B</h3>
          <p>Moderate risk, balanced growth. Perfect for growing portfolios.</p>
          <p>Expected ROI: 10% per year</p>
        </div>
        <div className="plan">
          <h3>Plan C</h3>
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
    </main>
  );
}
"use client";

import "./transfer.css"; // Add specific styles for the transfer page if needed
import Link from "next/link";

export default function Transfer() {

  const handleTransfer = (event) => {
    event.preventDefault();
    // Logic for handling transfer
    alert("Transfer Successful!");
  };

  return (
    <main>
      <div className="container">
        <div className="content">
          <h1>Transfer Funds</h1>
          <p>Securely transfer money to anyone, anywhere.</p>
        </div>

      </div>

      <div className="transfer-form">
        <form onSubmit={handleTransfer}>
          <div className="form-group">
            <label htmlFor="recipient">Recipient</label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              placeholder="Enter recipient name or email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount to transfer"
              required
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              placeholder="Add a note to the recipient"
            ></textarea>
          </div>

          <button type="submit" className="transfer-button">
            Transfer
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

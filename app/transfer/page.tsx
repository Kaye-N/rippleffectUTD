"use client";

import React, { useState } from "react";
import "./transfer.css";
import Link from "next/link";

const Transfer: React.FC = () => {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");
  const [message, setMessage] = useState<string>("");

  const handleTransfer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!recipient || !amount || Number(amount) <= 0) {
      alert("Please provide valid recipient and amount.");
      return;
    }

    // Transfer logic can be added here
    alert(`Transfer to ${recipient} of $${amount} was successful!`);
    setRecipient("");
    setAmount("");
    setMessage("");
  };

  return (

    <div className="transfer-page">

      {/* Banner Section */}
      <header className="banner">
        <h1>Transfer Funds</h1>
        <p>Securely transfer money to anyone, anywhere.</p>
      </header>

      {/* Form Section */}
      <div className="content-background">

        <div className="center">

          <form className="transfer-form" onSubmit={handleTransfer}>
            <div className="form-group">
              <label htmlFor="recipient">Recipient</label>
              <input
                type="text"
                id="recipient"
                placeholder="Enter recipient name or email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                placeholder="Enter amount to transfer"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
                min="1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message (Optional)</label>
              <textarea
                id="message"
                placeholder="Add a note to the recipient"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            {/* Centered Button */}
            <div className="button-group">
              <button type="submit" className="transfer-button">Transfer</button>
            </div>
          </form>

          <div className="back-link">
            <Link href="/">
              <button className="back-button">Back to Dashboard</button>
            </Link>
          </div>
        </div>
      </div >
    </div >

  );
};

export default Transfer;
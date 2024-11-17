"use client";

import React, { useState, useEffect } from "react";
import "./transfer.css";
import Link from "next/link";

const Transfer: React.FC = () => {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");
  const [message, setMessage] = useState<string>("");
  const [transactions, setTransactions] = useState<any[]>([]); // State to hold transactions

  // Fetch transactions from the backend
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions");
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          console.error("Failed to fetch transactions");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    fetchTransactions();
  }, []);

  // Handle form submission and send data to the backend
  const handleTransfer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!recipient || !amount || Number(amount) <= 0) {
      alert("Please provide valid recipient and amount.");
      return;
    }

    const transaction = {
      user_id: recipient, // Using recipient as user_id for now
      amount: Number(amount),
      description: message,
      date: new Date().toISOString().split("T")[0], // Current date
    };

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        const newTransaction = await response.json();
        setTransactions((prev) => [...prev, newTransaction]); // Update transactions list
        alert(`Transfer to ${recipient} of $${amount} was successful!`);
        setRecipient("");
        setAmount("");
        setMessage("");
      } else {
        alert("Failed to process the transaction.");
      }
    } catch (error) {
      console.error("Error processing transaction:", error);
      alert("An error occurred. Please try again.");
    }
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
            <button type="submit" className="transfer-button">
              Transfer
            </button>
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

"use client";

import React, { useState } from "react";
import "./pay.css";
import Link from "next/link";

function RecurringBill({ name, amount }) {
  return (
    <li className="bill-item">
      {name} - ${amount.toFixed(2)}
    </li>
  );
}

// Modal Component
function AddBillModal({ isOpen, onClose, onAddBill }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    if (!name || isNaN(amount)) {
      alert("Please provide valid inputs.");
      return;
    }
    onAddBill({ name: name.trim(), amount: parseFloat(amount) });
    setName(""); // Reset form
    setAmount("");
    onClose(); // Close the modal
  };

  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Recurring Bill</h2>
        <div className="modal-content">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter bill name"
            />
          </label>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </label>
          <div className="modal-actions">
            <button className="btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="btn add" onClick={handleAdd}>
              Add Bill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  const wallets = [
    { name: "Savings Wallet", balance: 800 },
    { name: "Main Wallet", balance: 500 },
  ];
  const [currentWalletIndex, setCurrentWalletIndex] = useState(0);
  const [recurringBills, setRecurringBills] = useState([
    { name: "Netflix", amount: 15 },
    { name: "Spotify", amount: 10 },
    { name: "Electricity", amount: 50 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleWallet = () => {
    setCurrentWalletIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const handleAddBill = (newBill) => {
    setRecurringBills((prev) => [...prev, newBill]);
  };

  return (
    <div className="payment-page">
      {/* Top Banner */}
      <header className="banner">
        <h1>Welcome to Your Payment Dashboard</h1>
        <p>Manage your digital wallets, recurring bills, and more.</p>
      </header>

      {/* Background Container */}
      <div className="content-background">
        {/* Centered Container */}
        <div className="payment-page__dashboard-box">
          {/* Wallet Section */}
          <div className="payment-page__wallet-section">
            <h2>Digital Wallet</h2>
            <p>Selected Wallet: {wallets[currentWalletIndex].name}</p>
            <h3>Balance: ${wallets[currentWalletIndex].balance.toFixed(2)}</h3>
            <button
              className="btn switch-wallet"
              onClick={toggleWallet}
              aria-label="Switch between wallets"
            >
              Switch Wallet
            </button>
          </div>

          {/* Recurring Bills Section */}
          <div className="payment-page__recurring-bills">
            <h2>Recurring Bills</h2>
            {recurringBills.length === 0 ? (
              <p>No recurring bills added yet.</p>
            ) : (
              <ul>
                {recurringBills.map((bill, index) => (
                  <RecurringBill key={index} name={bill.name} amount={bill.amount} />
                ))}
              </ul>
            )}
            <button
              className="btn edit-bills"
              onClick={() => setIsModalOpen(true)}
            >
              Add Recurring Bill
            </button>
          </div>

          {/* Back to Dashboard Button */}
          <div className="payment-page__back-link">
            <Link href="/">
              <button className="btn back-button">Back to Dashboard</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Add Bill Modal */}
      <AddBillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddBill={handleAddBill}
      />
    </div>
  );
}
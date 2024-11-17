"use client";

import React, { useState } from "react";
import "./pay.css";
import Link from "next/link";


export default function PaymentPage() {
  const [walletBalance, setWalletBalance] = useState(800); // Example balance
  const [selectedWallet, setSelectedWallet] = useState("Savings Wallet");
  const [recurringBills, setRecurringBills] = useState([
    { name: "Netflix", amount: 15 },
    { name: "Spotify", amount: 10 },
    { name: "Electricity", amount: 50 },
  ]);

  const handleSwitchWallet = () => {
    setSelectedWallet((prev) =>
      prev === "Savings Wallet" ? "Main Wallet" : "Savings Wallet"
    );
    setWalletBalance((prev) => (prev === 800 ? 500 : 800)); // Example balances
  };

  const handleEditBills = () => {
    const newBill = prompt("Add a new recurring bill (format: Name,Amount):");
    if (newBill) {
      const [name, amount] = newBill.split(",");
      if (name && amount) {
        setRecurringBills([...recurringBills, { name: name.trim(), amount: parseFloat(amount) }]);
      } else {
        alert("Invalid format. Please use: Name,Amount");
      }
    }
  };

  return (
    <div className="payment-page">
      {/* Top Banner */}
      <header className="banner">
        <h1>Welcome to Your Payment Dashboard</h1>
        <p>Manage your digital wallets, recurring bills, and more.</p>
      </header>

      {/* Centered Container with Border */}
      <div className="dashboard-box">
        <div className="wallet-section">
          <h2>Digital Wallet</h2>
          <p>Selected Wallet: {selectedWallet}</p>
          <h3>Balance: ${walletBalance.toFixed(2)}</h3>
          <button className="btn switch-wallet" onClick={handleSwitchWallet}>
            Switch Wallet
          </button>
        </div>

        <div className="recurring-bills-section">
          <h2>Recurring Bills</h2>
          <ul>
            {recurringBills.map((bill, index) => (
              <li key={index}>
                {bill.name} - ${bill.amount.toFixed(2)}
              </li>
            ))}
          </ul>
          <button className="btn edit-bills" onClick={handleEditBills}>
            Edit Recurring Bills
          </button>
        </div>
      </div>

      <div className="back-link">
        <Link href="/">
          <button className="back-button">Back to Dashboard</button>
        </Link>
      </div>

    </div>
  );
}
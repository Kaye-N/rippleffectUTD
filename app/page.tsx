"use client";

import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

import "./page.module.css";
import Link from "next/link";

Amplify.configure(outputs);

ChartJS.register(ArcElement, Tooltip, Legend);

const client = generateClient<Schema>();

export function Home() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Simulated budget data
  const budgetData = {
    labels: ["Rent", "Food", "Utilities", "Savings", "Entertainment"],
    datasets: [
      {
        data: [40, 20, 15, 15, 10], // Example percentages
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right", // Positions the legend to the right
        labels: {
          boxWidth: 20, // Adjust the width of the legend color box
          boxHeight: 10, // Adjust the height of the legend color box
          padding: 10, // Add spacing around the legend items
          font: {
            size: 14, // Font size for the legend text
            family: "Arial", // Font family for the legend text
          },
          color: "#333", // Legend text color
        },
      },
    },
    maintainAspectRatio: false, // Allows resizing without maintaining aspect ratio
  };

  return (
    <main>
      <div className="header">
        <div className="content">
          <h1>Welcome to Lotus</h1>
          <p>Your Money. Your Future. Your Way.</p>
        </div>

        <div className="logo-container" onClick={toggleDropdown}>
          <img src="/favicon.png" alt="Logo" className="logo" />
          {dropdownVisible && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={signOut}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="balance-budget-container">
        <div className="balance-box">
          <h2>Balance</h2>
          <p>$5,000.00</p>
          <p className="inspiration">"The best way to save money is to earn it."</p>
        </div>

        <div className="budget-box">
          <h2>Budget</h2>
          <div className="chart-legend-container">
            <Pie data={budgetData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="actions">
        <div className="action-box">
          <p>Make Payment</p>
          <Link href="/pay">
            <button>Pay</button>
          </Link>
        </div>

        <div className="action-box">
          <p>Transfer Funds</p>
          <Link href="/transfer">
            <button>Transfer</button>
          </Link>
        </div>

        <div className="action-box">
          <p>Investment</p>
          <Link href="/invest">
            <button>Invest</button>
          </Link>
        </div>

        <div className="action-box">
          <p>Fun & Rewards</p>
          <Link href="/game">
            <button>Game</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="box">
      <div className="background"></div>
      <Authenticator>
        {({ signOut, user }) => <Home />}
      </Authenticator>
    </div>
  );
}
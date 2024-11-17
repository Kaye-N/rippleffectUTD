"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import "./home.css";
import Link from "next/link";
                                

export default function Home() {
  const { signOut } = useAuthenticator((context) => [context.user]);

  return (
    <main>
      
      <div className="container">

        <div className="content">
          <h1>Welcome to Lotus</h1>
          <p>Your Money. Your Future. Your Way.</p>
        </div>

        <button className="sign-out" onClick={signOut}>Sign Out</button>

      </div>

      <div className="dashboard">
        <div className="balance-box">
          <h2>Balance</h2>
          <p>$5,000.00</p>
          <p className="inspiration">"The best way to save money is to earn it."</p>
        </div>
      </div>

      <div className="badget">
        <div className="badget-box">
          <h1>Budget</h1>
        </div>
      </div>

      <div className="actions">
        
        <div className="action-box">
          <p>Payment here</p>
          <Link href="/pay">
            <button>Pay</button>
          </Link>
        </div>

        <div className="action-box">
          <p>Transfer funds</p>
          <Link href="/transfer">
            <button>Transfer</button>
          </Link>
        </div>

        <div className="action-box">
          <p>Investment options</p>
          <Link href="/invest">
            <button>Invest</button>
          </Link>
        </div>

        <div className="action-box">
          <p>Fun and rewards</p>
          <Link href="/game">
            <button>Game</button>
          </Link>
        </div>
      </div>

    </main>
  );
}

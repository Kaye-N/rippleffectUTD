"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import "./home.css";
import Link from "next/link";

export default function Home() {
  const { signOut } = useAuthenticator((context) => [context.user]);

  return (
    <main>
      <header className="container">
        <div className="content">
          <h1>Welcome to Lotus</h1>
          <p>Smart savings made simple</p>
        </div>
      </header>

      <div className="dashboard">
        <div className="balance-box">
          <h2>Balance</h2>
          <p>$5,000.00</p>
          <p className="inspiration">"The best way to save money is to earn it."</p>
        </div>

        <div className="actions">
          <Link href="/pay">
            <button>Pay</button>
          </Link>
          <Link href="/transfer">
            <button>Transfer</button>
          </Link>
          <Link href="/invest">
            <button>Invest</button>
          </Link>
          <Link href="/game">
            <button>Game</button>
          </Link>
        </div>

      </div>

      <button className="sign-out" onClick={signOut}>Sign Out</button>
    </main>
  );
}

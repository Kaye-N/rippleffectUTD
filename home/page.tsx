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

      <button onClick={signOut}>Sign Out</button>

    </main>
  );
}

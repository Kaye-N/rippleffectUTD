"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_ouputs.json";
import "@aws-amplify/ui-react/styles.css";

import "./app.css";
import Home from "../home/page";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  return (
    <Authenticator className="body">
      {({ signOut, user }) => <Home />}
    </Authenticator>
  );
}


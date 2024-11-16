"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_ouputs.json";
import "./../app/app.css";

import "@aws-amplify/ui-react/styles.css";

// Configure Amplify
Amplify.configure(outputs);

const client = generateClient<Schema>();

// Component to handle authenticated todos
function TodosApp() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // Fetch todos
  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  // Create new todo
  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  // Delete a todo
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main>
      <h1>My Todos</h1>
      <button onClick={createTodo}>+ Add New Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
            {todo.content}
          </li>
        ))}
      </ul>
      <button onClick={signOut}>Sign Out</button>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
    </main>
  );
}

// Main app component
export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          {/* Check if user is authenticated */}
          {user ? (
            <TodosApp />
          ) : (
            <div className="landing-page">
              <header className="hero-banner">
                <h1>Welcome to the Todos App</h1>
                <p>Sign in to manage your tasks and stay productive!</p>
              </header>
              <div className="auth-form">
                <Authenticator />
              </div>
            </div>
          )}
        </>
      )}
    </Authenticator>
  );
}
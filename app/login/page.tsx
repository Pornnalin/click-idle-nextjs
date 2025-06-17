"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleRegister() {
    try {
      const res = await axios.post("/api/register", {
        username,
        password,
      });
      console.log("Register API success:", res.data);
      localStorage.setItem("userId", res.data.id);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Register failed");
    }
  }

  async function handleLogin() {
    console.log("Login clicked", username, password);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 px-4">
      <h1 className="text-4xl font-bold mb-6 text-pink-600">
        Login / Register
      </h1>

      <div className="bg-white/80 p-6 rounded-xl shadow-lg flex flex-col gap-4 w-full max-w-xs">
        <input
          className="p-3 rounded-md border border-gray-300"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="p-3 rounded-md border border-gray-300"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-green-500 text-white p-3 rounded-md font-bold hover:bg-green-600"
        >
          Register
        </button>

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-3 rounded-md font-bold hover:bg-blue-600"
        >
          Login
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </main>
  );
}

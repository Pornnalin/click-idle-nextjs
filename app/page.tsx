"use client";
import { useState } from "react";

export default function Home() {
  const [score, setScore] = useState(0);
  const [name, setName] = useState("User");

  const handleClick = () => {
    setScore((prev) => prev + 1);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 px-4">
      <h1 className="uppercase font-extrabold text-5xl mb-6 text-pink-600 drop-shadow">
        🍪 Click Idle Game
      </h1>

      <div className="flex flex-col items-center gap-2 mb-6 bg-white/80 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800">
          Score: <span className="text-pink-500">{score}</span>
        </h2>
        <h3 className="text-xl text-gray-700">Hello, {name}!</h3>
      </div>

      <button
        className="bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-bold text-2xl px-10 py-5 rounded-full shadow-lg transition duration-200"
        onClick={handleClick}
      >
        🍪 Click Me!
      </button>
    </main>
  );
}

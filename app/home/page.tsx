"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Player = {
  id: string;
  username: string;
  score: number;
};

export default function Home() {
  const [score, setScore] = useState(0);
  const [user, setUser] = useState<Player | null>(null);

  const handleClick = async () => {
    const newScore = score + 1;
    setScore(newScore);
    const userId = localStorage.getItem("userId");
    if (userId) {
      await axios.post("/api/user/score", {
        id: userId,
        score: newScore,
      });
    }
    setUser((prev) => (prev ? { ...prev, score: newScore } : prev));
  };
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) return;
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user/${id}`);
        setUser(res.data);
        console.log("user data", res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 px-4">
      <h1 className="uppercase font-extrabold text-5xl mb-6 text-pink-600 drop-shadow">
        🍪 Click Idle Game
      </h1>

      <div className="flex flex-col items-center gap-2 mb-6 bg-white/80 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800">
          Score: <span className="text-pink-500">{user?.score}</span>
        </h2>
        <h3 className="text-xl text-gray-700">Hello, {user?.username}!</h3>
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

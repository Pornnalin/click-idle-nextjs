import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

// ✅ Type Player เหมือนกัน
type Player = {
  id: string;
  username: string;
  password: string;
  score: number;
};

declare global {
  var players: Record<string, Player> | undefined;
}

if (!globalThis.players) {
  globalThis.players = {};
}

const players = globalThis.players;

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const exists = Object.values(players).some((p) => p.username === username);

  if (exists) {
    return NextResponse.json(
      { error: "Username already taken" },
      { status: 400 }
    );
  }

  const id = randomUUID();
  players[id] = { id, username, password, score: 0 };

  return NextResponse.json({ id });
}

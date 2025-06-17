import { NextRequest, NextResponse } from "next/server";

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

  const player = Object.values(players).find(
    (p) => p.username === username && p.password === password
  );

  if (!player) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  return NextResponse.json({ id: player.id });
}

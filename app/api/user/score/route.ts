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
  const { id, score } = await req.json();

  const player = players[id];
  if (!player) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  player.score = score;

  return NextResponse.json({ success: true, score: player.score });
}

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

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const player = players[id];
  if (!player) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { password, ...safePlayer } = player;

  return NextResponse.json(safePlayer);
}

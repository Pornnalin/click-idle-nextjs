import { NextApiRequest, NextApiResponse } from "next";

export type Player = {
  id: string;
  username: string;
  password: string;
  score: number;
};

let players: Record<string, Player> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const exists = Object.values(players).some(
      (p) => password.username === username
    );

    if (exists) {
      res.status(400).json({ error: "Username already taken" });
      return;
    }

    const id = Date.now().toString();
    players[id] = {
      id,
      username,
      password,
      score: 0,
    };
    res.status(200).json({ id });
  } else {
    res.status(405).end();
  }
}
export { players };

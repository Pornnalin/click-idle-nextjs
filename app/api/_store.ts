export type Player = {
  id: string;
  username: string;
  password: string;
  score: number;
};

export const players: Record<string, Player> = {};

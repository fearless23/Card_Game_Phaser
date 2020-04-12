export type GameType = {
  name: string;
  id: number;
  category: string;
  maxPlayers: number;
  playersJoined: number;
  private: boolean;
  joinAble: boolean;
  docId: string;
  players: { name: string; idx: string; admin: boolean }[];
};

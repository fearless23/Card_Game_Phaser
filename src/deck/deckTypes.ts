export type CardType = {
  pos: number;
  suit: string;
  val: string;
  name: string;
  used?: boolean;
};

export type DeckType = CardType[];

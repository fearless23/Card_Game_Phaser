import { CardType } from "../deck/deckTypes";

export type PlayerType = {
  name: string;
  team: string;
  cards: CardType[];
};

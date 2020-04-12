import { PlayerType } from "./playerType";

export class Players {
  teams: boolean = false;
  playersNames: string[] = [];
  players: PlayerType[] = [];
  constructor() {}

  createPlayers(playersNames: string[], teams: boolean) {
    this.players = [];
    this.teams = teams;
    this.playersNames = playersNames;
    if (playersNames.length !== 4) {
      throw new Error("Must be 4 players");
    }
    for (let i = 0; i < 4; i++) {
      const xx = i % 2 === 0;

      this.players.push({
        name: playersNames[i],
        team: teams ? (xx ? "1" : "2") : String(i),
        cards: [],
      });
    }
    return this.players;
  }

  getPlayers() {
    return this.players;
  }
}

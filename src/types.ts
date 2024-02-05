export interface RoundInput {
  course: string;
  date: string;
}

export interface ScoreInput {
  uuid: string;
  points: number;
}

export interface Score {
  uuid: string;
  points: number;
}

export interface Round {
  RID: string;
  course: string;
  date: string;
  scores: Score[];
}

export interface Rivalry {
  RivID: string;
  name: string;
  players: string[];
  rounds: string[];
}

export interface User {
  UID: string;
  email: string;
  firstname: string;
  lastname: string;
}

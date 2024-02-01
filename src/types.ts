export interface RoundInput {
  course: string;
  date: string;
}

export interface Round {
  RID: string;
  course: string;
  date: string;
  scores: {
    uuid: string;
    name: string;
    points: number;
  }[];
}

export interface Rivalry {
  RivID: string;
  name: string;
  players: string[];
  rounds: string[];
}

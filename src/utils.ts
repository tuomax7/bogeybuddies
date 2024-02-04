import { User } from './types';

export const dateToReadable = (dateString: string) => new Date(dateString).toLocaleDateString();

export const getNamesByUIDs = (UIDs: string[], players: User[]) => {
  const rivalryPlayers = players.filter(player => UIDs.includes(player.UID));
  const playerNames = rivalryPlayers.map(player => ({
    firstname: player.firstname,
    lastname: player.lastname
  }));
  return playerNames;
};

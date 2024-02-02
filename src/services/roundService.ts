import { get, post } from 'aws-amplify/api';
import apiName from '@/apiName';
import { ScoreInput } from '@/types';

export const getRounds = async (players?: string[]) => {
  const playerQueries = players ? '?players=' + players.join(',') : '';
  const getRounds = get({
    apiName,
    path: '/rounds' + playerQueries
  });

  const { body } = await getRounds.response;
  const json = await body.json();

  // @ts-ignore
  const rounds = json as Round[];
  return rounds;
};

export const getRound = async (roundID: string) => {
  const getRound = get({
    apiName,
    path: `/rounds/${roundID}`
  });

  const { body } = await getRound.response;
  const json = await body.json();
  // @ts-ignore
  const round = json[0] as Round;
  return round;
};

export const postRound = async (scoresInput: ScoreInput[], courseNameInput: string, roundDateInput: string) => {
  const sortedScores = [...scoresInput].sort((s1, s2) => s2.points - s1.points);
  const players = scoresInput.map(score => score.uuid);
  await post({
    apiName,
    path: '/rounds',
    options: {
      body: {
        course: courseNameInput,
        date: roundDateInput,
        scores: JSON.stringify(sortedScores),
        players: JSON.stringify(players)
      }
    }
  });
};

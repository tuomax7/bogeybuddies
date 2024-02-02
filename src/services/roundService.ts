import { get } from 'aws-amplify/api';
import apiName from '@/apiName';

export const getRounds = async () => {
  const getRounds = get({
    apiName,
    path: '/rounds'
  });

  const { body } = await getRounds.response;
  const json = await body.json();

  console.log(json);

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

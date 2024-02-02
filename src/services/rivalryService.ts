import { get } from 'aws-amplify/api';
import apiName from '@/apiName';

export const getRivalries = async () => {
  const getRivalries = get({
    apiName,
    path: '/rivalries'
  });

  const { body } = await getRivalries.response;
  const json = await body.json();

  // @ts-ignore
  const rivalries = json as Rivalry[];
  return rivalries;
};

export const getRivalry = async (rivalryID: string) => {
  const getRivalry = get({
    apiName,
    path: `/rivalries/${rivalryID}`
  });

  const { body } = await getRivalry.response;
  const json = await body.json();
  // @ts-ignore
  const rivalry = json[0] as Rivalry;
  return rivalry;
};

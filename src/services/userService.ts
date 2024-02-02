import { get } from 'aws-amplify/api';
import apiName from '@/apiName';
import { User } from '@/types';

export const getUserByUID = async (UID: string) => {
  const getUser = get({
    apiName,
    path: `/users/${UID}`
  });

  const { body } = await getUser.response;
  const json = await body.json();
  // @ts-ignore
  const user = json[0] as User;
  return user;
};

export const getUsers = async (uids?: string[]) => {
  const uidQueries = uids ? '?uids=' + uids.join(',') : '';
  const getUsers = get({
    apiName,
    path: '/users' + uidQueries
  });

  const { body } = await getUsers.response;
  const json = await body.json();

  // @ts-ignore
  const users = json as User[];
  return users;
};

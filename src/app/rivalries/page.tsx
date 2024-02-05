'use client';

import React, { useEffect, useState, FC } from 'react';
import Link from 'next/link';
import { getCurrentUser } from 'aws-amplify/auth';
import { Rivalry, User } from '@/types';

import { getRivalries } from '@/services/rivalryService';
import { getUsers } from '@/services/userService';

import { TableRow, TableData } from '@/components/TableRow';

import { getNamesByUIDs } from '@/utils';

const RivalriesPage = () => {
  const [rivalries, setRivalries] = useState<Rivalry[]>([]);
  const [players, setPlayers] = useState<User[]>([]);

  const fetchRivalries = async () => {
    try {
      const { userId } = await getCurrentUser();

      const fetchedRivalries = await getRivalries(userId);

      const playerUIDs = fetchedRivalries.map(rivalry => rivalry.players).flat();

      const users = await getUsers(playerUIDs);

      setPlayers(users);
      setRivalries(fetchedRivalries);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  };

  useEffect(() => {
    fetchRivalries();
  }, []);

  const playerFirstNameString = (rivalry: Rivalry) =>
    getNamesByUIDs(rivalry.players, players)
      .map(name => name.firstname)
      .join(', ');

  return (
    <div className='space-y-2'>
      <h1 className='text-2xl'>Rivalries</h1>
      {rivalries.length <= 0 && <p>Loading rivalries...</p>}
      <table>
        <tbody>
          {rivalries.map(rivalry => (
            <TableRow key={rivalry.RivID}>
              <TableData>
                <Link href={`/rivalries/${rivalry.RivID}`}>{rivalry.name}</Link>
              </TableData>
              <TableData>{playerFirstNameString(rivalry)}</TableData>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RivalriesPage;

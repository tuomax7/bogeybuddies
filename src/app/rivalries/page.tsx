'use client';

import React, { useEffect, useState, FC } from 'react';
import Link from 'next/link';
import { Rivalry, User } from '@/types';

import { getRivalries } from '@/services/rivalryService';
import { getUsers } from '@/services/userService';

const RivalriesPage = () => {
  const [rivalries, setRivalries] = useState<Rivalry[]>([]);
  const [players, setPlayers] = useState<User[]>([]);

  const fetchRivalries = async () => {
    try {
      const fetchedRivalries = await getRivalries();

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

  console.log(players);

  return (
    <div className='space-y-2'>
      <h1 className='text-2xl'>Rivalries</h1>
      {rivalries.length <= 0 && <p>Loading rivalries...</p>}
      <table>
        <tbody>
          {rivalries.map(rivalry => (
            <tr key={rivalry.RivID} className=' border-4 odd:bg-green-300 even:text-black rounded-lg'>
              <td className='p-4'>
                <Link href={`/rivalries/${rivalry.RivID}`}>{rivalry.name}</Link>
              </td>
              <td className=' p-4'>{rivalry.players.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RivalriesPage;

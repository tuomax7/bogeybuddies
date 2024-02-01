'use client';

import React, { useEffect, useState, FC } from 'react';
import Link from 'next/link';
import { get } from 'aws-amplify/api';
import { Round } from '@/types';
import apiName from '../../apiName';

const RoundsPage = () => {
  const [rounds, setRounds] = useState<Round[]>([]);

  const getRounds = async () => {
    try {
      const getRounds = get({
        apiName,
        path: '/rounds'
      });

      const { body } = await getRounds.response;
      const json = await body.json();

      // @ts-ignore
      const rounds = json as Round[];
      setRounds(rounds);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  };

  useEffect(() => {
    getRounds();
  }, []);

  return (
    <div className='space-y-2'>
      <h1 className='text-2xl'>Rounds</h1>
      {rounds.length <= 0 && <p>Loading rounds...</p>}
      <table>
        <tbody>
          {rounds.map(round => (
            <tr key={round.RID}>
              <td className=' border-4 odd:bg-green-300 even:text-black p-4 rounded-lg'>
                <Link href={`/rounds/${round.RID}`}>
                  {round.course} on {round.date}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoundsPage;

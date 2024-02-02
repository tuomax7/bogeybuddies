'use client';

import React, { useEffect, useState, FC } from 'react';
import Link from 'next/link';
import { Round } from '@/types';
import { getRounds } from '@/services/roundService';

const RoundsPage = () => {
  const [rounds, setRounds] = useState<Round[]>([]);

  useEffect(() => {
    getRounds()
      .then(data => setRounds(data))
      .catch(e => console.log(`ERROR: ${e}`));
  }, []);

  console.log(rounds);

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

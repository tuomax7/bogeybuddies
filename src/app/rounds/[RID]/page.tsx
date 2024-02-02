'use client';

import React, { useEffect, useState, FC } from 'react';
import { Round } from '@/types';
import { getRound } from '@/services/roundService';

const RoundPage = ({ params }: { params: { RID: string } }) => {
  const roundID = params.RID;
  const [round, setRound] = useState<Round>();

  useEffect(() => {
    getRound(roundID)
      .then(data => setRound(data))
      .catch(e => console.log(`ERROR: ${e}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!round && <p>Loading round scores...</p>}
      {round && (
        <div className=' flex flex-col'>
          <h2 className='text-2xl'>{round.course}</h2>
          <p className='text-xl'>{round.date}</p>
          <table className='my-2 text-lg'>
            <thead>
              <tr>
                <th scope='col' className='px-6 py-4'>
                  Ranking
                </th>
                <th scope='col' className='px-6 py-4'>
                  Name
                </th>
                <th scope='col' className='px-6 py-4'>
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {round.scores.map((score, index) => {
                return (
                  <tr key={index} className='  odd:bg-green-300 even:text-black p-4 rounded-lg'>
                    <td className='whitespace-nowrap px-6 py-4 font-medium'>{index + 1}</td>
                    <td className='whitespace-nowrap px-6 py-4'>{score.name}</td>
                    <td className='whitespace-nowrap px-6 py-4'>{score.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RoundPage;

'use client';

import React, { useEffect, useState, FC } from 'react';
import { get } from 'aws-amplify/api';
import apiName from '@/apiName';
import { Round } from '@/types';

const RoundPage = ({ params }: { params: { RID: string } }) => {
  const roundId = params.RID;
  const [round, setRound] = useState<Round>();

  const getRound = async () => {
    try {
      const getRound = get({
        apiName,
        path: `/rounds/${roundId}`
      });

      const { body } = await getRound.response;
      const json = await body.json();
      // @ts-ignore
      const addedRound = json[0];

      const round = {
        ...addedRound,
        scores: JSON.parse(addedRound.scores)
      } as Round;
      setRound(round);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  };

  useEffect(() => {
    getRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
                  <tr key={index} className='border-b dark:border-neutral-500 odd:bg-slate-400'>
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

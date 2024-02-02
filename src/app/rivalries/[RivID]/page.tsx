'use client';

import React, { useEffect, useState, FC } from 'react';
import { Rivalry, Round } from '@/types';
import { getRivalry } from '@/services/rivalryService';
import { getRounds } from '@/services/roundService';

const Rivalrypage = ({ params }: { params: { RivID: string } }) => {
  const rivalryID = params.RivID;
  const [rivalry, setRivalry] = useState<Rivalry>();
  const [rounds, setRounds] = useState<Round[]>([]);

  const fetchRivalryData = async () => {
    try {
      const rivalryData = await getRivalry(rivalryID);
      // console.log(rivalryData);

      const roundsData = await getRounds();
      // console.log(roundsData);

      setRivalry(rivalryData);
      setRounds(roundsData);
    } catch (e) {
      console.log(`ERROR: ${e}`);
    }
  };

  useEffect(() => {
    fetchRivalryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!rivalry && <p>Loading rivalry...</p>}
      {rivalry && (
        <div className=' flex flex-col'>
          <h2 className='text-2xl'>{rivalry.name}</h2>
          <p className='text-xl'>{rivalry.players.join(', ')}</p>
          <table className='my-2 text-lg'>
            <thead>
              <tr>
                <th scope='col' className='px-6 py-4'>
                  Ranking
                </th>
                <th scope='col' className='px-6 py-4'>
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {rounds.map((round, index) => {
                return (
                  <tr key={index} className='  odd:bg-green-300 even:text-black p-4 rounded-lg'>
                    <td className='whitespace-nowrap px-6 py-4 font-medium'>{index + 1}</td>
                    <td className='whitespace-nowrap px-6 py-4'>{round.course}</td>
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

export default Rivalrypage;

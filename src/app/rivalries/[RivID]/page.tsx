'use client';

import React, { useEffect, useState, FC } from 'react';
import { get } from 'aws-amplify/api';
import apiName from '@/apiName';
import { Rivalry } from '@/types';

const Rivalrypage = ({ params }: { params: { RivID: string } }) => {
  const rivalryID = params.RivID;
  const [rivalry, setRivalry] = useState<Rivalry>();

  const getRivalry = async () => {
    try {
      const getRivalry = get({
        apiName,
        path: `/rivalries/${rivalryID}`
      });

      const { body } = await getRivalry.response;
      const json = await body.json();
      // @ts-ignore
      const rivalry = json[0] as Rivalry;

      setRivalry(rivalry);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  };

  useEffect(() => {
    getRivalry();
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
              {rivalry.rounds.map((round, index) => {
                return (
                  <tr key={index} className='  odd:bg-green-300 even:text-black p-4 rounded-lg'>
                    <td className='whitespace-nowrap px-6 py-4 font-medium'>{index + 1}</td>
                    <td className='whitespace-nowrap px-6 py-4'>{round}</td>
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

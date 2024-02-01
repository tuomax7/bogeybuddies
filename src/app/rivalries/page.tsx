'use client';

import React, { useEffect, useState, FC } from 'react';
import Link from 'next/link';
import { get } from 'aws-amplify/api';
import { Rivalry } from '@/types';
import apiName from '../../apiName';

const RivalriesPage = () => {
  const [rivalries, setRivalries] = useState<Rivalry[]>([]);

  const getRivalries = async () => {
    try {
      const getRivalries = get({
        apiName,
        path: '/rivalries'
      });

      const { body } = await getRivalries.response;
      const json = await body.json();

      // @ts-ignore
      const rivalries = json as Rivalry[];
      setRivalries(rivalries);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  };

  useEffect(() => {
    getRivalries();
  }, []);

  return (
    <div className='space-y-2'>
      <h1 className='text-2xl'>Rivalries</h1>
      {rivalries.length <= 0 && <p>Loading rivalries...</p>}
      <table>
        <tbody>
          {rivalries.map(rivalry => (
            <tr key={rivalry.RivID}>
              <td className=' border-4 odd:bg-green-300 even:text-black p-4 rounded-lg'>
                <Link href={`/rivalries/${rivalry.RivID}`}>{rivalry.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RivalriesPage;

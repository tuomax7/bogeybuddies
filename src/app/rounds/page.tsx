'use client';

import React, { useEffect, useState, FC } from 'react';
import Link from 'next/link';
import { Round, User } from '@/types';
import { getRounds } from '@/services/roundService';
import { getUserByUID } from '@/services/userService';

import { dateToReadable } from '@/utils';

import { getCurrentUser } from 'aws-amplify/auth';

const RoundsPage = () => {
  const [user, setUser] = useState<User>();
  const [rounds, setRounds] = useState<Round[]>([]);

  const getScore = (round: Round) => round.scores.find(score => score.uuid === user?.UID);

  const getUserRounds = async () => {
    try {
      const { userId } = await getCurrentUser();

      const user = await getUserByUID(userId);

      const rounds = await getRounds([userId]);

      setUser(user);
      setRounds(rounds);
      console.log(`The userId: ${userId}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserRounds();
  }, []);

  return (
    <div className='space-y-2'>
      <h1 className='text-2xl'>Rounds</h1>
      {rounds.length <= 0 && <p>Loading rounds...</p>}
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Date</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rounds.map(round => (
            <tr key={round.RID} className=' border-4 odd:bg-green-300 even:text-black p-4 rounded-lg'>
              <td className='p-4'>
                <Link href={`/rounds/${round.RID}`}>{round.course}</Link>
              </td>
              <td className='p-4'>{dateToReadable(round.date)}</td>
              <td className='p-4'>{getScore(round)?.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoundsPage;

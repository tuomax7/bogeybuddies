'use client';

import React, { useEffect, useState, FC } from 'react';
import Link from 'next/link';
import { Round, User } from '@/types';
import { getRounds } from '@/services/roundService';
import { getUserByUID } from '@/services/userService';

import { TableRow, TableData } from '@/components/TableRow';

import { dateToReadable } from '@/utils';

import { getCurrentUser } from 'aws-amplify/auth';

const RoundsPage: FC = () => {
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
            <TableRow key={round.RID}>
              <TableData>
                <Link href={`/rounds/${round.RID}`}>{round.course}</Link>
              </TableData>
              <TableData>{dateToReadable(round.date)}</TableData>
              <TableData>{getScore(round)?.points || ''}</TableData>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoundsPage;

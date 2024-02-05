'use client';

import React, { useEffect, useState, FC } from 'react';
import { Round, ScoreInput, User } from '@/types';
import { getRound } from '@/services/roundService';
import { getUsers } from '@/services/userService';

import { TableRow, TableData } from '@/components/TableRow';

import { dateToReadable, getNamesByUIDs } from '@/utils';

const RoundPage = ({ params }: { params: { RID: string } }) => {
  const roundID = params.RID;
  const [round, setRound] = useState<Round>();
  const [players, setPlayers] = useState<User[]>([]);

  const fetchRoundData = async () => {
    try {
      const round = await getRound(roundID);

      const playerUIDs = round.players;
      const users = await getUsers(playerUIDs);

      setPlayers(users);
      setRound(round);
    } catch (e) {
      console.log(`ERROR: ${e}`);
    }
  };

  useEffect(() => {
    fetchRoundData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlayerName = (UID: string) => {
    const playerNames = getNamesByUIDs([UID], players).map(name => name.firstname);
    return playerNames[0];
  };

  return (
    <div>
      {!round && <p>Loading round scores...</p>}
      {round && (
        <div className=' flex flex-col'>
          <h2 className='text-2xl'>{round.course}</h2>
          <p className='text-xl'>{dateToReadable(round.date)}</p>
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
                  <TableRow key={index}>
                    <TableData>{index + 1}</TableData>
                    <TableData>{getPlayerName(score.uuid)}</TableData>
                    <TableData>{score.points}</TableData>
                  </TableRow>
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

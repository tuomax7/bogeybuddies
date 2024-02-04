'use client';

import React, { useEffect, useState, FC } from 'react';
import Link from 'next/link';
import { Rivalry, Round, User } from '@/types';
import { getRivalry } from '@/services/rivalryService';
import { getRounds } from '@/services/roundService';
import { getUsers } from '@/services/userService';
import { dateToReadable } from '@/utils';

const Rivalrypage = ({ params }: { params: { RivID: string } }) => {
  const rivalryID = params.RivID;
  const [rivalry, setRivalry] = useState<Rivalry>();
  const [rounds, setRounds] = useState<Round[]>([]);
  const [players, setPlayers] = useState<User[]>([]);

  const fetchRivalryData = async () => {
    try {
      const rivalryData = await getRivalry(rivalryID);
      setRivalry(rivalryData);

      const playerUIDs = rivalryData.players;

      const users = await getUsers(playerUIDs);

      setPlayers(users);

      const roundsData = await getRounds(rivalryData.players);
      setRounds(roundsData);
    } catch (e) {
      console.log(`ERROR: ${e}`);
    }
  };

  useEffect(() => {
    fetchRivalryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playerNameString = players && players.map(player => player.firstname + ' ' + player.lastname).join(', ');

  return (
    <div>
      {!rivalry && <p>Loading rivalry...</p>}
      {rivalry && (
        <div className=' flex flex-col space-y-4'>
          <h2 className='text-2xl'>{rivalry.name}</h2>
          <p className='text-lg'>{playerNameString}</p>
          <table>
            <thead>
              <tr>
                <th>Round</th>
                <th>Date</th>
                {players.map(player => (
                  <th key={player.UID}>{player.firstname}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rounds.map(round => (
                <tr key={round.RID} className=' border-4 odd:bg-green-300 even:text-black rounded-lg'>
                  <td className='p-4'>
                    <Link href={`/rounds/${round.RID}`}>{round.course}</Link>
                  </td>
                  <td className='p-4'>{dateToReadable(round.date)}</td>
                  {round.scores.map(
                    score =>
                      rivalry.players.includes(score.uuid) && (
                        <td className='py-4 px-8' key={score.uuid}>
                          {score.points}
                        </td>
                      )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Rivalrypage;

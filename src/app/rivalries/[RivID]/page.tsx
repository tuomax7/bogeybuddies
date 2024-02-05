'use client';

import React, { useEffect, useState, FC } from 'react';
import Link from 'next/link';
import { Rivalry, Round, User, Score } from '@/types';
import { getRivalry } from '@/services/rivalryService';
import { getRounds } from '@/services/roundService';
import { getUsers } from '@/services/userService';
import { dateToReadable } from '@/utils';

import { getNamesByUIDs } from '@/utils';

import { TableRow, TableData } from '@/components/TableRow';

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

  const getPlayerNameSortedScores = (scores: Score[], rivalry: Rivalry) => {
    const filteredScores = scores.filter(score => rivalry.players.includes(score.uuid));
    const sortedScores = [...filteredScores].sort((s1, s2) => {
      const scorename1 = getNamesByUIDs([s1.uuid], players)[0].firstname;
      const scorename2 = getNamesByUIDs([s2.uuid], players)[0].firstname;
      return scorename1.localeCompare(scorename2);
    });

    return sortedScores;
  };

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
                {[...players]
                  .sort((p1, p2) => p1.firstname.localeCompare(p2.firstname))
                  .map(player => (
                    <th key={player.UID}>{player.firstname}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {rounds.map(round => (
                <TableRow key={round.RID}>
                  <>
                    <TableData>
                      <Link href={`/rounds/${round.RID}`}>{round.course}</Link>
                    </TableData>
                    <TableData>{dateToReadable(round.date)}</TableData>
                    {getPlayerNameSortedScores(round.scores, rivalry).map(score => (
                      <TableData key={score.uuid}>{score.points}</TableData>
                    ))}
                  </>
                </TableRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Rivalrypage;

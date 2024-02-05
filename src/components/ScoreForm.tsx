'use client';

import React, { useEffect, useState, FC, SyntheticEvent, Dispatch, SetStateAction } from 'react';
import { ScoreInput, User } from '@/types';

import { getUsers } from '@/services/userService';
import { getNamesByUIDs } from '@/utils';
import { getCurrentUser } from 'aws-amplify/auth';

interface ScoreFormProps {
  scoresInput: ScoreInput[];
  setScoresInput: Dispatch<SetStateAction<ScoreInput[]>>;
}

const ScoreForm: FC<ScoreFormProps> = ({ scoresInput, setScoresInput }) => {
  const [UIDInput, setUIDInput] = useState<string>('');
  const [pointsInput, setPointsInput] = useState<string>('');

  const [users, setUsers] = useState<User[]>([]);

  const handleScoreSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const numberPoints = Number(pointsInput);
    const newScore: ScoreInput = {
      uuid: UIDInput,
      points: isNaN(numberPoints) ? 0 : numberPoints
    };
    setScoresInput(scoresInput.concat(newScore));
    setPointsInput('');
  };

  const fetchUsers = async () => {
    try {
      const { userId } = await getCurrentUser();
      setUIDInput(userId);
      const usersResponse = await getUsers();
      setUsers(usersResponse);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getInputtedScores = () => {
    const formatScores = scoresInput.map(score => {
      const { firstname, lastname } = getNamesByUIDs([score.uuid], users)[0];

      return {
        name: `${lastname} ${firstname}`,
        points: score.points
      };
    });
    return formatScores;
  };

  return (
    <div className='flex flex-col space-y-4 w-96'>
      <div className='flex flex-col space-y-2'>
        <label htmlFor='playerName'>Player:</label>
        <select
          id='playerName'
          name='playerName'
          className='border-2'
          onChange={e => setUIDInput(e.target.value)}
          value={UIDInput}
        >
          {users.map(user => (
            <option key={user.UID} value={user.UID}>{`${user.lastname} ${user.firstname}`}</option>
          ))}
        </select>
        <label htmlFor='score'>Score:</label>
        <input
          type='number'
          id='points'
          name='points'
          value={pointsInput}
          onChange={e => setPointsInput(e.target.value)}
          className='border-2'
        />

        <button className='p-2 border-2 bg-green-200' onClick={handleScoreSubmit}>
          Add score
        </button>
      </div>

      {getInputtedScores().length > 0 && (
        <div>
          <p className='font-bold'>Added scores</p>
          {getInputtedScores().map((score, index) => (
            <p key={index}>
              {score.name}: {score.points}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScoreForm;

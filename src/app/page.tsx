'use client';

import React, { useEffect, useState, FC, SyntheticEvent } from 'react';
import { post } from 'aws-amplify/api';
import apiName from '../apiName';

interface ScoreInput {
  uuid: string;
  name: string;
  points: number;
}

const App = () => {
  const [courseNameInput, setCourseNameInput] = useState<string>('');
  const [roundDateInput, setRoundDateInput] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');
  const [pointsInput, setPointsInput] = useState<string>('');
  const [scoresInput, setScoresInput] = useState<ScoreInput[]>([]);

  const handleScoreSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const numberPoints = Number(pointsInput);
    const newScore: ScoreInput = {
      uuid: nameInput,
      name: nameInput,
      points: isNaN(numberPoints) ? 0 : numberPoints
    };
    setScoresInput(scoresInput.concat(newScore));
    setNameInput('');
    setPointsInput('');
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const sortedScores = [...scoresInput].sort((s1, s2) => s2.points - s1.points);
      const postRound = await post({
        apiName,
        path: '/rounds',
        options: {
          body: {
            course: courseNameInput,
            date: roundDateInput,
            scores: JSON.stringify(sortedScores)
          }
        }
      });

      // const { body } = await postRound.response;
      // const json = await body.json();

      setCourseNameInput('');
      setRoundDateInput('');
      setScoresInput([]);
    } catch (error) {
      console.log('POST call failed: ', error);
    }
  };

  return (
    <div className='flex flex-col space-y-4 w-96'>
      <h2 className='text-xl'>Submit a new golf round</h2>

      <form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
        <label htmlFor='courseName'>Golf Course Name:</label>
        <input
          type='text'
          id='courseName'
          name='courseName'
          value={courseNameInput}
          onChange={e => setCourseNameInput(e.target.value)}
          required
          className='border-2'
        />

        <label htmlFor='date'>Date:</label>
        <input
          type='date'
          id='date'
          name='date'
          value={roundDateInput}
          onChange={e => setRoundDateInput(e.target.value)}
          required
          className='border-2'
        />

        <div className='flex flex-col space-y-2'>
          <label htmlFor='playerName'>Player Name:</label>
          <input
            type='string'
            id='playerName'
            name='playerName'
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            className='border-2'
          />
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

        {scoresInput.length > 0 && (
          <div>
            <p className='font-bold'>Added scores</p>
            {scoresInput.map((score, index) => (
              <p key={index}>
                {score.name}: {score.points}
              </p>
            ))}
          </div>
        )}

        <button type='submit' className='p-2 border-2 bg-green-800 text-white '>
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;

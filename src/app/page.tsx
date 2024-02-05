'use client';

import React, { useState, FC, SyntheticEvent } from 'react';
import { ScoreInput, User } from '@/types';

import { postRound } from '@/services/roundService';
import ScoreForm from '@/components/ScoreForm';

const App: FC = () => {
  const [courseNameInput, setCourseNameInput] = useState<string>('');
  const [roundDateInput, setRoundDateInput] = useState<string>('');
  const [scoresInput, setScoresInput] = useState<ScoreInput[]>([]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      postRound(scoresInput, courseNameInput, roundDateInput);

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

        <ScoreForm scoresInput={scoresInput} setScoresInput={setScoresInput} />

        <button type='submit' className='p-2 border-2 bg-green-800 text-white '>
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;

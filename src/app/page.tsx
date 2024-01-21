"use client"

import React, { useEffect, useState, FC, SyntheticEvent } from 'react'
import { signOut } from 'aws-amplify/auth';

import { post } from 'aws-amplify/api';
import apiName from '../apiName'

const App = () => {

	const [courseNameInput, setCourseNameInput] = useState<string>('');
	const [roundDateInput, setRoundDateInput] = useState<string>('');

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		
		console.log({course: courseNameInput, date: roundDateInput});
		try {
			const postRound = await post({ 
				apiName,
				path: '/rounds',
				options: {
					body: {
						course: courseNameInput,
						date: roundDateInput
					}
				}
			});

			const { body } = await postRound.response;
			const json = await body.json();

			console.log(json);


		} catch (error) {
			console.log('POST call failed: ', error);
		}
		
	};

  return (
		<div className='flex flex-col space-y-4 w-96'>

			<h2 className='text-xl'>Submit a new golf round</h2>

			<form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
				<label htmlFor="courseName">Golf Course Name:</label>
				<input type="text" id="courseName" name="courseName" onChange={(e) => setCourseNameInput(e.target.value)} required className='border-2'/>

				<label htmlFor="date">Date:</label>
				<input type="date" id="date" name="date" onChange={(e) => setRoundDateInput(e.target.value)}required className='border-2'/>

				<button type="submit" className='p-2 border-2 bg-slate-400'>Submit</button>
			</form>
		</div>
  )
}

export default App;
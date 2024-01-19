"use client"

import React, { useEffect, useState, FC } from 'react'
import { get } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify'
import awsExports from '../aws-exports'
Amplify.configure(awsExports);


const myAPI = "api7c1751eb"

interface Round {
	roundId: string;
	roundName: string;
}

const App = () => {
  const [input, setInput] = useState<string>("")
  const [rounds, setRounds] = useState<Round[]>([])


  const getRoundById = async (e: { input: string; })  => {
    let roundId = e.input

		try {
			const getRound = get({ 
				apiName: myAPI,
				path: `/rounds/${roundId}` 
			});

			const { body } = await getRound.response;
			const json = await body.json();

			// @ts-ignore
			const round = json as Round;
			setRounds(rounds.concat(round))

		} catch (error) {
			console.log('GET call failed: ', error);
		}
  }

  return (
    
    <div className='flex flex-col'>
      <h1 className='text-2xl text-center'>Golf app backend template</h1>
      <div className='py-2'>
          <input className='w-full border-2' placeholder="round id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>      
      </div>
      <button className='w-full border-2' onClick={() => getRoundById({input})}>Get Round From Backend</button>

      <h2 className='text-xl' style={{visibility: rounds.length > 0 ? 'visible' : 'hidden' }}>Round responses</h2>
      {
       rounds.map((thisRound, index) => {
         return (
        <div key={thisRound.roundId}>
          <span><b>roundId:</b> {thisRound.roundId} - <b>Roundname</b>: {thisRound.roundName}</span>
        </div>)
       })
      }
    </div>
  )
}

export default App;
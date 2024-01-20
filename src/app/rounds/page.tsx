"use client"

import React, { useEffect, useState, FC } from 'react'
import { get } from 'aws-amplify/api';
import { Round } from '@/types'

const myAPI = "bogeybuddiesAPI"


const RoundsPage = () => {

  const [rounds, setRounds] = useState<Round[]>([])

  const getRounds = async ()  => {

		try {
			const getRounds = get({ 
				apiName: myAPI,
				path: '/rounds'
			});

			const { body } = await getRounds.response;
			const json = await body.json();

			// @ts-ignore
			const rounds = json as Round[];
			setRounds(rounds);

		} catch (error) {
			console.log('GET call failed: ', error);
		}
  }

	useEffect(() => {
		getRounds();
	}, [])


  return (
		<div>
			<h1>Rounds</h1>
			<div>
				{rounds.map(round => <p key={round.RID}>{round.course} on {round.date}</p>)}
			</div>
		</div>
  )
}

export default RoundsPage;
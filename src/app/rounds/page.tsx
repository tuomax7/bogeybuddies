"use client"

import React, { useEffect, useState, FC } from 'react'
import Link from 'next/link'
import { get } from 'aws-amplify/api';
import { Round } from '@/types'
import apiName from "../../apiName"

const RoundsPage = () => {

  const [rounds, setRounds] = useState<Round[]>([])

  const getRounds = async ()  => {

		try {
			const getRounds = get({ 
				apiName,
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
			<h1 className='text-xl'>Rounds</h1>
			<table>
				<tbody>
				{rounds.map(round => <tr key={round.RID}><td><Link href={`/rounds/${round.RID}`}>{round.course} on {round.date}</Link></td></tr>)}
				</tbody>
			</table>
		</div>
  )
}

export default RoundsPage;
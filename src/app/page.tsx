"use client"

import React, { useEffect, useState, FC } from 'react'
import { signOut } from 'aws-amplify/auth';


const App = () => {

  return (
		<div className='flex flex-col'>
			<button onClick={() => signOut()}>Sign out</button>
			<h1 className='text-2xl text-center'>Bogey Buddies!</h1>
		</div>
  )
}

export default App;
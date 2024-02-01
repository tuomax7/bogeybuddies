'use client';

import React, { FC } from 'react';
import Link from 'next/link';
// import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
// import awsExports from '../aws-exports';
// mplify.configure(awsExports);

const NavBar: FC = () => {
  return (
    <div className='flex flex-row bg-green-800 text-white w-full p-4 space-x-4'>
      <h1 className='text-2xl flex-grow'>
        <Link href='/'>BogeyBuddies</Link>
      </h1>
      <Link href='/' className='text-xl'>
        Home
      </Link>
      <Link href='/rounds' className='text-xl'>
        Rounds
      </Link>
      <button onClick={() => signOut()} className='border-2 p-2'>
        Sign out
      </button>
    </div>
  );
};

export default NavBar;

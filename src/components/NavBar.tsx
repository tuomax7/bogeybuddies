'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { signOut } from 'aws-amplify/auth';

const NavBar: FC = () => {
  return (
    <div className='flex flex-row bg-green-800 text-white w-full p-4 space-x-4 items-center'>
      <h1 className='text-2xl flex-grow'>
        <Link href='/'>BogeyBuddies</Link>
      </h1>
      <Link href='/' className='text-xl'>
        Home
      </Link>
      <Link href='/rivalries' className='text-xl'>
        Rivalries
      </Link>
      <Link href='/rounds' className='text-xl'>
        My Rounds
      </Link>
      <button onClick={() => signOut()} className='border-2 p-2'>
        Sign out
      </button>
    </div>
  );
};

export default NavBar;

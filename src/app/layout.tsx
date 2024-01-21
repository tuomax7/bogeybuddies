'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import './globals.css';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from '../aws-exports';
import { signOut } from 'aws-amplify/auth';
Amplify.configure(awsExports);

interface LayOutProps {
  children: React.ReactNode;
}

const RootLayout: FC<LayOutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Authenticator className='my-10'>
          <div className='flex flex-col w-full justify-center items-center space-y-4'>
            <div className='flex flex-row bg-slate-500 text-white w-full p-4 space-x-4'>
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
            {children}
          </div>
        </Authenticator>
      </body>
    </html>
  );
};

export default RootLayout;

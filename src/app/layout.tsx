'use client';

import React, { FC } from 'react';
import './globals.css';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);

import NavBar from '@/components/NavBar';

interface LayOutProps {
  children: React.ReactNode;
}

const RootLayout: FC<LayOutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <title>BogeyBuddies</title>
      </head>
      <body>
        <Authenticator className='my-10'>
          <div className='flex flex-col w-full justify-center items-center space-y-4'>
            <NavBar />
            {children}
          </div>
        </Authenticator>
      </body>
    </html>
  );
};

export default RootLayout;

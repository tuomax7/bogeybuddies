"use client"

import React, {FC} from 'react'
import "./globals.css";
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from '../aws-exports'
Amplify.configure(awsExports);


interface LayOutProps {
	children:  React.ReactNode;
}

const RootLayout: FC<LayOutProps> = ({children}) => {
  return (
    <html lang="en">
      <body className='flex justify-center'>
					<Authenticator>{children}</Authenticator>
			</body>
    </html>
  );
}

export default RootLayout;
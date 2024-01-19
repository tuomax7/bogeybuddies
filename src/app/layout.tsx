import React, {FC} from 'react'
import type { Metadata } from "next";
import "./globals.css";
import { Amplify } from 'aws-amplify'
import awsExports from '../aws-exports'
Amplify.configure(awsExports);

export const metadata: Metadata = {
  title: "BogeyBuddies",
  description: "An app for tracking amateur golf rivalries.",
};

interface LayOutProps {
	children:  React.ReactNode;
}

const RootLayout: FC<LayOutProps> = ({children}) => {
  return (
    <html lang="en">
      <body className='flex justify-center'>
					{children}
			</body>
    </html>
  );
}

export default RootLayout;
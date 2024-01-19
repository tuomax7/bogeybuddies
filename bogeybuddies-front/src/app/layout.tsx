import type { Metadata } from "next";
import "./globals.css";
import { Amplify } from 'aws-amplify'
import awsExports from '../aws-exports'
Amplify.configure(awsExports);

export const metadata: Metadata = {
  title: "BogeyBuddies",
  description: "An app for tracking amateur golf rivalries.",
};

const RootLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <html lang="en">
      <body className='flex justify-center'>{children}</body>
    </html>
  );
}

export default RootLayout;
import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Navbar from './ui/navbar';
import Provider from './Provider'
// import Toast from './toast';
import { Suspense } from 'react';




export const metadata = {
  title: 'Afroquotes',
  description:
    'Quotes of African origin, especially Afropop artists. Provide verified contributed annotations.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
      <Provider>
        <Suspense>
          <Navbar />
        </Suspense>
        {children}
        <Analytics />
        </ Provider >
      </body>
    </html>
  );
}
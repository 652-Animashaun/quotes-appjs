import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './frontpage/nav'
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
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
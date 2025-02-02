'use client';
// import type { Metadata } from 'next';
import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import localFont from 'next/font/local';
import './styles/globals.css';
import { KankaDataProvider } from '../contexts';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// export const metadata: Metadata = {
//   title: 'Kanka Next',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <KankaDataProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>{children}</main>
          </ThemeProvider>
        </KankaDataProvider>
      </body>
    </html>
  );
}

// src/app/layout.tsx

import type { Metadata } from 'next';
import Script from 'next/script';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import type { ReactNode } from 'react';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '🛍️ Shoppable Video Demo – Next.js & Cloudinary',
  description:
    'Explore Cloudinary’s Shoppable Video Player in a Next.js 15.3 app.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      className={`${spaceGrotesk.className} ${jetbrainsMono.className}`}
    >
      <head>
        {/* 1️⃣ Stylesheet from CDN (avoid deep-import errors) */}
        <link
          rel='stylesheet'
          href='https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.css'
        />

        {/* 2️⃣ per-source-behaviors plugin (must register before Shoppable) */}
        <Script
          src='https://unpkg.com/videojs-per-source-behaviors/dist/videojs-per-source-behaviors.min.js'
          strategy='beforeInteractive'
        />

        {/* 3️⃣ Cloudinary UMD bundle (core + Shoppable + all dependencies) */}
        <Script
          src='https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.js'
          strategy='beforeInteractive'
        />
      </head>
      <body className='antialiased flex flex-col min-h-screen'>
        <Navbar />
        <main className='flex-grow pt-16 px-4 sm:px-6 lg:px-8'>{children}</main>
        <Footer />
        <Toaster position='bottom-right' />
      </body>
    </html>
  );
}

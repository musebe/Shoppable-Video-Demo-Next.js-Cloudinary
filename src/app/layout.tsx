import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import 'cloudinary-video-player/cld-video-player.min.css';
import './globals.css';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import type { ReactNode } from 'react';

// Primary sans-serif for modern UI
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

// Monospace for code and labels
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: '🛍️ Shoppable Video Demo – Next.js & Cloudinary',
  description:
    'Explore how to integrate Cloudinary’s Shoppable Video Player into a modern Next.js 15 storefront, styled with shadcn/ui and animated with Motion.dev.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={`
          ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased
          flex flex-col min-h-screen
        `}
      >
        <Navbar />
        <main className='flex-grow pt-16 px-4 sm:px-6 lg:px-8'>{children}</main>
        <Footer />
        <Toaster position='bottom-right' />
      </body>
    </html>
  );
}

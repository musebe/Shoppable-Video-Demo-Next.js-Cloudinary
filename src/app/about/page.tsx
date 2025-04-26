// src/app/about/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const FEATURES = [
  {
    title: 'Interactive Product Hotspots',
    description:
      'Tap-ready pins pop up exactly when a product is on screen, revealing price, name and a Buy Now link without pausing the video.',
  },
  {
    title: 'Auto-Scrolling Product Panel',
    description:
      'A slide-in panel lists every item as it appears, keeps itself in sync with the timeline, and highlights the product currently on screen.',
  },
  {
    title: 'Time-Synced Event Analytics',
    description:
      'Every view, hover, seek and click is time-stamped and pushed to GA 4 / Segment, giving you conversion-grade insight at the second-level.',
  },
  {
    title: 'One-Click Checkout Links',
    description:
      'Each call-to-action deep-links to your product page with optional discount codes pre-applied—no friction, more sales.',
  },
];

export default function AboutPage() {
  return (
    <main className='container mx-auto px-4 sm:px-6 md:px-8 py-16 space-y-20'>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className='flex flex-col items-center text-center space-y-6 px-2'>
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 12,
            delay: 0.2,
          }}
          whileHover={{ scale: 1.2, rotate: 10 }}
          className='text-6xl sm:text-7xl md:text-8xl'
        >
          <span role='img' aria-label='Shopping Cart'>
            🛒
          </span>
        </motion.span>

        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl'>
          About <span className='text-indigo-600'>Shoppable</span> Video
        </h1>

        <p className='text-base sm:text-lg md:text-xl max-w-prose leading-relaxed mx-auto text-left md:text-justify'>
          Discover how Cloudinary’s Shoppable Video Player, Motion.dev
          animations, and shadcn/ui components combine to create a seamless,
          interactive shopping experience in any Next.js store. Scroll down to
          see the features, or tap the button below to try the live demo.
        </p>

        <Link href='/' className='inline-block'>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size='lg'>View Shoppable Demo</Button>
          </motion.div>
        </Link>

        <div className='w-full max-w-3xl overflow-hidden rounded-2xl shadow-lg'>
          <Image
            src='/demo3.png'
            alt='Shoppable Video Demo Preview'
            width={1600}
            height={900}
            priority
            className='object-cover w-full'
          />
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2'>
        {FEATURES.map((feat, idx) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className='flex'
          >
            <Card className='flex-1 hover:shadow-xl transition-shadow'>
              <CardHeader>
                <CardTitle className='text-lg sm:text-xl'>
                  {feat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-sm sm:text-base'>
                  {feat.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* ── Tech Stack ─────────────────────────────────────── */}
      <section className='space-y-4 px-2'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-2xl sm:text-3xl font-bold text-center'
        >
          Built With
        </motion.h2>
        <div className='flex flex-wrap gap-3 justify-center'>
          <Badge variant='outline'>Next.js 15</Badge>
          <Badge variant='outline'>React 19</Badge>
          <Badge variant='outline'>Tailwind CSS 4</Badge>
          <Badge variant='outline'>shadcn/ui</Badge>
          <Badge variant='outline'>Motion.dev</Badge>
          <Badge variant='outline'>Cloudinary AI</Badge>
        </div>
      </section>
    </main>
  );
}

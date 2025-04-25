'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/** Feature bullets for the Shoppable-Video demo */
const FEATURES = [
  {
    title: 'Interactive Product Hotspots',
    description:
      'Tap-ready pins pop up exactly when a product is on screen, revealing price, name and a “Buy Now” link without pausing the video.',
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
    <main className='container mx-auto px-6 py-16 space-y-24'>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col items-center text-center space-y-6'
      >
        <h1 className='text-5xl font-extrabold leading-tight'>
          🛒 About&nbsp;Shoppable&nbsp;Video
        </h1>

        <p className='text-lg max-w-2xl text-muted-foreground leading-relaxed'>
          Discover how Cloudinary’s Shoppable Video Player, Motion.dev
          animations, and shadcn/ui components combine to create a seamless,
          interactive shopping experience in any Next.js store.
        </p>

        <Link href='/' passHref>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size='lg'>View Shoppable Demo</Button>
          </motion.div>
        </Link>

        <div className='mx-auto w-full max-w-3xl overflow-hidden rounded-2xl shadow-lg'>
          <Image
            src='/demo3.png'
            alt='Shoppable Video Demo Preview'
            width={1600}
            height={900}
            priority
            className='object-cover'
          />
        </div>
      </motion.section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
        <AnimatePresence>
          {FEATURES.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className='h-full hover:shadow-xl transition-shadow'>
                <CardHeader>
                  <CardTitle>{feat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feat.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* ── Tech Stack ────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='space-y-4'
      >
        <h2 className='text-3xl font-bold'>Built With</h2>
        <div className='flex flex-wrap gap-4'>
          <Badge variant='outline'>Next.js 15</Badge>
          <Badge variant='outline'>React 19</Badge>
          <Badge variant='outline'>Tailwind CSS 4</Badge>
          <Badge variant='outline'>shadcn/ui</Badge>
          <Badge variant='outline'>Motion.dev</Badge>
          <Badge variant='outline'>Cloudinary AI</Badge>
        </div>
      </motion.section>
    </main>
  );
}

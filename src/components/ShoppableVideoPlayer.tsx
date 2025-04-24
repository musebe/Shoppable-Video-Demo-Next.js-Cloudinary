'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { createShoppablePlayer } from '@/lib/cloudinary-player';
import { SHOPPABLE_CONFIG } from '@/lib/shoppable-config';

export function ShoppableVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      console.error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME missing');
      return;
    }

    createShoppablePlayer(videoRef.current.id, {
      cloud_name: cloudName,
      fluid: true,
      autoplay: true, // <-- real autoplay
      muted: true, //   required by browsers
      controls: true,
    })
      .then((player) => {
        player.source('shoppable-video/shoppable_demo', {
          ...SHOPPABLE_CONFIG,
          sourceTypes: ['mp4'],
          resourceType: 'video',
        });
      })
      .catch((err) =>
        console.error('Error initialising Cloudinary player:', err)
      );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className='w-full max-w-3xl mx-auto'
    >
      <video
        id='cld-video'
        ref={videoRef}
        className='cld-video-player cld-fluid'
      />
    </motion.div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { createShoppablePlayer } from '@/lib/cloudinary-player';
import { SHOPPABLE_CONFIG } from '@/lib/shoppable-config';

type Props = {
  onTimeUpdate: (t: number) => void;
};

export function ShoppableVideoPlayer({ onTimeUpdate }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!videoRef.current) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      console.error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is missing');
      return;
    }

    let dispose: () => void;

    createShoppablePlayer(videoRef.current.id, {
      cloud_name: cloudName,
      fluid: true,
      autoplay: true,
      muted: true,
      controls: true,
    })
      .then((player) => {
        const startState = prefersReducedMotion ? 'open' : 'closed';

        player.source('shoppable-video/shoppable_demo', {
          ...SHOPPABLE_CONFIG,
          shoppable: {
            ...SHOPPABLE_CONFIG.shoppable,
            startState,
            autoClose: 0,
          },
          sourceTypes: ['mp4'],
          resourceType: 'video',
        });

        let lastT = 0;

        function handleTime() {
          const t = player.currentTime();
          if (Math.abs(t - lastT) >= 0.25) {
            onTimeUpdate(t);
            lastT = t;
          }
        }

        player.on('timeupdate', handleTime);

        dispose = () => {
          player.off('timeupdate', handleTime);
          player.dispose();
        };
      })
      .catch((err) => console.error('Cloudinary player error:', err));

    return () => dispose?.();
  }, [prefersReducedMotion, onTimeUpdate]);

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

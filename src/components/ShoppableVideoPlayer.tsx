'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { createShoppablePlayer } from '@/lib/cloudinary-player';
import { SHOPPABLE_CONFIG } from '@/lib/shoppable-config';

type Props = { onTimeUpdate: (t: number) => void };

export function ShoppableVideoPlayer({ onTimeUpdate }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    if (!cloudName) {
      console.error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is missing');
      return;
    }

    let dispose: () => void;

    (async () => {
      try {
        /** Cast to any because the official types lack `.on`, `.off`, etc. */
        const player = (await createShoppablePlayer(videoEl, {
          cloud_name: cloudName,
          fluid: true,
          autoplay: true,
          muted: true,
          controls: true,
        })) as any;

        player.source('shoppable-video/shoppable_demo', {
          ...SHOPPABLE_CONFIG,
          shoppable: {
            ...SHOPPABLE_CONFIG.shoppable,
            startState: prefersReducedMotion ? 'open' : 'closed',
            autoClose: 0,
          },
          sourceTypes: ['mp4'],
          resourceType: 'video',
        });

        let last = 0;
        const onTick = () => {
          /** Force‐narrow to number — `currentTime()` overload is mis-typed */
          const t = player.currentTime() as number;
          if (Math.abs(t - last) >= 0.25) {
            onTimeUpdate(t);
            last = t;
          }
        };

        player.on('timeupdate', onTick);

        dispose = () => {
          player.off('timeupdate', onTick);
          player.dispose();
        };
      } catch (e) {
        console.error('Cloudinary player error:', e);
      }
    })();

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
        key='shoppable-main'
        ref={videoRef}
        className='cld-video-player cld-fluid'
        preload='metadata'
        playsInline
      />
    </motion.div>
  );
}

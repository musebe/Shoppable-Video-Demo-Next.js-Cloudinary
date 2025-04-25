'use client';

import { TextShimmer } from './ui/text-shimmer';

/** Shimmering orange tagline, responsive down to XS screens */
export function PageHeadline() {
  return (
    <div
      /* flex-row on md↑, wraps & centres on sm↓ */
      className='flex flex-wrap md:flex-nowrap items-center justify-center gap-1 md:gap-2 
                 text-base sm:text-lg md:text-xl font-medium italic text-center'
    >
      {/* plain-color emojis (never tinted by the shimmer) */}
      <span role='img' aria-label='clapper board' className='shrink-0'>
        🎬
      </span>

      {/* shimmer only on the text portion */}
      <TextShimmer
        duration={1.2}
        className='[--base-color:#ff7433] [--base-gradient-color:#ffb88f] 
                   dark:[--base-color:#ff6a23] dark:[--base-gradient-color:#ffa56d]'
      >
        Press Play to explore our shoppable video
      </TextShimmer>

      <span role='img' aria-label='shopping bags' className='shrink-0'>
        🛍️
      </span>
    </div>
  );
}

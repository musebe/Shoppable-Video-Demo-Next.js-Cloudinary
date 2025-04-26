// global.d.ts

// we import the CSS directly in layout.tsx
declare module 'cloudinary-video-player/dist/cld-video-player.min.css';
// window.cloudinary.videoPlayer from the UMD bundle
declare global {
    interface Window {
        cloudinary: any;
    }
}

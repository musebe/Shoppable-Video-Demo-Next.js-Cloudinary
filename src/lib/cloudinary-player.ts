// src/lib/cloudinary-player.ts

/**
 * Instantiate the global Cloudinary Video Player that the UMD bundle
 * has already registered on window.cloudinary.videoPlayer.
 */
export async function createShoppablePlayer(
    container: HTMLVideoElement | string,
    options: { cloud_name: string } & Record<string, any>,
) {
    if (typeof window === 'undefined') {
        throw new Error('createShoppablePlayer() can only run in the browser');
    }
    // @ts-ignore — injected by the UMD <Script>
    return window.cloudinary.videoPlayer(container, options);
}

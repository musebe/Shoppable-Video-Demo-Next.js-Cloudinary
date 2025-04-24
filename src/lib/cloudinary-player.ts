// src/lib/cloudinary-player.ts

/**
 * A lightweight wrapper to dynamically load the Cloudinary Video Player
 * and its Shoppable plugin only in the browser, keeping your initial
 * bundle minimal.
 */

let modulesLoaded = false;

/**
 * Dynamically imports the core player runtime and the Shoppable plugin.
 * Subsequent calls are no-ops.
 */
async function loadModules(): Promise<void> {
    if (modulesLoaded) return;

    await Promise.all([
        // Core runtime entrypoint — injects `window.cloudinary.videoPlayer`
        import('cloudinary-video-player'),
        // Shoppable feature plugin
        import('cloudinary-video-player/shoppable'),
    ]);

    modulesLoaded = true;
}

/**
 * Instantiates a Shoppable Video Player in the given <video> container.
 *
 * @param containerId - the `id` attribute of your <video> element
 * @param options     - must include `cloud_name`, plus any other player or source options
 * @returns           - the initialized player instance
 */
export async function createShoppablePlayer(
    containerId: string,
    options: { cloud_name: string } & Record<string, any>
): Promise<any> {
    if (typeof window === 'undefined') {
        throw new Error('createShoppablePlayer() can only be called in the browser');
    }

    // Ensure the player scripts are loaded once
    await loadModules();

    // @ts-ignore — window.cloudinary is injected by the loaded script
    return window.cloudinary.videoPlayer(containerId, options);
}

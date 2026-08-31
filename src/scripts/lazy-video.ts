/**
 * The project recordings are several megabytes each, so neither the source
 * nor the poster is fetched until the phone frame is near the viewport. Playback is paused
 * again on the way out so offscreen videos never decode frames.
 */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

export function initLazyVideos(root: ParentNode = document): void {
  const videos = root.querySelectorAll<HTMLVideoElement>("video[data-lazy-video]");
  if (videos.length === 0) return;

  const load = (video: HTMLVideoElement): void => {
    // The poster is deferred alongside the source: as a plain attribute it
    // would be fetched on render regardless of preload="none".
    const poster = video.dataset.poster;
    if (poster && !video.poster) video.poster = poster;

    const src = video.dataset.src;
    if (src && !video.src) {
      video.src = src;
      video.load();
    }
  };

  // With reduced motion we still load the video, but the user presses play.
  if (prefersReducedMotion.matches) {
    videos.forEach((video) => {
      video.controls = true;
      load(video);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          load(video);
          void video.play().catch(() => {
            // Autoplay can still be refused (e.g. Low Power Mode); show controls.
            video.controls = true;
          });
        } else if (!video.paused) {
          video.pause();
        }
      }
    },
    { rootMargin: "200px 0px", threshold: 0.25 },
  );

  videos.forEach((video) => observer.observe(video));
}

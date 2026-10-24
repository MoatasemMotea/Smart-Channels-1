"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

/**
 * A video that downloads only while it is on screen (D-086).
 *
 * The element always renders with its poster and preload="none" but no
 * src. When it enters the viewport the src is attached (and, with
 * autoPlay, it plays); when it leaves, it is paused, the src removed and
 * load() called — the download stops and the buffer is freed, the poster
 * returns. A hidden tab pauses an autoplaying video and resumes it on
 * return. The only preload="auto" left on the site is the D-085 intro.
 */
type Props = Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "preload" | "autoPlay"> & {
  src: string;
  autoPlay?: boolean;
};

export function LazyVideo({ src, autoPlay = false, muted, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(!!e?.isIntersecting), { threshold: 0 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !onScreen) return;
    if (muted) v.muted = true; // autoplay needs the property, not only the attribute
    v.src = src;
    if (autoPlay) v.play().catch(() => {});
    const onVisibility = () => {
      if (!autoPlay) return;
      if (document.visibilityState === "hidden") v.pause();
      else v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      // off screen (or unmounted): stop the download and free the buffer
      v.pause();
      v.removeAttribute("src");
      v.load();
    };
  }, [onScreen, src, autoPlay, muted]);

  // every caller passes `muted` for decorative footage (the rule cannot see through the prop)
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={ref} preload="none" muted={muted} {...rest} />;
}

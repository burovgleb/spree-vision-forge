import { useEffect, useRef, useState } from "react";

export function useHideOnScroll(threshold = 80, distance = 8) {
  const [hidden, setHidden] = useState(false);
  const anchorY = useRef(0);

  useEffect(() => {
    anchorY.current = Math.max(window.scrollY, 0);
    let frame: number | null = null;

    const update = () => {
      const currentY = Math.max(window.scrollY, 0);

      if (currentY <= threshold) {
        setHidden(false);
        anchorY.current = currentY;
      } else if (currentY > anchorY.current + distance) {
        setHidden(true);
        anchorY.current = currentY;
      } else if (currentY < anchorY.current - distance) {
        setHidden(false);
        anchorY.current = currentY;
      }

      frame = null;
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [distance, threshold]);

  return hidden;
}

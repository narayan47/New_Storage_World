import { useEffect, useState } from "react";

export default function useSmoothProgress(target, speed = 15) {
  const [smooth, setSmooth] = useState(0);

  useEffect(() => {
    if (smooth === target) return;

    const timer = setInterval(() => {
      setSmooth((prev) => {
        if (prev < target) return Math.min(prev + 1, target);
        if (prev > target) return Math.max(prev - 1, target);
        return prev;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [target, smooth, speed]);

  return smooth;
}

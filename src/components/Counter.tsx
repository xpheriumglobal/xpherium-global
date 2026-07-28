import { animate, motion, useInView, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  
  const numMatch = value.match(/[\d.]+/);
  const suffix = value.replace(/[\d.]+/, '');
  const num = numMatch ? parseFloat(numMatch[0]) : 0;
  
  const motionValue = useMotionValue(0);
  
  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, num, {
        duration: 2,
        ease: "easeOut"
      });
      return controls.stop;
    }
  }, [motionValue, inView, num]);
  
  const formatted = useTransform(motionValue, (latest) => {
    return Math.round(latest).toString() + suffix;
  });
  
  if (!numMatch) {
    return <span className={className}>{value}</span>;
  }
  
  return <motion.span ref={ref} className={className}>{formatted}</motion.span>;
}

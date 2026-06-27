"use client";

import React, { useRef, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  Variants,
} from "framer-motion";

/* ─── Shared easing ─── */
export const ease = [0.22, 1, 0.36, 1] as const;
export const easeSoft = [0.25, 0.46, 0.45, 0.94] as const;

/* ─── FadeUp ─── */
interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: keyof React.JSX.IntrinsicElements;
  amount?: number;
}

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.72,
  as: Tag = "div",
  amount = 0.15,
}: FadeUpProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </MotionTag>
  );
}

/* ─── StaggerList — wraps a list, children stagger in ─── */
interface StaggerListProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}

const staggerContainer: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export function StaggerList({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  amount = 0.1,
}: StaggerListProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={stagger}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </motion.div>
  );
}

export { staggerItem };

/* ─── ParallaxLayer — drifts on scroll ─── */
interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number; // positive = same dir as scroll, negative = opposite
  style?: React.CSSProperties;
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.18,
  style,
}: ParallaxLayerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <motion.div ref={ref} className={className} style={{ y, ...style }}>
      {children}
    </motion.div>
  );
}

/* ─── ScaleReveal — scales up from 0.94 on scroll entry ─── */
interface ScaleRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScaleReveal({ children, className, delay = 0 }: ScaleRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ─── WordReveal — stagger individual words inside a heading ─── */
interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.08,
}: WordRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.22em" }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: delay + i * stagger, ease }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

"use client";

import React, { useRef, ReactNode, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  Variants,
  useReducedMotion,
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
  duration = 0.28,
  as: Tag = "div",
  amount = 0.15,
}: FadeUpProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  const initialY = shouldReduceMotion ? "0px" : "12px";

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, transform: `translateY(${initialY})` }}
      animate={inView ? { opacity: 1, transform: "translateY(0px)" } : { opacity: 0, transform: `translateY(${initialY})` }}
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
  visible: (custom: any) => {
    const stagger = custom?.stagger ?? 0.08;
    const shouldReduceMotion = custom?.shouldReduceMotion ?? false;
    return {
      transition: { staggerChildren: shouldReduceMotion ? 0 : stagger },
    };
  },
};

const staggerItem: Variants = {
  hidden: (custom: any) => {
    const shouldReduceMotion = custom?.shouldReduceMotion ?? false;
    return { 
      opacity: 0, 
      transform: shouldReduceMotion ? "translateY(0px)" : "translateY(12px)" 
    };
  },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.28, ease },
  },
};

export function StaggerList({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.1,
}: StaggerListProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={{ stagger, shouldReduceMotion }}
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
  const shouldReduceMotion = useReducedMotion();

  const initialTransform = shouldReduceMotion ? "translateY(0px) scale(1)" : "translateY(8px) scale(0.96)";

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, transform: initialTransform }}
      animate={inView ? { opacity: 1, transform: "translateY(0px) scale(1)" } : { opacity: 0, transform: initialTransform }}
      transition={{ duration: 0.28, delay, ease }}
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
  stagger = 0.04,
}: WordRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const initialY = shouldReduceMotion ? "0px" : "10px";
  const actualStagger = shouldReduceMotion ? 0 : stagger;

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.22em" }}
          initial={{ opacity: 0, transform: `translateY(${initialY})` }}
          animate={inView ? { opacity: 1, transform: "translateY(0px)" } : {}}
          transition={{ duration: 0.28, delay: delay + i * actualStagger, ease }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── ClipReveal — brutalist horizontal wipe using clip-path ─── */
interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ClipReveal({ children, className, delay = 0, duration = 0.4 }: ClipRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });
  const shouldReduceMotion = useReducedMotion();

  const initialClipPath = shouldReduceMotion ? "inset(0 0 0 0)" : "inset(0 100% 0 0)";

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: initialClipPath }}
      animate={inView ? { clipPath: "inset(0 0 0 0)" } : { clipPath: initialClipPath }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Magnetic — Pulls element toward cursor ─── */
interface MagneticProps {
  children: React.ReactElement;
  className?: string;
  intensity?: number;
}

export function Magnetic({ children, className, intensity = 0.2 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (ref.current) {
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * intensity, y: middleY * intensity });
    }
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── ScrambleText — Cryptographic text decoding ─── */
interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const CHARS = "!@#$%^&*<>_+-=[]{}|;:,./?";

export function ScrambleText({ text, className, delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = React.useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    const totalFrames = 24;
    const delayMs = delay * 1000;
    let timeoutId: NodeJS.Timeout;
    let rafId: number;

    const animate = () => {
      let result = "";
      const progress = frame / totalFrames;
      
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          result += " ";
        } else if (i < progress * text.length) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      
      setDisplayText(result);
      
      if (frame < totalFrames) {
        frame++;
        rafId = requestAnimationFrame(animate);
      }
    };

    timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [inView, text, delay, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {displayText || (shouldReduceMotion ? text : text.replace(/[^\s]/g, "-"))}
    </span>
  );
}

/* ─── ScannerReveal — Laser printer reveal ─── */
export function ScannerReveal({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -50px 0px" });
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) return <div>{children}</div>;

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", width: "100%" }}>
      {/* Faint background text */}
      <div style={{ opacity: 0.2 }}>{children}</div>
      
      {/* Solid text revealed by scanner */}
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={inView ? { clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 100% 0)" }}
        transition={{ duration: 2.5, delay, ease: "linear" }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        {children}
      </motion.div>
      
      {/* The scanning laser line */}
      <motion.div
        initial={{ top: "0%", opacity: 0 }}
        animate={inView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : { top: "0%", opacity: 0 }}
        transition={{ duration: 2.5, delay, ease: "linear" }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: "var(--rust)",
          boxShadow: "0 0 8px var(--rust)",
          zIndex: 10,
        }}
      />
    </div>
  );
}

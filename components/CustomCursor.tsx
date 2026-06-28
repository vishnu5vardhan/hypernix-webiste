"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");

  // Use motion values for better performance (bypasses React state overhead)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for the cursor follower
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (target.closest(".case-card-yellow")) {
        setHoverText("VIEW");
        setIsHovered(true);
      } else if (
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea"
      ) {
        setHoverText("TYPE");
        setIsHovered(true);
      } else if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setHoverText("CLICK");
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: smoothX,
        y: smoothY,
        width: 24,
        height: 24,
        backgroundColor: "var(--rust)",
        pointerEvents: "none",
        zIndex: 9999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
        borderRadius: isHovered ? "0%" : "0%", // Keep it brutalist (square)
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Optional: Add "VIEW" text when hovered */}
      <motion.span 
        style={{ color: "var(--paper)", fontSize: "4.5px", fontWeight: 800, fontFamily: "var(--font-mono)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        {hoverText}
      </motion.span>
    </motion.div>
  );
}

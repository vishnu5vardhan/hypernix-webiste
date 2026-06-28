"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const blocks = [
  { id: 1, chaotic: "WhatsApp", clean: "Workflows", delay: 0 },
  { id: 2, chaotic: "Excel", clean: "Billing", delay: 0.1 },
  { id: 3, chaotic: "Memory", clean: "Tasks", delay: 0.2 },
  { id: 4, chaotic: "Sticky Notes", clean: "Leads", delay: 0.15 },
];

export default function DefragSystem() {
  const containerRef = useRef(null);
  
  // Track scroll progress over this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Z goes from 800 (high up) to 0 (slotted in)
  const rawZ = useTransform(scrollYProgress, [0.2, 0.8], [600, 0]);
  
  // Add a stiff spring for that heavy "thud" feel
  const z = useSpring(rawZ, { stiffness: 120, damping: 20 });

  return (
    <div ref={containerRef} className="defrag-container">
      <div className="iso-scene">
        <div className="iso-grid">
          {/* Dropping Blocks */}
          {blocks.map((block, i) => {
            // Stagger the drop slightly per block
            const blockZ = useTransform(z, (latestZ) => {
              const staggered = latestZ + (i * 80);
              return Math.max(0, staggered); // Don't go below 0 (the floor)
            });

            // Color and text switch abruptly when it hits the floor (Z < 5)
            const isSlotted = useTransform(blockZ, (latestZ) => latestZ < 5);
            const bgColor = useTransform(blockZ, [50, 0], ["#111111", "#E8DFD8"]);
            const textColor = useTransform(blockZ, [50, 0], ["#ff3333", "#111111"]);
            const border = useTransform(blockZ, [50, 0], ["2px dashed #ff3333", "4px solid #111111"]);

            return (
              <div className="iso-slot-wrapper" key={`slot-${block.id}`}>
                {/* The empty base slot on the floor */}
                <div className="iso-slot" />

                {/* The 3D dropping block */}
                <motion.div
                  className="iso-block"
                  style={{ 
                    translateZ: blockZ,
                    backgroundColor: bgColor,
                    color: textColor,
                    border: border,
                    boxShadow: useTransform(blockZ, (zVal) => `4px ${Math.max(4, zVal / 5 + 4)}px 0px #111`),
                  }}
                >
                  <motion.span 
                    className="iso-text chaotic-text"
                    style={{ opacity: useTransform(isSlotted, (slotted) => slotted ? 0 : 1) }}
                  >
                    {block.chaotic}
                  </motion.span>
                  <motion.span 
                    className="iso-text clean-text"
                    style={{ opacity: useTransform(isSlotted, (slotted) => slotted ? 1 : 0) }}
                  >
                    {block.clean}
                  </motion.span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

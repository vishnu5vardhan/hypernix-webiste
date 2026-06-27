"use client";

import React from "react";
import { motion } from "framer-motion";

const TICKER_TEXT = "// SYSTEM LEAKS FOUND // OPERATIONS MAPPED // WORKFLOW DEPLOYED // INTERNAL PROCESS SCALED ";

export default function SystemTicker() {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "var(--ink)",
        color: "var(--rust)",
        padding: "16px 0",
        borderTop: "3px solid var(--ink)",
        borderBottom: "3px solid var(--ink)",
        fontFamily: "var(--font-mono)",
        fontSize: "14px",
        fontWeight: 900,
        letterSpacing: "1px",
        display: "flex",
        whiteSpace: "nowrap",
        position: "relative",
        zIndex: 10,
      }}
    >
      <motion.div
        style={{ display: "flex" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        <span style={{ paddingRight: "12px" }}>{TICKER_TEXT.repeat(4)}</span>
        <span style={{ paddingRight: "12px" }}>{TICKER_TEXT.repeat(4)}</span>
      </motion.div>
    </div>
  );
}

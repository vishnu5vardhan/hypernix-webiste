"use client";

import React, { useState, useEffect } from "react";

export default function BootSequence() {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      setIsFinished(true);
      return;
    }

    sessionStorage.setItem("hasBooted", "true");
    
    // The total CSS animation takes 1.1s (1.0s + 0.1s fade out). Unmount after it completes.
    setTimeout(() => {
      setIsFinished(true);
    }, 1100);
  }, []);

  if (isFinished) return null;

  return (
    <div id="crt-overlay" className="booting">
      {/* The CSS handles the white line and flash via ::before and ::after on .booting */}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";

export default function BootSequence() {
  const [isBooting, setIsBooting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // If the user has already booted in this session, skip the sequence
  useEffect(() => {
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      setIsFinished(true);
    }
  }, []);



  const playBootAudio = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      
      // 1. The THUNK (low frequency square wave with quick decay)
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);

      // 2. The CRT Static Burst (white noise buffer)
      const bufferSize = ctx.sampleRate * 0.5; // 0.5 seconds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 1000;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.3, ctx.currentTime + 0.1);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(ctx.currentTime + 0.1);

      // 3. CRT Whine (high frequency sine wave)
      const whine = ctx.createOscillator();
      const whineGain = ctx.createGain();
      whine.type = 'sine';
      whine.frequency.setValueAtTime(15000, ctx.currentTime + 0.1);
      whineGain.gain.setValueAtTime(0, ctx.currentTime);
      whineGain.gain.setTargetAtTime(0.05, ctx.currentTime + 0.1, 0.05);
      whineGain.gain.setTargetAtTime(0, ctx.currentTime + 2.0, 0.2);
      whine.connect(whineGain);
      whineGain.connect(ctx.destination);
      whine.start(ctx.currentTime + 0.1);
      whine.stop(ctx.currentTime + 2.6);
    } catch (err) {
      // Ignore audio errors
    }
  };

  const handleActivate = () => {
    playBootAudio();
    setIsBooting(true);
    sessionStorage.setItem("hasBooted", "true");
    
    // The total CSS animation takes 2.6s (2.4s + 0.2s fade out). Unmount after it completes.
    setTimeout(() => {
      setIsFinished(true);
    }, 2700);
  };

  // Allow pressing Enter to activate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isBooting && !isFinished) {
        handleActivate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBooting, isFinished]);

  if (isFinished) return null;

  return (
    <div id="crt-overlay" className={isBooting ? "booting" : "waiting"}>
      {/* 
        When waiting, we show the static and the button.
        When booting, the CSS handles the white line and flash via ::before and ::after 
      */}
      {!isBooting && (
        <div className="manual-override-container">
          <div className="tv-static-bg"></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', zIndex: 10 }}>
            <button className="primary-btn override-btn" onClick={handleActivate}>
              ACTIVATE MAINFRAME
            </button>
            <span style={{ color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: '12px', opacity: 0.6, letterSpacing: '1px' }}>
              [ OR PRESS ENTER ]
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

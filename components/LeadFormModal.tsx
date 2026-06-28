"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// You will replace this with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz7VaeMt1YVZj24wUq3I-Vs1ddVpdJt65ZKCEyo-bQ-4FbHU8Y8MRQoHbMf514GGmDF/exec";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset state on close
      setTimeout(() => setStatus("idle"), 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    // Google Apps Script expects URL-encoded data, not multipart/form-data
    const data = new URLSearchParams();
    data.append("name", name);
    data.append("company", company);
    data.append("phone", phone);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: data,
        mode: "no-cors", // Prevents CORS errors on client-side Google Script calls
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      
      // no-cors returns an opaque response, so we just assume success if no network error
      setStatus("success");
      setName("");
      setCompany("");
      setPhone("");
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-container"
            initial={{ opacity: 0, x: "-50%", y: "-45%", scale: 0.95 }}
            animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
            exit={{ opacity: 0, x: "-50%", y: "-45%", scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              ×
            </button>
            
            {status === "success" ? (
              <div className="modal-success">
                <div className="success-icon">✓</div>
                <h3>System Activated</h3>
                <p>Your details have been logged. We will contact you shortly.</p>
                <button className="primary-btn" onClick={onClose} style={{ marginTop: "24px" }}>
                  Close
                </button>
              </div>
            ) : (
              <div className="modal-content">
                <h2 className="modal-title">Find the leaks</h2>
                <p className="modal-copy">
                  Enter your details to schedule an operational audit. We will find where your system is bleeding.
                </p>
                
                <form onSubmit={handleSubmit} className="lead-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {status === "error" && (
                    <p className="form-error">Something went wrong. Please try again or use WhatsApp.</p>
                  )}

                  <button 
                    type="submit" 
                    className={`primary-btn ${status === "submitting" ? "loading" : ""}`}
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Initiating..." : "Submit"}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

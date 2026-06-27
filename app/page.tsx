"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FadeUp,
  StaggerList,
  staggerItem,
  WordReveal,
  ease,
  ScrambleText,
  ScannerReveal
} from "@/components/MotionPrimitives";
import SystemTicker from "@/components/SystemTicker";

const WA_LINK =
  "https://wa.me/919398840252?text=Hello%20Hypernix,%20I'd%20like%20to%20audit%20our%20operations%20and%20find%20workflow%20leaks.";

const leaks = [
  { num: "01", title: "Missed follow-ups", body: "Leads cool down. Clients go quiet. Revenue slips." },
  { num: "02", title: "Late reports", body: "Decisions wait. Teams slow down. Momentum dies." },
  { num: "03", title: "Pending payments", body: "Cash gets stuck. Work slows. Stress goes up." },
  { num: "04", title: "Wrong updates", body: "Old information spreads. Rework climbs." },
  { num: "05", title: "Tasks in memory", body: "Work gets missed. Owner becomes system." },
];

const systems = [
  { label: "Track the work", body: "Every task has a place and an owner." },
  { label: "See what is delayed", body: "Blocked work becomes visible early." },
  { label: "Follow the money", body: "Dues and reminders stop depending on memory." },
  { label: "Know what needs attention", body: "The owner sees what needs attention." },
];

const cases = [
  {
    num: "01",
    tag: "Company work",
    title: "Distribution Efficiency System",
    body: "Internal visibility and coordination system for a Cadbury distributor.",
    href: "/distribution-efficiency-system",
  },
  {
    num: "02",
    tag: "In progress",
    title: "Cloud Kitchen Internal Software",
    body: "Complete internal software for cloud kitchen operations, workflows, and reporting.",
    href: "/cloud-kitchen-software",
  },
  {
    num: "03",
    tag: "Company work",
    title: "Car Rental Software",
    body: "Software for rental workflows, customer handling, and business operations.",
    href: "/car-rental-software",
  },
  {
    num: "04",
    tag: "Prototype",
    title: "ReFlo",
    body: "Turned spreadsheet-heavy operations into reviewable operational workflows.",
    href: "/reflo",
  },
  {
    num: "05",
    tag: "Team experience",
    title: "Restaurant Workflow Automation",
    body: "Restaurant operations experience through workflow automation work connected to Red Chillies.",
    href: "/restaurant-workflow-automation",
  },
  {
    num: "06",
    tag: "Team experience",
    title: "AI Hiring Product Experience",
    body: "AI hiring product experience through Aniketh, candidate, and hiring workflows.",
    href: "/ai-hiring-experience",
  },
];

const tickerItems = [
  "Missed follow-ups",
  "Late reports",
  "Pending payments",
  "Wrong updates",
  "Tasks in memory",
];

/* ── Hero with parallax ── */
function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const shouldReduceMotion = useReducedMotion();
  
  const initialTransform = shouldReduceMotion ? "translateY(0px)" : "translateY(12px)";

  return (
    <section className="hero section" ref={heroRef}>
      <motion.div
        className="hero-grid"
        style={{ y: heroY, opacity: heroOpacity, alignItems: "flex-start", textAlign: "left" }}
      >
        <motion.div
          initial={{ opacity: 0, transform: initialTransform }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.28, ease }}
          style={{ width: "100%" }}
        >
          <h1 className="hero-title hero-title--home">
            Stop running the business from the owner’s head.
          </h1>
          <motion.p
            className="hero-copy"
            initial={{ opacity: 0, transform: initialTransform }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.28, delay: 0.12, ease }}
            style={{ margin: "24px 0 0" }}
          >
            Internal systems for growing companies outgrowing <span className="redact-word">memory</span>, <span className="redact-word">calls</span>, <span className="redact-word">WhatsApp</span>, <span className="redact-word">Excel</span>, and manual follow-ups.
          </motion.p>
          
          <div className="hero-cta-wrapper">
              <Link className="primary-btn" href="#work">
                See how we work <span aria-hidden="true">→</span>
              </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Final CTA ── */
function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();
  
  const initialTransformH2 = shouldReduceMotion ? "translateY(0px) scale(1)" : "translateY(12px) scale(0.96)";
  const initialTransformP = shouldReduceMotion ? "translateY(0px)" : "translateY(12px)";

  return (
    <section id="contact" className="final-cta" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, transform: initialTransformH2 }}
        animate={inView ? { opacity: 1, transform: "translateY(0px) scale(1)" } : { opacity: 0, transform: initialTransformH2 }}
        transition={{ duration: 0.28, ease }}
      >
        Find the leaks.<br />Fix the system.<br />Grow on purpose.
      </motion.h2>

      <div className="cta-copy" style={{ marginTop: "24px", marginBottom: "48px" }}>
        <ScannerReveal delay={0.1}>
          <p>
            Show us how your business runs today. We'll map what is slowing you
            down and what system should be built.
          </p>
        </ScannerReveal>
      </div>
      
      <div className="cta-actions">
            <a
              className="primary-btn"
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
            >
              Talk on WhatsApp <span aria-hidden="true">↗</span>
            </a>
        </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">

        {/* Hero */}
        <Hero />

        {/* Leaks */}
        <section className="section leak-section">
          <div className="section-lead">
            <FadeUp as="h2">
              <WordReveal text="Small leaks become daily losses." />
            </FadeUp>
          </div>

          <StaggerList className="leak-list" stagger={0.09} amount={0.05}>
            {leaks.map((leak) => (
              <motion.article
                className="leak-row"
                key={leak.num}
                variants={staggerItem}
              >
                <span>{leak.num}</span>
                <h3>{leak.title}</h3>
                <p>{leak.body}</p>
              </motion.article>
            ))}
          </StaggerList>
        </section>

        {/* Control room */}
        <section className="section control-room">
          <FadeUp as="h2" className="section-title">
            <WordReveal text="The owner should not be the control room." />
          </FadeUp>

          <FadeUp delay={0.18}>
            <div className="flow-line" aria-label="Old workflow">
              <span>Request comes in</span>
              <b>→</b>
              <span>Owner remembers</span>
              <b>→</b>
              <span>Owner delegates</span>
              <b>→</b>
              <span>Someone follows up</span>
              <b>→</b>
              <span>Maybe it gets done</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="center-note">Too many handoffs. Too many misses.</p>
          </FadeUp>
        </section>

        {/* System actions */}
        <section className="section system-actions">
          <FadeUp as="h2" className="section-title">
            <WordReveal text="Put the business into one system." />
          </FadeUp>

          <StaggerList className="system-strip-list" stagger={0.1} delay={80} amount={0.05}>
            {systems.map((s) => (
              <motion.article
                className="system-strip"
                key={s.label}
                variants={staggerItem}
              >
                <span>{s.label}</span>
                <p>{s.body}</p>
              </motion.article>
            ))}
          </StaggerList>
        </section>

        {/* Case files */}
        <section id="work" className="section case-files">
          <div className="case-heading">
            <FadeUp as="h2">Case Studies</FadeUp>
            <FadeUp delay={0.12}>
              <p>Real businesses. Real systems. Real operating problems.</p>
            </FadeUp>
          </div>

          <StaggerList className="case-list-grid" stagger={0.05} amount={0.04}>
            {cases.map((c) => (
              <motion.div
                key={c.num}
                variants={staggerItem}
                style={{ height: "100%" }}
              >
                <Link
                  className="case-card-yellow"
                  href={c.href}
                  aria-label={`${c.title} case file`}
                >
                  <div className="card-item-content">
                    <div className="card-header">
                      <span className="case-number">{c.num}</span>
                      <small>{c.tag}</small>
                    </div>
                    <h3><ScrambleText text={c.title} delay={0.15 + parseInt(c.num) * 0.05} /></h3>
                    <p style={{ opacity: 0.8, marginTop: '8px', fontSize: 'clamp(14px, 1.1vw, 16px)' }}>{c.body}</p>
                    <b style={{ marginTop: 'auto', display: 'inline-block', paddingTop: '24px' }}>Read case study ↗</b>
                  </div>
                </Link>
              </motion.div>
            ))}
          </StaggerList>
        </section>

        {/* Process */}
        <section id="process" className="section process-section blueprint-bg">
          <FadeUp as="h2" className="section-title">
            Find the leak. Build the system. Improve it monthly.
          </FadeUp>

          <StaggerList className="process-grid" stagger={0.13} delay={80} amount={0.1}>
            {[
              {
                num: "01",
                title: "Diagnose",
                body: "We study how work happens today: chats, sheets, tools, people, reports, and repeated tasks.",
              },
              {
                num: "02",
                title: "Build",
                body: "We create the internal system around the workflow that matters most.",
              },
              {
                num: "03",
                title: "Improve",
                body: "We support, automate, fix, and expand the system as the business grows.",
              },
            ].map((card) => (
              <motion.article
                className="process-card"
                key={card.num}
                variants={staggerItem}
              >
                <span>{card.num}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </motion.article>
            ))}
          </StaggerList>
        </section>

        <SystemTicker />

        {/* Final CTA */}
        <FinalCTA />
      </main>

      <Footer homeHref="/" contactHref={WA_LINK} phone="+91 93988 40252" />
    </>
  );
}

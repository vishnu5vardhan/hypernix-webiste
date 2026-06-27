"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
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
} from "@/components/MotionPrimitives";

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
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroY = useSpring(rawY, { stiffness: 55, damping: 18 });
  const rawOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroOpacity = useSpring(rawOpacity, { stiffness: 80, damping: 24 });

  /* ticker opposite-direction parallax */
  const tickerRef = useRef(null);
  const { scrollYProgress: tickerProgress } = useScroll({
    target: tickerRef,
    offset: ["start end", "end start"],
  });
  const tickerX = useTransform(tickerProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section className="hero section" ref={heroRef}>
      <motion.div
        className="hero-grid"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <h1 className="hero-title">
          {["Stop running", "the business", "from the", "owner's head."].map(
            (line, i) => (
              <motion.span
                key={i}
                style={{ display: "block" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, delay: 0.08 + i * 0.11, ease }}
              >
                {line}
              </motion.span>
            )
          )}
        </h1>
        <motion.p
          className="hero-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.56, ease }}
        >
          Internal systems for growing companies<br />
          outgrowing memory, calls, and follow-ups.
        </motion.p>
      </motion.div>

      <motion.div
        ref={tickerRef}
        className="signal-rail"
        aria-label="Operational leak signals"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.72 }}
      >
        <div className="rail-arrow" aria-hidden="true">→</div>
        <div className="ticker">
          <motion.div className="ticker-track" style={{ x: tickerX }}>
            {tickerItems.map((item, i) => (
              <span key={`a${i}`}>{item}<i> /</i></span>
            ))}
            {tickerItems.map((item, i) => (
              <span key={`b${i}`}>{item}<i> /</i></span>
            ))}
          </motion.div>
        </div>
        <div className="rail-arrow" aria-hidden="true">→</div>
      </motion.div>
    </section>
  );
}

/* ── Final CTA ── */
function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section id="contact" className="final-cta" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, scale: 0.95, y: 28 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.78, ease }}
      >
        Find the leaks.<br />Fix the system.<br />Grow on purpose.
      </motion.h2>

      <motion.div
        className="cta-copy"
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.2, ease }}
      >
        <p>
          Show us how your business runs today. We'll map what is slowing you
          down and what system should be built.
        </p>
        <div className="cta-actions">
          <motion.a
            className="primary-btn"
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            Talk on WhatsApp <span aria-hidden="true">↗</span>
          </motion.a>
        </div>
      </motion.div>
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
                whileHover={{ scale: 1.012, transition: { duration: 0.2 } }}
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
            <FadeUp as="h2">Case Files</FadeUp>
            <FadeUp delay={0.12}>
              <p>Real businesses. Real systems. Real operating problems.</p>
            </FadeUp>
          </div>

          <StaggerList className="case-list-grid" stagger={0.08} amount={0.04}>
            {cases.map((c) => (
              <motion.div
                key={c.num}
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: "8px 8px 0px #15110d" }}
                transition={{ duration: 0.26, ease }}
                style={{ borderRadius: 12 }}
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
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                    <b>Read case ↗</b>
                  </div>
                </Link>
              </motion.div>
            ))}
          </StaggerList>
        </section>

        {/* Process */}
        <section id="process" className="section process-section">
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
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <span>{card.num}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </motion.article>
            ))}
          </StaggerList>
        </section>

        {/* Final CTA */}
        <FinalCTA />
      </main>

      <Footer homeHref="/" contactHref={WA_LINK} phone="+91 93988 40252" />
    </>
  );
}

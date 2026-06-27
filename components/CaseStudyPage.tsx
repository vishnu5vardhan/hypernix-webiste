import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeUp, ClipReveal, ScannerReveal } from "@/components/MotionPrimitives";
import SystemTicker from "@/components/SystemTicker";
import Link from "next/link";

export interface CaseStudyProps {
  title: React.ReactNode;
  summary: string;
  labels: string[];
  vulnerability: {
    title: string;
    paragraphs: string[];
  };
  strategy: {
    title: string;
    paragraphs: string[];
  };
  quote: string;
  ctaTitle: string;
  ctaActions: React.ReactNode;
  footerContact: {
    href: string;
    label?: string;
    phone?: string;
  };
}

export default function CaseStudyPage({
  title,
  summary,
  labels,
  vulnerability,
  strategy,
  quote,
  ctaTitle,
  ctaActions,
  footerContact,
}: CaseStudyProps) {
  return (
    <>
      <Header homeHref="/" />
      <main id="top" className="blueprint-bg" style={{ minHeight: "100vh" }}>
        {/* Hero */}
        <section className="section case-study-hero">
          <FadeUp className="back-link-wrapper">
            <Link href="/#work" className="back-link">
              <span aria-hidden="true">←</span> Back to systems
            </Link>
          </FadeUp>
          <FadeUp as="h1" className="case-study-title hero-title">{title}</FadeUp>
          <FadeUp as="p" className="case-summary" delay={0.12}>{summary}</FadeUp>
          <FadeUp className="case-labels" delay={0.24}>
            {labels.map((l) => (
              <span key={l} className="case-label">{l}</span>
            ))}
          </FadeUp>
        </section>

        {/* Content panels */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="case-content-grid">
            <ClipReveal className="case-card-panel">
              <span className="panel-tag">01 / The Vulnerability</span>
              <h2 className="panel-title">{vulnerability.title}</h2>
              {vulnerability.paragraphs.map((p, i) => (
                <div key={i} style={i < vulnerability.paragraphs.length - 1 ? { marginBottom: 16 } : undefined}>
                  <ScannerReveal delay={0.1 + i * 0.1}>
                    <p className="panel-body">
                      {p}
                    </p>
                  </ScannerReveal>
                </div>
              ))}
            </ClipReveal>
            <ClipReveal className="case-card-panel" delay={0.15}>
              <span className="panel-tag">02 / The Strategy</span>
              <h2 className="panel-title">{strategy.title}</h2>
              {strategy.paragraphs.map((p, i) => (
                <div key={i} style={i < strategy.paragraphs.length - 1 ? { marginBottom: 16 } : undefined}>
                  <ScannerReveal delay={0.1 + i * 0.1}>
                    <p className="panel-body">
                      {p}
                    </p>
                  </ScannerReveal>
                </div>
              ))}
            </ClipReveal>
          </div>
        </section>

        {/* Callout */}
        <ClipReveal className="case-callout-section">
          <div className="case-callout-inner">
            <span className="callout-title">The Leverage</span>
            <blockquote className="callout-quote">{quote}</blockquote>
          </div>
        </ClipReveal>

        {/* CTA */}
        <ClipReveal className="case-cta-section">
          <div className="case-cta-inner">
            <h2 className="case-cta-title">{ctaTitle}</h2>
            <div className="cta-actions" style={{ justifyContent: "center" }}>
              {ctaActions}
            </div>
          </div>
        </ClipReveal>
        
        <SystemTicker />
      </main>

      <Footer
        homeHref="/"
        contactHref={footerContact.href}
        phone={footerContact.phone}
      />
    </>
  );
}

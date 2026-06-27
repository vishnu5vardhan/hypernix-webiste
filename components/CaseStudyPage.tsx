import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
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
      <RevealObserver />
      <Header homeHref="/" />
      <main id="top">
        {/* Hero */}
        <section className="section case-study-hero">
          <div className="back-link-wrapper reveal">
            <Link href="/#work" className="back-link">
              <span aria-hidden="true">←</span> Back to systems
            </Link>
          </div>
          <h1 className="case-study-title hero-title reveal">{title}</h1>
          <p className="case-summary reveal delay-1">{summary}</p>
          <div className="case-labels reveal delay-2">
            {labels.map((l) => (
              <span key={l} className="case-label">{l}</span>
            ))}
          </div>
        </section>

        {/* Content panels */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="case-content-grid">
            <div className="case-card-panel reveal">
              <span className="panel-tag">01 / The Vulnerability</span>
              <h2 className="panel-title">{vulnerability.title}</h2>
              {vulnerability.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="panel-body"
                  style={i < vulnerability.paragraphs.length - 1 ? { marginBottom: 16 } : undefined}
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="case-card-panel reveal delay-1">
              <span className="panel-tag">02 / The Strategy</span>
              <h2 className="panel-title">{strategy.title}</h2>
              {strategy.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="panel-body"
                  style={i < strategy.paragraphs.length - 1 ? { marginBottom: 16 } : undefined}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Callout */}
        <section className="case-callout-section reveal">
          <div className="case-callout-inner">
            <span className="callout-title">The Leverage</span>
            <blockquote className="callout-quote">{quote}</blockquote>
          </div>
        </section>

        {/* CTA */}
        <section className="case-cta-section reveal">
          <div className="case-cta-inner">
            <h2 className="case-cta-title">{ctaTitle}</h2>
            <div className="cta-actions" style={{ justifyContent: "center" }}>
              {ctaActions}
            </div>
          </div>
        </section>
      </main>

      <Footer
        homeHref="/"
        contactHref={footerContact.href}
        phone={footerContact.phone}
      />
    </>
  );
}

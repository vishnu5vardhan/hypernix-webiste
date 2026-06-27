import type { Metadata } from "next";
import CaseStudyPage from "@/components/CaseStudyPage";

export const metadata: Metadata = {
  title: "AI Hiring Product Experience | Hypernix Case File",
  description:
    "AI hiring product experience through Aniketh, focused on structured candidate and hiring workflows.",
};

const MAIL_LINK =
  "mailto:hello@hypernix.in?subject=AI%20Hiring%20Workflow%20Audit";

export default function AIHiringExperience() {
  return (
    <CaseStudyPage
      title={
        <>
          <span>AI Hiring</span>
          <span>Product Experience</span>
        </>
      }
      summary="Recruiting is a battle for talent, yet most organizations run their recruitment lines in a state of scattered intelligence. This product experience structures candidate data, feedback loops, and interview workflows."
      labels={[
        "AI hiring",
        "Product experience",
        "Candidate workflows",
        "Team experience",
        "Aniketh",
      ]}
      vulnerability={{
        title: "The Anarchy of Scattered Context",
        paragraphs: [
          "Hiring processes suffer from scattered information. Resumes are buried in inboxes, interviewer feedback sits in private chats, candidate status is tracked in spreadsheets, and follow-ups are dependent on recruiters remembering schedules. In this state of information fragmentation, candidate context is lost, and decisions are delayed.",
          "When candidate evaluation lacks structure, the hiring team falls back on subjective bias and mood. Candidates cool down during delayed feedback loops, promising talent is snatched by competitors, and the recruitment pipeline becomes a source of administrative waste.",
        ],
      }}
      strategy={{
        title: "Systematizing Candidate Decision Flow",
        paragraphs: [
          "We designed a product experience built around structured, AI-assisted hiring workflows. The system acts as a central repository, gathering candidate inputs, parsing resume signals, and organizing team feedback into a single, reviewable timeline.",
          "Evaluators are guided by standardized scorecard sequences. The interface summarizes candidate profiles, compares them against roles using parsed vectors, and alerts the coordinator when a candidate lingers too long in a stage. This structural discipline ensures hiring movement is fast, consistent, and audit-friendly.",
        ],
      }}
      quote='"Decision flow is the key to velocity. By eliminating manual context assembly and establishing a visual timeline of candidate status, the organization turned hiring from a chaotic chore into a strategic, high-speed pipeline."'
      ctaTitle="Hiring process stuck in notes and follow-ups? Let us build a reviewable pipeline."
      ctaActions={
        <>
          <a className="primary-btn" href={MAIL_LINK}>
            Find the leaks <span aria-hidden="true">↗</span>
          </a>
          <a
            className="text-link"
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--ink)" }}
          >
            Talk on WhatsApp
          </a>
        </>
      }
      footerContact={{ href: "mailto:hello@hypernix.in" }}
    />
  );
}

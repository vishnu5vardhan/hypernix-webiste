import type { Metadata } from "next";
import CaseStudyPage from "@/components/CaseStudyPage";

export const metadata: Metadata = {
  title: "ReFlo | Hypernix Case File",
  description:
    "Hackathon-winning prototype that turns spreadsheet-heavy operations into reviewable workflows.",
};

const MAIL_LINK = "mailto:hello@hypernix.in?subject=ReFlo%20Spreadsheet%20Workflow%20Audit";

export default function Reflo() {
  return (
    <CaseStudyPage
      title={
        <>
          <span>ReFlo Workflow</span>
          <span>Prototype</span>
        </>
      }
      summary="The spreadsheet is a deceptive comfort. This prototype redefines the boundary between spreadsheets and workflows, introducing custody and review keys to chaotic operations."
      labels={[
        "Prototype",
        "Spreadsheet operations",
        "Workflow review",
        "Codex community hackathon",
        "Third place",
        "$1,000 credits awarded",
      ]}
      vulnerability={{
        title: "The Anarchy of the Flat Spreadsheet",
        paragraphs: [
          "Spreadsheets offer the illusion of freedom, but they are a breeding ground for operational anarchy. In a sheet, anyone can alter data without ownership, leaving no trace of who made the decision, when, or why. Operations that rely on raw sheets lack structured checkpoints, exposing the organization to invisible errors.",
          "Without a trace of authority, spreadsheets invite careless changes and silent data contamination. Important operational figures are updated on a whim, calculations are accidentally broken, and approvals are assumed rather than verified. The organization is run on faith rather than structured proof, creating massive vulnerability.",
        ],
      }}
      strategy={{
        title: "Establishing a Chain of Custody",
        paragraphs: [
          "We designed ReFlo: a prototype that converts flat spreadsheet inputs into a reviewable pipeline. By enforcing a pull-request model on data changes, we brought peer review, approval status, and structural custody to operational data.",
          "The prototype wraps the flexibility of a grid in a system of checks and balances. Users suggest data modifications as \"proposals\" rather than direct edits. These proposals must pass automated verification checks and peer validation before they are merged into the operational ledger, establishing a strict chain of custody.",
        ],
      }}
      quote='"Control is maintained not by restricting tools, but by structuring interactions. ReFlo demonstrated that you can preserve the speed of a spreadsheet while enforcing the strict accountability of a versioned database."'
      ctaTitle="Has a single, reviewable spreadsheet quietly become the fragile spine of your business? Let us build custody around your data."
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

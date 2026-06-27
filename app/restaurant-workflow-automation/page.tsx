import type { Metadata } from "next";
import CaseStudyPage from "@/components/CaseStudyPage";

export const metadata: Metadata = {
  title: "Restaurant Workflow Automation | Hypernix Case File",
  description:
    "Restaurant operations experience through workflow automation work connected to Red Chillies via Girish.",
};

const MAIL_LINK =
  "mailto:hello@hypernix.in?subject=Restaurant%20Workflow%20Automation%20Audit";

export default function RestaurantWorkflowAutomation() {
  return (
    <CaseStudyPage
      title={
        <>
          <span>Restaurant Workflow</span>
          <span>Automation</span>
        </>
      }
      summary="A high-pressure kitchen is an arena of pure execution. This project channels operational urgency into structured, silent workflows, shielding staff from cognitive overload."
      labels={[
        "Restaurant operations",
        "Workflow automation",
        "Team experience",
        "Red Chillies via Girish",
      ]}
      vulnerability={{
        title: "The Anarchy of the Shouting Floor",
        paragraphs: [
          "The standard restaurant floor is structured around noise. Calling orders, shouting updates, relying on verbal prompts, and manually chasing staff status creates friction. This chaotic atmosphere introduces constant mental fatigue, inviting errors at the very moment speed is critical.",
          "Under pressure, verbal communication breaks down. Staff miss preparation cues, dish priorities get scrambled, and delivery drivers wait too long due to a lack of visual status signals. Relying on staff memory to manage priority sequences in a high-turnover environment leads to inconsistent service and wasted energy.",
        ],
      }}
      strategy={{
        title: "Silent Operations Architecture",
        paragraphs: [
          "We developed a workflow automation system designed to minimize verbal noise. By structuring order tickets, prep sequences, and handover checkpoints into silent, visual queues, we transformed frantic coordination into a calm, mechanical flow.",
          "The system acts as a digital dispatcher. Kitchen stations receive automated, prioritized task cards on display terminals. The preparation progress is tracked via simple tap gestures, giving the front-of-house team immediate, silent visibility into order readiness and reducing waiter-to-kitchen friction.",
        ],
      }}
      quote='"Efficiency is achieved not by hurrying, but by eliminating unnecessary moves. Restaurant workers need software that supports immediate action, not interfaces that demand cognitive attention."'
      ctaTitle="If your restaurant's daily survival depends on constant shouting and manual chasing, let us automate the flow."
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

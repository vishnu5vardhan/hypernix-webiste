import type { Metadata } from "next";
import CaseStudyPage from "@/components/CaseStudyPage";

export const metadata: Metadata = {
  title: "Cloud Kitchen Internal Software | Hypernix Case File",
  description:
    "Complete internal software for managing cloud kitchen operations, workflows, statuses, and reporting.",
};

const WA_LINK =
  "https://wa.me/919398840252?text=Hello%20Hypernix,%20I'd%20like%20to%20audit%20our%20cloud%20kitchen%20operations%20and%20find%20workflow%20leaks.";

export default function CloudKitchenSoftware() {
  return (
    <CaseStudyPage
      title={
        <>
          <span>Cloud Kitchen</span>
          <span>Internal Software</span>
        </>
      }
      summary="In rapid culinary operations, speed without structure is a recipe for chaos. This system serves as a digital nervous system, capturing live updates and stripping away the noise of rapid culinary operations."
      labels={[
        "Cloud kitchen",
        "Ongoing build",
        "Operations software",
        "Workflow tracking",
        "Reporting",
      ]}
      vulnerability={{
        title: "The Chaos of High-Velocity Operations",
        paragraphs: [
          "Cloud kitchen operations exist in a state of high velocity and perpetual vulnerability. Orders flow in from multiple aggregators, kitchen staff work in high-heat environments, and dispatch riders wait outside. When this rapid cycle relies on chaotic WhatsApp threads and verbal coordination, accountability is the first casualty.",
          "A kitchen operating in this manner is at the mercy of micro-delays. A missed chat message, a verbal order modification that wasn't heard, or a driver coordinator who forgot to flag an issue: all of these create friction. The owner remains trapped in a reactive loop, resolving disputes and chasing status updates instead of optimizing margins.",
        ],
      }}
      strategy={{
        title: "Imposing Structural Discipline",
        paragraphs: [
          "We engineered an operational software layer to enforce structural order. By integrating order inputs, preparation phases, and rider handovers into a single interface, we created a clear, mechanical flow of information that no member of the team could bypass.",
          "The software makes operational bottlenecks immediately obvious. Prep delay warnings, courier wait times, and dispatch statuses are displayed on a central dashboard. Instead of relying on manual check-ins, management can view the entire kitchen's heartbeat in real-time, eliminating the need to police the kitchen floor.",
        ],
      }}
      quote='"True operational control is invisible. By replacing the noisy chatter of WhatsApp coordination with structured digital check-ins, the kitchen gained a silent, reliable rhythm. The system coordinates the energy of the staff, transforming chaotic speed into disciplined throughput."'
      ctaTitle="Is your kitchen running on the chaotic noise of chats and memory? Let us install a system of absolute order."
      ctaActions={
        <a className="primary-btn" href={WA_LINK} target="_blank" rel="noreferrer">
          Talk on WhatsApp <span aria-hidden="true">↗</span>
        </a>
      }
      footerContact={{ href: WA_LINK, phone: "+91 93988 40252" }}
    />
  );
}

import type { Metadata } from "next";
import CaseStudyPage from "@/components/CaseStudyPage";

export const metadata: Metadata = {
  title: "Distribution Efficiency System | Hypernix Case File",
  description:
    "Internal visibility and coordination system for a Cadbury distributor operating at roughly ₹5Cr/month sales capacity.",
};

const WA_LINK =
  "https://wa.me/919398840252?text=Hello%20Hypernix,%20I'd%20like%20to%20audit%20our%20distribution%20operations%20and%20find%20workflow%20leaks.";

export default function DistributionEfficiencySystem() {
  return (
    <CaseStudyPage
      title={
        <>
          <span>Distribution</span>
          <span>Efficiency System</span>
        </>
      }
      summary="At a monthly volume of ₹5Cr, operational chaos is not merely a friction; it is a slow, silent bleeding of power. This system was built to dismantle the vulnerability of verbal dependencies and restore absolute command."
      labels={[
        "Distribution",
        "Cadbury Distributor",
        "~₹5Cr/month sales capacity",
        "Internal system",
        "Daily visibility",
      ]}
      vulnerability={{
        title: "The Anarchy of Verbal Flow",
        paragraphs: [
          "High-volume distribution businesses operate under a dangerous illusion of control. When transactions are measured in millions, the owner believes the cash flow represents stability. In reality, the entire operation was structurally dependent on the volatile mechanics of human memory, frantic telephone calls, and scattered notes.",
          "Because tasks were delegated verbally, accountability was completely dissolved. Drivers, warehouse handlers, and coordinators operated in their own isolated loops, providing updates only when cornered. This lack of transparency created an environment where delivery delays could be easily excused, and operational leaks went unnoticed until they showed up as margin deficits.",
        ],
      }}
      strategy={{
        title: "Imposing Systemic Order",
        paragraphs: [
          "To regain authority, we designed a centralized operating platform that removed human caprice from the workflow. Every order, inventory update, and delivery coordinate was stripped of its verbal packaging and turned into a structured, visible data point in a central system.",
          "The interface was built to make delays instantly visible. Rather than chasing staff for status reports, the platform displayed live delivery states and pending updates. By establishing clear visual ownership for every route and order, the distributor replaced the noise of coordination with a silent, objective record of execution.",
        ],
      }}
      quote='"Power belongs to those who control the flow of information. By automating daily visibility, the distributor ceased to be a hostage to manual updates. The system shifted the power dynamic: staff were no longer asked to report; they were guided by a system that left no room for evasion."'
      ctaTitle="Are you running your distribution empire on the fragile promises of verbal coordination? Let us build your system of command."
      ctaActions={
        <a className="primary-btn" href={WA_LINK} target="_blank" rel="noreferrer">
          Talk on WhatsApp <span aria-hidden="true">↗</span>
        </a>
      }
      footerContact={{ href: WA_LINK, phone: "+91 93988 40252" }}
    />
  );
}

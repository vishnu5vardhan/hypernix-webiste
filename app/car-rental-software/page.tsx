import type { Metadata } from "next";
import CaseStudyPage from "@/components/CaseStudyPage";

export const metadata: Metadata = {
  title: "Car Rental Software | Hypernix Case File",
  description:
    "Internal software for car rental workflows, customer handling, vehicle coordination, and document tracking.",
};

const WA_LINK =
  "https://wa.me/919398840252?text=Hello%20Hypernix,%20I'd%20like%20to%20audit%20our%20car%20rental%20operations%20and%20find%20workflow%20leaks.";

export default function CarRentalSoftware() {
  return (
    <CaseStudyPage
      title={
        <>
          <span>Car Rental</span>
          <span>Software</span>
        </>
      }
      summary="A multi-variable campaign requires a centralized command. This system organizes customer dossiers, documents, payments, and fleet movements to prevent operational decay."
      labels={[
        "Car rental",
        "Customer operations",
        "Vehicle coordination",
        "Document tracking",
        "Internal software",
      ]}
      vulnerability={{
        title: "The Minefield of Multi-Variable Logistics",
        paragraphs: [
          "Rental operations are a minefield of moving variables. Customer identities, safety deposits, vehicle wear, document verification, handovers, and returns: each represents a point of vulnerability. When these variables lie scattered across sheets and chats, details vanish, leaving the business open to manipulation and loss.",
          "Relying on staff memory to verify insurance papers, track safety deposits, or manage return times invites failure. Drivers fail to flag vehicle scratches, handovers occur without proper signatures, and overdue cars go unnoticed. Without a structured flow, the owner is forced to act as a fireman, reacting to crises instead of scaling the fleet.",
        ],
      }}
      strategy={{
        title: "Enforcing Gatekeeper Controls",
        paragraphs: [
          "We designed a unified operational system that acts as a gatekeeper. No vehicle can be assigned, and no customer folder can be processed, without satisfying a strict sequence of digital check-ins.",
          "The system coordinates customer validation, deposit tracking, vehicle availability, and handover inspection reports. Photos of the vehicle status at handover and return are logged directly into the system, creating an indisputable record that eliminates customer disputes and staff negligence.",
        ],
      }}
      quote='"True leverage is achieved when you eliminate variables. The business gained a systematic method to execute rentals, ensuring the owner never has to trust the memory of staff or client."'
      ctaTitle="Are your fleet assets and client data scattered across chats and sheets? Build the operating system behind the desk."
      ctaActions={
        <a className="primary-btn" href={WA_LINK} target="_blank" rel="noreferrer">
          Talk on WhatsApp <span aria-hidden="true">↗</span>
        </a>
      }
      footerContact={{ href: WA_LINK, phone: "+91 93988 40252" }}
    />
  );
}

import Link from "next/link";
import { Magnetic } from "@/components/MotionPrimitives";

interface HeaderProps {
  homeHref?: string;
}

export default function Header({ homeHref = "/" }: HeaderProps) {
  return (
    <header className="site-header">
      <Link className="brand" href={homeHref} aria-label="Hypernix home">
        HYPERNIX
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link href={`${homeHref === "/" ? "" : homeHref}#work`}>Work</Link>
        <Link href={`${homeHref === "/" ? "" : homeHref}#process`}>Process</Link>
      </nav>
      <div className="header-cta-wrapper">
        <a className="header-cta" href="tel:+919398840252">
          Call Us <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}

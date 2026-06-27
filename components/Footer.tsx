import Link from "next/link";

interface FooterProps {
  homeHref?: string;
  contactHref?: string;
  phone?: string;
}

export default function Footer({
  homeHref = "/",
  contactHref,
  phone,
}: FooterProps) {
  const workHref = homeHref === "/" ? "/#work" : `${homeHref}#work`;
  const processHref = homeHref === "/" ? "/#process" : `${homeHref}#process`;

  return (
    <footer className="site-footer">
      <Link href={homeHref} className="footer-brand">
        HYPERNIX
      </Link>
      <div className="footer-bottom">
        <p>© Hypernix</p>
        <nav aria-label="Footer navigation">
          <Link href={workHref}>Work</Link>
          <Link href={processHref}>Process</Link>
        </nav>
        {phone ? (
          <a href={contactHref} target="_blank" rel="noreferrer">
            {phone}
          </a>
        ) : (
          <a href={contactHref}>{contactHref?.replace("mailto:", "")}</a>
        )}
      </div>
    </footer>
  );
}

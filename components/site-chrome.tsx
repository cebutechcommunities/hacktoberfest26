/* eslint-disable @next/next/no-img-element -- Original archive photos are local assets framed with CSS. */
import Link from "next/link";
export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

export function Header({ archive = false }: { archive?: boolean }) {
  const base = archive ? "/" : "";
  return (
    <header className="site-header wrap">
      <Link
        className="wordmark"
        href="/"
        aria-label="Hacktoberfest Cebu 2026 home"
      >
        <span className="brand-mark" aria-hidden="true">
          ↗
        </span>
        <span>
          HACKTOBERFEST
          <span className="wordmark-bottom">
            CEBU <span className="wordmark-year">/ 2026</span>
          </span>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href={`${base}#story`}>The story</a>
        <a href={`${base}#october`}>This October</a>
        <a href={`${base}#community`}>The community</a>
      </nav>
      <a className="button header-cta" href={`${base}#october`}>
        Save the dates <Arrow />
      </a>
      <details className="mobile-nav">
        <summary aria-label="Open navigation">
          <span>Menu</span>
          <span aria-hidden="true">＋</span>
        </summary>
        <nav aria-label="Mobile navigation">
          <a href={`${base}#story`}>The story</a>
          <a href={`${base}#october`}>This October</a>
          <a href={`${base}#community`}>The community</a>
          <Link href="/2025">2025 archive</Link>
        </nav>
      </details>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer wrap">
      <div className="footer-top">
        <Link className="wordmark" href="/">
          HACKTOBERFEST
          <span className="wordmark-bottom">
            CEBU <span className="wordmark-year">/ 2026</span>
          </span>
        </Link>
        <p>Made here. Shared everywhere.</p>
        <nav aria-label="Footer navigation">
          <Link href="/#participate">Get involved</Link>
          <Link href="/2025">2025 archive</Link>
          <a href="https://www.getcebby.com/">
            Cebby <Arrow />
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>A celebration of open source in Cebu, Philippines.</span>
        <a href="https://hacktoberfest.com/">
          Part of a global tradition <Arrow />
        </a>
      </div>
    </footer>
  );
}

export function ArchivePhoto({
  file,
  alt,
  className = "",
  eager = false,
}: {
  file: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div className={`archive-photo ${className}`}>
      <img
        src={`/images/2025/${file}`}
        alt={alt}
        width={1920}
        height={1280}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
    </div>
  );
}

export function Eyebrow({
  number,
  children,
}: {
  number?: string;
  children: React.ReactNode;
}) {
  return (
    <p className="eyebrow">
      {number && <span className="section-number">{number} /</span>} {children}
    </p>
  );
}

import Link from "next/link";
import { Header, Footer } from "@/components/site-chrome";
export default function NotFound() {
  return (
    <>
      <Header archive />
      <main className="wrap not-found">
        <p className="eyebrow">404 / A SMALL DETOUR</p>
        <h1>
          This page
          <br />
          isn’t here<span className="orange">.</span>
        </h1>
        <p>There’s still plenty happening back at the gathering.</p>
        <Link className="button" href="/">
          Back to Hacktoberfest Cebu ↗
        </Link>
      </main>
      <Footer />
    </>
  );
}

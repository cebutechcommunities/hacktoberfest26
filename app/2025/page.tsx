import Link from "next/link";
import type { Metadata } from "next";
import {
  Header,
  Footer,
  ArchivePhoto,
  Eyebrow,
  Arrow,
} from "@/components/site-chrome";
import { projects, archiveUrl } from "@/lib/content";
import { SupporterCredits } from "@/components/supporter-credits";

export const metadata: Metadata = {
  title: "The 2025 archive",
  description:
    "Real people. Local projects. Explore highlights from Hacktoberfest Cebu 2025 and the work we’re carrying forward.",
};

export default function Archive() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header archive />
      <main id="main">
        <section className="archive-hero wrap">
          <Link href="/" className="text-link">
            ← Back to 2026
          </Link>
          <Eyebrow>THE CEBU ARCHIVE / 2025</Eyebrow>
          <h1>
            LOOK WHAT
            <br />
            WE <span className="orange">STARTED.</span>
          </h1>
          <div className="archive-hero-bottom">
            <p>
              A few of the people and projects that made 2025 ours.
              <br />
              Their work carries forward. So does the invitation.
            </p>
            <span className="archive-edition">
              20<span>25</span>
            </span>
          </div>
        </section>
        <div className="archive-ribbon">
          <div className="wrap">
            <span>HACKTOBERFEST CEBU 2025</span>
            <span>BUILT HERE. SHARED EVERYWHERE.</span>
          </div>
        </div>
        <section className="archive-projects wrap" id="projects">
          <div className="section-heading">
            <div>
              <Eyebrow>PROJECT HIGHLIGHTS</Eyebrow>
              <h2>Ideas that became something.</h2>
            </div>
            <a href={archiveUrl} className="text-link">
              See the original collection <Arrow />
            </a>
          </div>
          {projects.map((project, index) => (
            <article
              className="archive-project"
              key={project.slug}
              id={project.slug}
            >
              <ArchivePhoto
                file={project.image}
                alt={`${project.name} team and organizers at Hacktoberfest Cebu 2025`}
              />
              <div className="archive-project-info">
                <span className="project-award">2025 / {project.award}</span>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <span className="project-category">{project.category}</span>
                <a href={project.repo} className="text-link">
                  Explore the repository <Arrow />
                </a>
                <span className="archive-big-index" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
            </article>
          ))}
          <div className="contributor-credit">
            <Eyebrow>BEST OPEN SOURCE CONTRIBUTION / 2025</Eyebrow>
            <p>
              Recognizing{" "}
              <a href="https://hf.cebutechcommunities.org/contributions/best-open-source-contribution/2025">
                Yurii Yankin and Neil Vallecer
              </a>
              , whose improvements helped make community projects better for
              everyone.
            </p>
          </div>
        </section>
        <div className="archive-supporters wrap">
          <SupporterCredits />
        </div>
        <section className="archive-thanks">
          <div className="wrap">
            <Eyebrow>IT TAKES A COMMUNITY</Eyebrow>
            <h2>
              For everyone who
              <br />
              made room for this.
            </h2>
            <p>
              The 2025 celebration was organized by JavaScript Cebu, PizzaPy
              Cebu, and Ethereum Philippines, with the support of volunteers,
              mentors, speakers, partners, and contributors.
            </p>
            <p>
              This page preserves a selection of that work. The original site
              holds the wider project collection, contributions, and event
              credits.
            </p>
            <a className="button" href="https://hf.cebutechcommunities.org/">
              Visit the original 2025 site <Arrow />
            </a>
            <div className="past-editions">
              <Eyebrow>THERE’S MORE TO THE STORY</Eyebrow>
              <nav aria-label="Older project archives">
                {[2024, 2023, 2021, 2020].map((year) => (
                  <a
                    className="text-link"
                    href={`https://hf.cebutechcommunities.org/projects/${year}`}
                    key={year}
                  >
                    {year} <Arrow />
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>
        <section className="archive-next wrap">
          <div>
            <Eyebrow>THE NEXT CHAPTER</Eyebrow>
            <h2>
              There’s more to make<span className="orange">.</span>
            </h2>
          </div>
          <Link className="button" href="/#october">
            See what’s next in 2026 <Arrow />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import {
  Header,
  Footer,
  Arrow,
  ArchivePhoto,
  Eyebrow,
} from "@/components/site-chrome";
import { CommunityBoard } from "@/components/community-board";
import { SupporterCredits } from "@/components/supporter-credits";
import { gatherings, projects, questions } from "@/lib/content";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              FOUR GATHERINGS. ONE OCTOBER IN CEBU.
            </p>
            <h1 id="hero-heading">
              LEARN. <span>BUILD.</span>
              <br />
              FIND YOUR
              <br />
              <span>PEOPLE.</span>
            </h1>
            <p className="hero-description">
              Learn with open-source AI, get mentoring and checkpoints for the project competition,
              and meet people to build with. New to Cebu? Start here.
            </p>
            <div className="hero-actions">
              <a className="button" href="#october">
                Explore October <Arrow />
              </a>
              <a className="text-link" href="#idea">
                What’s Hacktoberfest? <Arrow />
              </a>
            </div>
            <p className="hero-location">
              <span className="location-dot" aria-hidden="true" />
              CEBU, PHILIPPINES <span className="location-divider">/</span>{" "}
              OCTOBER 2026
            </p>
          </div>
          <figure className="hero-art">
            <div className="hero-poster">
              <div className="poster-topline">
                <span>BUILT TOGETHER.</span>
                <span>SHARED WITH EVERYONE.</span>
              </div>
              <div className="hero-photo">
                <ArchivePhoto
                  file="barangay-konek-team.jpg"
                  alt="The Barangay Konek team and community organizers at Hacktoberfest Cebu 2025"
                  eager
                />
              </div>
              <div className="year-tile" aria-hidden="true">
                <span>20</span>
                <span>
                  26<span className="year-dot">.</span>
                </span>
              </div>
              <div className="door-tile" aria-hidden="true">
                <span className="open-door" />
                <span className="door-floor" />
              </div>
              <div className="poster-bottomline">
                <span>COME AS YOU ARE.</span>
                <span>↗</span>
              </div>
            </div>
            <figcaption>
              <span className="caption-line" />A moment from Cebu, 2025. The
              next chapter is ours.
            </figcaption>
          </figure>
        </section>

        <div className="date-strip">
          <div className="wrap date-strip-inner">
            <span className="strip-intro">
              SEE YOU
              <br />
              THIS OCTOBER
            </span>
            {gatherings.map((event) => (
              <a
                key={event.id}
                href={`#oct-${event.day}`}
                aria-label={`See October ${event.day} gathering`}
              >
                <span>OCT</span> {event.day}
                <span className="strip-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
            <span className="strip-outro">
              FOUR DATES.
              <br />
              PLENTY OF POSSIBILITIES.
            </span>
          </div>
        </div>

        <section className="october-section" id="october">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <Eyebrow number="01">THIS OCTOBER / 2026</Eyebrow>
                <h2>
                  An October to
                  <br />
                  <span className="orange">build on.</span>
                </h2>
              </div>
              <div className="schedule-intro">
                <p>
                  From your first contribution to deployment.
                  <br />Learn together, then celebrate what you’ve built.
                </p>
                <span className="status-label">
                  <span className="status-dot" aria-hidden="true" />
                  ACTIVITIES ANNOUNCED · VENUES SOON
                </span>
              </div>
            </div>
            <div className="schedule-grid">
              {gatherings.map((event, index) => (
                <article
                  className="gathering"
                  key={event.id}
                  id={`oct-${event.day}`}
                >
                  <div className="gathering-top">
                    <span>GATHERING 0{index + 1}</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                  <time dateTime={event.date}>
                    <span className="date-number">{event.day}</span>
                    <span className="date-weekday">
                      {event.weekday} <span>· October</span>
                    </span>
                  </time>
                  <h3>{event.title}</h3>
                  <p className="gathering-summary">{event.summary}</p>
                  <p className="gathering-details">Venue &amp; time TBA</p>
                  <a
                    className="calendar-link"
                    href={`/calendar.ics?date=${event.date}`}
                    download={`hacktoberfest-cebu-${event.date}.ics`}
                  >
                    Save this date <span aria-hidden="true">↓</span>
                  </a>
                </article>
              ))}
            </div>
            <div className="schedule-bottom">
              <p>
                Registration isn’t open yet. Save a date and check back for
                venues and times.
                <br />
                <span>Calendar entries are date holds, not reservations.</span>
              </p>
              <a
                className="button button-outline"
                href="/calendar.ics"
                download="hacktoberfest-cebu-2026.ics"
              >
                Add all dates to calendar <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </section>

        <section className="participate-section wrap" id="participate">
          <div className="section-heading">
            <div>
              <Eyebrow number="02">FIND YOUR PEOPLE</Eyebrow>
              <h2>
                You belong in the room<span className="orange">.</span>
              </h2>
            </div>
            <p>
              New to Cebu, or new to open source?
              <br />
              Come on your own. Get to know people as you learn.
            </p>
          </div>
          <div className="participation-grid">
            <article>
              <span className="participation-number">01 /</span>
              <h3>Come curious.</h3>
              <p>
                Bring a question or something you couldn’t get working.
                October’s talks and workshops are a chance to explore open-source
                AI models, harnesses, and how to put them to use.
              </p>
              <a href="#faq" className="text-link">
                Your first Hacktoberfest <Arrow />
              </a>
            </article>
            <article>
              <span className="participation-number">02 /</span>
              <h3>Make something.</h3>
              <p>
                Code, design, write, or test. Learn how to contribute and deploy
                a project. Joining the project competition? Mentoring and
                checkpoints give you places to ask questions along the way.
              </p>
              <Link href="/2025#projects" className="text-link">
                Explore 2025 projects <Arrow />
              </Link>
            </article>
            <article>
              <span className="participation-number">03 /</span>
              <h3>Pass it on.</h3>
              <p>
                Share what you learn at each gathering. Help someone get
                unstuck, compare approaches, and get to know the people building
                alongside you.
              </p>
              <a
                href="https://www.getcebby.com/communities/"
                className="text-link"
              >
                Meet Cebu’s communities <Arrow />
              </a>
            </article>
          </div>
        </section>

        <section className="idea-section wrap" id="idea">
          <div>
            <Eyebrow number="03">THE IDEA</Eyebrow>
            <h2>
              Good things happen
              <br />
              in the open<span className="orange">.</span>
            </h2>
          </div>
          <div className="idea-copy">
            <p>
              Hacktoberfest is a month to learn, build, and contribute to open
              source: projects whose code is available for people to use,
              improve, and share.
            </p>
            <p className="muted">
              In 2026, the focus includes open-source AI and open-weight models.
              Cebu’s gatherings turn that into talks, workshops, and time to
              learn with other people.
            </p>
            <a className="text-link" href="https://hacktoberfest.com/">
              Meet the global celebration <Arrow />
            </a>
          </div>
        </section>

        <section className="story-section wrap" id="story">
          <div className="section-heading">
            <div>
              <Eyebrow number="04">BUILT HERE. CARRIED FORWARD.</Eyebrow>
              <h2>
                We didn’t start this year<span className="orange">.</span>
              </h2>
            </div>
            <Link className="text-link" href="/2025">
              Explore the archive <Arrow />
            </Link>
          </div>
          <p className="section-intro">
            The projects, the people, the “we actually built that” moments.
            <br className="desktop-break" /> Our next chapter starts with
            everything that came before.
          </p>
          <div className="project-gallery">
            {projects.slice(0, 3).map((project, index) => (
              <article
                key={project.slug}
                className={`project-item project-${index}`}
              >
                <a
                  className="project-image-link"
                  href={`/2025#${project.slug}`}
                  aria-label={`Explore ${project.name} from 2025`}
                >
                  <ArchivePhoto
                    file={project.image}
                    alt={`${project.name} team at the 2025 Hacktoberfest Cebu awards`}
                  />
                  <span className="photo-year">CEBU / 2025</span>
                  <span className="photo-link-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
                <div className="project-caption">
                  <div>
                    <span className="project-award">{project.award}</span>
                    <h3>
                      <a href={`/2025#${project.slug}`}>{project.name}</a>
                    </h3>
                  </div>
                  <span className="project-index">0{index + 1}</span>
                </div>
              </article>
            ))}
          </div>
          <SupporterCredits />
        </section>

        <section className="community-section" id="community">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <Eyebrow number="05">THE COMMUNITY, IN MOTION</Eyebrow>
                <h2>
                  A little proof of possibility<span className="orange">.</span>
                </h2>
              </div>
              <div className="community-note">
                <p>
                  Behind every project,
                  <br />
                  someone showed up.
                </p>
              </div>
            </div>
            <p className="section-intro">
              A few things Cebu’s builders have put into the world.
              <br className="desktop-break" /> Follow the work. Pick up a
              thread. Make it your own.
            </p>
            <CommunityBoard />
          </div>
        </section>

        <section className="beyond-section">
          <div className="wrap beyond-grid">
            <div>
              <Eyebrow number="06">BEYOND OCTOBER</Eyebrow>
              <h2>
                October ends.
                <br />
                The community
                <br />
                keeps going.
              </h2>
              <p>
                Another meetup. Another project. Another person
                <br className="desktop-break" /> who’s figuring it out, just
                like you.
              </p>
            </div>
            <div className="cebby-panel">
              <span className="cebby-tagline">
                YOUR NEXT THING IS OUT THERE.
              </span>
              <a
                className="cebby-wordmark"
                href="https://www.getcebby.com/"
                aria-label="Visit Cebby"
              >
                <Image
                  className="cebby-logo"
                  src="/images/cebby/logo.svg"
                  alt="Cebby"
                  width={886}
                  height={571}
                  loading="lazy"
                  unoptimized
                />
                <span aria-hidden="true">↗</span>
              </a>
              <p>Cebu tech events, all year.</p>
              <div className="cebby-links">
                <a className="text-link" href="https://www.getcebby.com/">
                  Explore Cebby <Arrow />
                </a>
                <a
                  className="text-link"
                  href="https://www.getcebby.com/calendar/"
                >
                  Find your next event <Arrow />
                </a>
              </div>
              <span className="cebby-address">GETCEBBY.COM</span>
            </div>
          </div>
        </section>

        <section className="faq-section wrap" id="faq">
          <div>
            <Eyebrow>BEFORE YOU COME</Eyebrow>
            <h2>
              A few good
              <br />
              questions<span className="orange">.</span>
            </h2>
            <p>Curiosity looks good on you.</p>
          </div>
          <div className="faq-list">
            {questions.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span className="faq-plus" aria-hidden="true">
                    ＋
                  </span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

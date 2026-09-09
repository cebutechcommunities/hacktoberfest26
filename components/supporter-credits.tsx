import Image from "next/image";
import { organizers2025, supporters2025 } from "@/lib/supporters";
import { Arrow } from "@/components/site-chrome";

export function SupporterCredits() {
  return (
    <section className="supporter-credits" aria-labelledby="supporter-heading">
      <div className="supporter-heading">
        <div>
          <p className="eyebrow">CARRYING THE THANKS FORWARD</p>
          <h3 id="supporter-heading">The community behind 2025.</h3>
        </div>
        <a
          className="text-link"
          href="https://hf.cebutechcommunities.org/sponsor"
        >
          Original 2025 credits <Arrow />
        </a>
      </div>

      <div className="organizer-band">
        <p className="eyebrow">2025 ORGANIZERS &amp; CO-PRESENTERS</p>
        <ul className="organizer-list">
          {organizers2025.map((organizer) => (
            <li key={organizer.name}>
              <a className="organizer-link" href={organizer.href}>
                <div className="organizer-logo">
                  <Image
                    src={organizer.logo}
                    alt=""
                    width={organizer.width}
                    height={organizer.height}
                    unoptimized
                  />
                </div>
                <span className="organizer-name">
                  {organizer.name} <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <dl className="supporter-groups">
        {supporters2025.map((group) => (
          <div className="supporter-group" key={group.label}>
            <dt>{group.label}</dt>
            <dd>
              <ul>
                {group.members.map((member) => (
                  <li key={member.name}>
                    <a href={member.href}>
                      {member.name}
                      <span className="supporter-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
      <p className="supporter-note">
        And to every volunteer, mentor, speaker, and contributor who made the
        2025 celebration possible: daghang salamat.
      </p>
    </section>
  );
}

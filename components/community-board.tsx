"use client";
import { useState } from "react";
import { activities, type ActivityCategory } from "@/lib/content";
import { Arrow } from "./site-chrome";

export function CommunityBoard() {
  const [filter, setFilter] = useState<"All" | ActivityCategory>("All");
  const filtered = activities.filter(
    (activity) => filter === "All" || activity.category === filter,
  );
  return (
    <div className="community-board">
      <div className="board-toolbar">
        <div
          className="board-filters"
          role="group"
          aria-label="Filter community activity"
        >
          {(["All", "Projects", "Contributions"] as const).map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <span className="board-period">FROM THE 2025 ARCHIVE</span>
      </div>
      <p className="sr-only" role="status">
        {filtered.length}{" "}
        {filter === "All" ? "community updates" : filter.toLowerCase()} shown
      </p>
      <div className="activity-list">
        {filtered.map((activity) => (
          <a href={activity.href} className="activity" key={activity.id}>
            <div
              className={`activity-symbol ${activity.category === "Projects" ? "project-symbol" : "contribution-symbol"}`}
              aria-hidden="true"
            >
              {activity.category === "Projects" ? "{ }" : "+"}
            </div>
            <div className="activity-content">
              <p className="activity-meta">
                {activity.project}
                <span>·</span>
                {activity.category}
              </p>
              <h3>{activity.title}</h3>
              <p className="activity-detail">{activity.detail}</p>
            </div>
            <div className="activity-end">
              <time dateTime={activity.date}>{activity.dateLabel}</time>
              <Arrow />
            </div>
          </a>
        ))}
      </div>
      <p className="board-footnote">
        Real work, with a trail you can follow. Every update links to its
        source.
      </p>
    </div>
  );
}

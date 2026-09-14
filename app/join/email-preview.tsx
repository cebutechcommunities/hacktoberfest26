'use client';

import { useState } from 'react';
import { sampleProjects, type Participation } from '@/lib/join-participation';

export type EmailPreferences = { team: boolean; preparation: boolean; digest: boolean; suggestions: boolean };
export const initialEmailPreferences: EmailPreferences = { team: true, preparation: true, digest: false, suggestions: false };
type Preview = { id: string; kind: string; trigger: string; subject: string; body: string; cta: string; destination: 'home' | 'browse' | 'october' };

export function EmailPreview({ name, email, participation, mergeSent, preferences, setPreferences, navigate }: {
  name: string; email: string; participation: Participation; mergeSent: boolean;
  preferences: EmailPreferences; setPreferences: (preferences: EmailPreferences) => void;
  navigate: (stage: 'home' | 'browse' | 'october') => void;
}) {
  const [selectedId, setSelectedId] = useState('welcome');
  const previews: Preview[] = [{ id: 'welcome', kind: 'REGISTRATION', trigger: 'Once, when registration is completed.', subject: 'You’re part of Hacktoberfest Cebu 2026', body: `Hi ${name}, your October registration is complete. You can bring several ideas, explore teams, or come to learn. Your participant home keeps everything together. Venues, times, and practical details are still to be confirmed.`, cta: 'Open my October home', destination: 'home' }];
  if (preferences.team) {
    for (const request of participation.requests) {
      const project = sampleProjects.find(project => project.id === request.projectId)!;
      previews.push(request.status === 'member'
        ? { id: request.projectId, kind: 'TEAM ACCEPTANCE', trigger: 'Only after the team organizer approves your request. Use “Simulate approval” on your home to try this.', subject: `You’ve joined ${project.team}`, body: `Hi ${name}, ${project.team} approved your request to contribute to ${project.title}. Open your team to see the project and coordinate your first contribution. Your other projects and team requests are still there.`, cta: 'See my teams', destination: 'home' }
        : { id: request.projectId, kind: 'REQUEST RECEIPT', trigger: 'Once, after your join request is recorded.', subject: `Your request to ${project.team} is pending`, body: `Hi ${name}, your request to contribute to ${project.title} is awaiting a response from ${project.team}. You haven’t joined yet. You can explore other projects while you wait, or cancel this request from your home.`, cta: 'View my requests', destination: 'home' });
    }
    if (participation.projects.length) previews.push({ id: 'owner-request', kind: 'PROJECT OWNER / ILLUSTRATIVE SCENARIO', trigger: 'When another participant requests to join a team you organize. This preview uses a hypothetical incoming request.', subject: `Someone wants to help with ${participation.projects[0].title}`, body: 'A participant has requested to join your team. Review their introduction and the help they want to offer, then accept or decline. We only tell them they have joined after you accept.', cta: 'See my projects', destination: 'home' });
  }
  if (mergeSent) previews.push({ id: 'merge', kind: 'HISTORY REVIEW', trigger: 'Once, after a manual review request is recorded.', subject: 'We’ll review your past participation', body: `Hi ${name}, your request to connect participation from another email is awaiting organizer review. No history has been attached yet. You can keep preparing for October while the organizers confirm ownership and review the records.`, cta: 'Continue with October', destination: 'home' });
  if (preferences.digest) previews.push({ id: 'digest', kind: 'WEEKLY DIGEST / SAMPLE EDITION', trigger: 'At most once a week, only when there are new published projects. The entries below are sample content, not a real weekly feed.', subject: 'New ideas to explore in Cebu this week', body: 'A clearer commute — help make local routes easier to understand. Cebuano learning companion — explore language and open-weight models. Community resource map — contribute research, writing, or code. Already working on something? You can explore another project too.', cta: 'Explore projects', destination: 'browse' });
  if (preferences.suggestions) previews.push({ id: 'suggestion', kind: 'TEAM SUGGESTION / SAMPLE', trigger: 'With permission, at most once a week when an open team fits interests the participant has explicitly shared. No matching engine or interest profile is connected in this mock.', subject: 'A team you might like to meet', body: 'If you’re interested in local research and writing, Open Neighbourhood is exploring a community resource map. Take a look and decide whether you’d like to request to join. This is an invitation to explore; you have not been assigned to the team.', cta: 'Explore the teams', destination: 'browse' });
  if (preferences.preparation) previews.push({ id: 'preparation', kind: 'GATHERING REMINDER / SAMPLE', trigger: 'One preparation email about three days before a selected gathering, using confirmed organizer details. Selection and scheduling are future work.', subject: 'Getting ready for the October 3 opening', body: 'The opening ceremony introduces open source and offers project mentoring. Bring a question, an interest, or a short introduction to what you’re building. No team or project is needed to start. This preview leaves venue, time, equipment, and costs unfilled until the organizers confirm them.', cta: 'Review the gathering', destination: 'october' });
  const selected = previews.find(preview => preview.id === selectedId) ?? previews[0];
  return <>
    <p className="join-lead">Useful updates that lead back to your projects and your October plans. Choose what you’d like to hear about.</p>
    <div className="join-preferences">
      <h3>Your email preferences</h3>
      {([
        ['team', 'Updates about my teams', 'Join requests, responses, and requests to teams I organize.'],
        ['preparation', 'Help me prepare', 'Gathering reminders and follow-up resources.'],
        ['digest', 'New projects this week', 'One optional digest, only when there is something new.'],
        ['suggestions', 'Help me find people to build with', 'Occasional team suggestions based on interests I choose to share.'],
      ] as const).map(([key, label, help]) => <label className="join-check" key={key} htmlFor={`email-${key}`}><input id={`email-${key}`} type="checkbox" checked={preferences[key]} onChange={event => setPreferences({ ...preferences, [key]: event.target.checked })}/><span>{label}<small>{help}</small></span></label>)}
      <p className="join-help">Registration receipts, sign-in messages, history-review decisions, and important changes to gatherings you selected stay separate from optional subscriptions. Team activity will also appear in your participant home.</p>
      <p className="join-help">Preferences apply only within this demo session. No emails are sent.</p>
    </div>
    <div className="join-email-picker"><label>Preview an email<select value={selected.id} onChange={event => setSelectedId(event.target.value)}>{previews.map(preview => <option key={preview.id} value={preview.id}>{preview.subject}</option>)}</select></label><p className="join-help">Available previews reflect your preferences and demo activity. Create a project or request a team to see their updates.</p></div>
    <article className="join-email" aria-live="polite">
      <p className="join-kicker">EMAIL PREVIEW / NEVER SENT</p><p className="join-help">To: {email}</p><h2>{selected.subject}</h2><p>{selected.body}</p><button className="join-primary" onClick={() => navigate(selected.destination)}>{selected.cta} <span>→</span></button><div className="join-email-footer">Hacktoberfest Cebu · October 2026<br/>Email preferences are available above. Optional emails will include an unsubscribe link.</div>
    </article>
    <div className="join-note"><strong>{selected.kind}</strong><p>{selected.trigger}</p></div>
  </>;
}

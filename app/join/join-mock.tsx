'use client';

import { useReducer, useRef, useState } from 'react';
import { emptyParticipation, participationReducer, sampleProjects } from '@/lib/join-participation';
import { EmailPreview, initialEmailPreferences } from './email-preview';
import Link from 'next/link';
import './join.css';

type Stage = 'email' | 'verify' | 'welcome' | 'october' | 'create' | 'browse' | 'home' | 'updates';
const events = [
  ['03', 'SAT', 'Opening ceremony', 'Meet the community, explore open source, and get mentoring for your project.'],
  ['10', 'SAT', 'AI models & harnesses', 'Explore open-source and open-weight AI through workshops. Check in on your project.'],
  ['18', 'SUN', 'Deployment day', 'Learn to put projects and models online. The final project checkpoint.'],
  ['25', 'SUN', 'Celebrate together', 'Awarding ceremony and VIP dinner. Access details will be announced.'],
];
export function JoinMock() {
  const [stage, setStage] = useState<Stage>('email');
  const [returning, setReturning] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [registered, setRegistered] = useState(false);
  const [title, setTitle] = useState('');
  const [team, setTeam] = useState('');
  const [description, setDescription] = useState('');
  const [projectType, setProjectType] = useState('New idea');
  const [openTeam, setOpenTeam] = useState(true);
  const [participation, dispatch] = useReducer(participationReducer, emptyParticipation);
  const [preferences, setPreferences] = useState(initialEmailPreferences);
  const [notice, setNotice] = useState('');
  const [filter, setFilter] = useState('');
  const [merge, setMerge] = useState(false);
  const [oldEmail, setOldEmail] = useState('');
  const [mergeSent, setMergeSent] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  function go(next: Stage) { setNotice(''); setStage(next); setTimeout(() => { heading.current?.focus(); window.scrollTo({ top: 0, behavior: 'instant' }); }, 0); }
  function reset() { setReturning(false); setRegistered(false); setName(''); setEmail(''); setTitle(''); setTeam(''); setDescription(''); dispatch({ type: 'reset' }); setPreferences(initialEmailPreferences); setChecked([]); setMergeSent(false); setMerge(false); setOldEmail(''); setFilter(''); setProjectType('New idea'); setOpenTeam(true); go('email'); }
  function openProjectForm() { setTitle(''); setTeam(''); setDescription(''); setProjectType('New idea'); setOpenTeam(true); go('create'); }
  const allProjects = [...sampleProjects, ...participation.projects];
  const filteredProjects = allProjects.filter(project => [project.title, project.team, project.text, project.needs].join(' ').toLowerCase().includes(filter.toLowerCase()));
  const step = registered ? 1 : 0;
  const titles: Record<Stage, string> = { email: 'YOUR OCTOBER\nSTARTS HERE.', verify: 'ONE SMALL STEP.\nTHEN YOU’RE IN.', welcome: returning ? 'GOOD TO HAVE\nYOU BACK.' : 'THERE’S A PLACE\nFOR YOU HERE.', october: 'FOUR GATHERINGS.\nROOM TO GROW.', create: 'GIVE YOUR IDEA\nA PLACE TO GROW.', browse: 'FIND SOMETHING\nYOU CARE ABOUT.', home: 'YOUR IDEAS. YOUR PEOPLE.\nYOUR OCTOBER.', updates: 'STAY IN THE LOOP.\nON YOUR TERMS.' };
  return <div className="join-app">
    <div className="join-demo"><span><strong>INTERACTIVE MOCK</strong> · Sample data. No emails sent or registrations saved. Refresh resets progress. Try returning@example.com for sample history; any other email for an unmatched record.</span><button onClick={reset}>Restart demo ↺</button></div>
    <header className="join-header"><Link href="/" className="join-brand">HACKTOBERFEST <span>CEBU / 2026</span></Link><Link href="/#october">Explore the event ↗</Link></header>
    <main className="join-layout">
      <aside className="join-aside"><p className="join-kicker">MADE IN CEBU. OPEN TO EVERYONE.</p><div className="join-poster"><span>COME<br/>CURIOUS.<br/><em>BUILD</em><br/><em>TOGETHER.</em></span><div className="join-poster-foot">03 / 10 / 18 / 25 <span>OCT ’26 ↗</span></div></div><p>You don’t need a team, a finished idea, or years of experience to get started.</p>{registered ? <nav className="join-account-nav" aria-label="Participant navigation">{([['home', 'My October'], ['browse', 'Explore projects & teams'], ['create', 'Start a project'], ['october', 'Gatherings & preparation'], ['updates', 'Updates & email preferences']] as const).map(([destination, label]) => <button key={destination} aria-current={stage === destination ? 'page' : undefined} onClick={() => destination === 'create' ? openProjectForm() : go(destination)}>{label}<span>↗</span></button>)}</nav> : <ol className="join-progress">{['Join the community', 'Explore your October'].map((label, i) => <li key={label} aria-current={step === i ? 'step' : undefined} className={step === i ? 'active' : ''}><span>0{i + 1}</span>{label}</li>)}</ol>}</aside>
      <section className="join-content"><p className="join-kicker">{registered ? 'YOUR OCTOBER / DEMO' : 'JOIN THE COMMUNITY'}</p><h1 tabIndex={-1} ref={heading}>{titles[stage]}</h1>
      {stage === 'email' && <><p className="join-lead">Learn, make something useful, and find your people. Start with your email.</p><form onSubmit={e => { e.preventDefault(); go('verify'); }}><label>Email address<input required type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} /></label><p className="join-help">Use the email you’d like to join with. Past participation is shown only after email verification.</p><button className="join-primary">Join now <span>↗</span></button></form><p className="join-help">Newcomers, repeat participants, developers, designers, writers, and curious learners are welcome.</p></>}
      {stage === 'verify' && <><p className="join-lead">The real flow will verify <strong>{email}</strong> before showing any participation history.</p><div className="join-note">For this mock, use the button below to simulate a successful email check. No message has been sent.</div><button className="join-primary" onClick={() => { setReturning(email.trim().toLowerCase() === 'returning@example.com'); go('welcome'); }}>Simulate verified email <span>→</span></button><button className="join-text" onClick={() => go('email')}>← Change email</button></>}
      {stage === 'welcome' && <><p className="join-lead">{returning ? 'We found past participation linked to your verified email. Welcome back for a new October.' : 'We haven’t found past participation linked to this email. Whether this is your first October with us or you’ve joined before, you’re welcome here.'}</p>{returning && <div className="join-history"><p className="join-kicker">ILLUSTRATIVE HISTORY · NOT YOUR RECORDS</p><h3>Your previous chapters</h3><p><strong>2025</strong> · Registered · Attended opening and deployment sessions</p><p>Project: Community noticeboard · Contributor</p><p><strong>2024</strong> · Registered · Attended opening ceremony</p></div>}<details className="join-merge" open={merge} onToggle={e => setMerge(e.currentTarget.open)}><summary>{returning ? 'Something missing from your history?' : 'Attended before with another email?'}</summary><p>We may have your past participation under another email. Share it for a manual review, and keep joining while the organizers look into it.</p>{mergeSent ? <p role="status">Demo request received for {oldEmail}. No history has been merged.</p> : <form onSubmit={e => { e.preventDefault(); setMergeSent(true); }}><label>Previous email<input required type="email" value={oldEmail} onChange={e => setOldEmail(e.target.value)} /></label><button className="join-secondary">Preview merge request</button><small>Ownership will need to be confirmed during review.</small></form>}</details><form onSubmit={e => { e.preventDefault(); setRegistered(true); go('october'); }}><label>What should we call you?<input required maxLength={80} autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" /></label><button className="join-primary">Complete demo registration <span>→</span></button></form><p className="join-help">This joins the October program. Competition entry and any separately ticketed gathering are separate.</p></>}
      {stage === 'october' && <><div className="join-success">✓ You’re registered in this demo, {name}. Your next choices can change later.</div><p className="join-lead">This year is about making and contributing to open-source projects, with workshops exploring open-weight AI models. Participation goes beyond counting PRs.</p><div className="join-events">{events.map(([day, weekday, title, text]) => <article key={day}><div className="join-date"><strong>{day}</strong><span>OCT / {weekday}</span></div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><p className="join-help">Venues, times, costs, workshop setup, competition rules, and dinner access are still to be confirmed. Registration is not a reservation for the VIP dinner.</p><button className="join-primary" onClick={() => go('home')}>Open my October home <span>→</span></button></>}
      {stage === 'create' && <><p className="join-lead">Any project topic is welcome. Tell people what you want to work on and how they could help.</p><form onSubmit={e => { e.preventDefault(); dispatch({ type: 'create', project: { title: title.trim(), team: team.trim(), text: description.trim(), level: projectType, open: openTeam, needs: 'See the project description for ways to help.' } }); go('home'); }}><label>Project or idea name<input required maxLength={100} value={title} onChange={e => setTitle(e.target.value)} placeholder="What are you working on?" /></label><label>Starting point<select value={projectType} onChange={e => setProjectType(e.target.value)}><option>New idea</option><option>Existing project</option></select></label><label>Tell us about it<textarea required maxLength={1000} rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="What would it do? Who is it for? What help would you welcome?" /></label><label>Team name<input required maxLength={80} value={team} onChange={e => setTeam(e.target.value)} placeholder="Give your team a name" /></label><label className="join-check"><input type="checkbox" checked={openTeam} onChange={e => setOpenTeam(e.target.checked)} /> We’re open to more teammates</label><div className="join-note">You’ll be the first team member. In the real flow, publishing makes this description visible to other participants. It does not enter the competition.</div><button className="join-primary">Create demo project & team <span>→</span></button></form><button className="join-text" onClick={() => go('home')}>← Back to my October</button></>}
      {stage === 'browse' && <>
        <p className="join-lead">Explore an idea, join a team, or contribute to several projects. Your own projects and other requests stay with you.</p>
        <div className="join-note">These teams are samples. Projects you create also appear here for this session. Requests need approval; nothing is sent.</div>
        <label>Find a project or contribution<input type="search" placeholder="Try design, language, research…" value={filter} onChange={e => setFilter(e.target.value)} /></label>
        <p className="join-feedback" role="status">{notice}</p>
        <div className="join-projects">{filteredProjects.map(project => {
          const owned = participation.projects.some(own => own.id === project.id);
          const request = participation.requests.find(request => request.projectId === project.id);
          return <article key={project.id}>
            <p className="join-kicker">{project.level} / {owned ? 'YOUR PROJECT' : 'SAMPLE TEAM'} / {project.open ? 'OPEN TO TEAMMATES' : 'NOT RECRUITING'}</p>
            <h3>{project.title}</h3><p>{project.text}</p><p className="join-help">{project.needs}</p>
            <div><span>{project.team}</span>{owned ? <span className="join-badge">You organize this team</span> : <button className="join-secondary" disabled={!!request || !project.open} onClick={() => { dispatch({ type: 'request', projectId: project.id }); setNotice(`Request to ${project.team} added. Keep exploring, or view all requests in My October.`); }}>{request?.status === 'member' ? '✓ Team member' : request ? 'Request pending' : 'Request to join →'}</button>}</div>
          </article>;
        })}{!filteredProjects.length && <p>No projects match. Try another skill or browse all projects.</p>}</div>
        <button className="join-text" onClick={() => go('home')}>View my projects & requests →</button>
      </>}
      {stage === 'home' && <>
        <div className="join-success">✓ {name}, you’re registered in this demo. Keep building from here.</div>
        <p className="join-lead">Start an idea, contribute to another, or simply come to learn. You can do more than one, whenever you’re ready.</p>
        <div className="join-home-actions"><button className="join-primary" onClick={openProjectForm}>Start {participation.projects.length ? 'another' : 'a'} project <span>↗</span></button><button className="join-secondary" onClick={() => go('browse')}>Explore projects & teams ↗</button></div>
        <div className="join-section-heading"><h3>Projects you organize</h3><span>{participation.projects.length}</span></div>
        {participation.projects.length ? participation.projects.map(project => <article className="join-contribution" key={project.id}><p className="join-kicker">ORGANIZER / {project.level}</p><h3>{project.title}</h3><p>{project.text}</p><p className="join-help">{project.team} · {project.open ? 'Open to teammates' : 'Not recruiting'} · Demo project</p></article>) : <p className="join-empty">Have something in mind? Start a team around a new idea or an existing project. No idea yet is fine too.</p>}
        <div className="join-section-heading"><h3>Teams & join requests</h3><span>{participation.requests.length}</span></div>
        <p className="join-feedback" role="status">{notice}</p>
        {participation.requests.length ? participation.requests.map(request => {
          const project = sampleProjects.find(project => project.id === request.projectId)!;
          return <article className="join-contribution" key={request.projectId}><p className="join-kicker">{request.status === 'member' ? 'MEMBER / DEMO APPROVAL' : 'AWAITING TEAM RESPONSE'}</p><h3>{project.title}</h3><p>{project.team} · {request.status === 'member' ? 'Your request has been approved in this demo.' : 'Request pending. You are not a team member yet.'}</p>
            {request.status === 'pending' ? <div className="join-request-actions"><button className="join-secondary" onClick={() => { dispatch({ type: 'approve', projectId: request.projectId }); setNotice(`Demo approval: you’ve joined ${project.team}. Preview the acceptance email in Updates.`); }}>Simulate team approval</button><button className="join-text" onClick={() => { dispatch({ type: 'cancel', projectId: request.projectId }); setNotice(`Request to ${project.team} cancelled in this demo. Your other contributions remain.`); }}>Cancel request</button></div> : <button className="join-text" onClick={() => go('updates')}>Preview team update email →</button>}
          </article>;
        }) : <p className="join-empty">No requests yet. Browse teams whenever you’re curious. You can attend and learn without joining one.</p>}
        <p className="join-help">You can have several projects and requests. Agree with each team on how much you can contribute. Competition entry is a separate decision.</p>
        <div className="join-next"><p className="join-kicker">NEXT UP / OCTOBER 3, 2026</p><h2>Come curious.<br/>Meet your people.</h2><p>Opening ceremony · Open-source introduction and project mentoring.</p><a className="join-secondary" href="/calendar.ics?date=2026-10-03">Add date hold to calendar ↗</a><small>Time and venue to be confirmed. This holds the date; it does not reserve a seat.</small></div>
        <h3 className="join-check-title">A little preparation goes a long way.</h3>
        {['Hold the October dates in your calendar', 'Bring a question, an interest, or a short introduction to your projects', 'Check back for venues, times, and workshop setup'].map(item => <label className="join-check" key={item}><input type="checkbox" checked={checked.includes(item)} onChange={() => setChecked(checked.includes(item) ? checked.filter(x => x !== item) : [...checked, item])} />{item}</label>)}
        <div className="join-note"><strong>Keep up with your people.</strong><p>Get team updates, choose a weekly project digest, and prepare for the next gathering.</p><button className="join-text" onClick={() => go('updates')}>Choose updates & preview emails →</button></div>
        <details className="join-merge"><summary>About competition entry</summary><p>Registration and team creation are separate from competition entry. Rules, eligibility for existing projects, multiple entries, submission requirements, and awards will be announced.</p></details>
        {returning && <details className="join-merge"><summary>Your past participation · sample history</summary><p>2025 · Registered; attended opening and deployment sessions; contributed to Community noticeboard.</p><p>2024 · Registered; attended opening ceremony.</p></details>}
      </>}
      {stage === 'updates' && <EmailPreview name={name} email={email} participation={participation} mergeSent={mergeSent} preferences={preferences} setPreferences={setPreferences} navigate={go} />}
      </section>
    </main><footer className="join-footer">LEARN. BUILD. FIND YOUR PEOPLE.<span>HACKTOBERFEST CEBU / OCTOBER 2026</span></footer>
  </div>;
}

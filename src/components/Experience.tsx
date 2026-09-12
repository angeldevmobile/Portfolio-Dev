import React, { useRef, useState } from 'react';
import { FaArrowRight, FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa';
import './css/Experience.css';

type RoleType = 'Full-time' | 'Internship' | 'Open source';

interface Bar {
  label: string;
  start: string; // "YYYY-MM", or "YYYY" when the month isn't known
  end?: string; // omitted = present
}

interface Role {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  type: RoleType;
  start: string;
  end?: string;
  color: string;
  bars: Bar[];
  summary: string;
  highlights: string[];
  skills: string[];
  links?: { label: string; url: string }[];
  toProjects?: boolean;
}

const roles: Role[] = [
  {
    id: 'bbva-dev',
    title: 'Software Developer',
    company: 'BBVA Perú',
    companyUrl: 'https://www.bbva.pe/',
    type: 'Full-time',
    start: '2024-11',
    color: '#3b82f6',
    bars: [{ label: 'Software Developer', start: '2024-11' }],
    summary: 'Software development for internal banking operations, including AI projects.',
    highlights: [
      'Built an AI virtual assistant on Google Gemini for internal banking operations',
      'Implemented a DocumentAI pipeline for automated document extraction and validation',
      'Developed secure REST APIs with Flask for sensitive financial data and compliance workflows',
      'Worked in an agile team, leading the AI integration strategy and mentoring junior developers',
    ],
    skills: ['Python', 'Flask', 'Google Gemini', 'DocumentAI', 'REST APIs', 'LLMs', 'Agile'],
  },
  {
    id: 'bbva-intern',
    title: 'Automation Developer',
    company: 'BBVA Perú',
    companyUrl: 'https://www.bbva.pe/',
    type: 'Internship',
    start: '2023-12',
    end: '2024-11',
    color: '#22c55e',
    bars: [{ label: 'Internship', start: '2023-12', end: '2024-11' }],
    summary:
      'Automation for banking operations: dashboards, reporting pipelines and notification systems for real-time KPI tracking.',
    highlights: [
      'Cut manual workload by 60%, saving 100+ work hours per month',
      'Built interactive dashboards for data visualization and KPI monitoring',
      'Automated report extraction from legacy terminals to Excel and Google Sheets',
      'Developed automated email notifications with Apps Script and Python',
    ],
    skills: ['Python', 'AutoHotkey', 'VBA', 'Apps Script', 'Excel', 'Google Sheets'],
  },
  {
    id: 'open-source',
    title: 'Creator',
    company: 'Orion Language & Flux',
    type: 'Open source',
    start: '2025',
    color: '#a855f7',
    bars: [
      { label: 'Orion', start: '2025' },
      { label: 'Flux', start: '2026-05' },
    ],
    summary:
      'Two open-source developer tools I design and build end to end, both in public beta and launched on Product Hunt.',
    highlights: [
      'Orion: a Rust language for backend, automation and HPC, with a bytecode VM, Cranelift JIT and AOT native binaries',
      "Orion's columnar data engine loads and aggregates 500k CSV rows ~2× faster than Python (~6× with its binary .odf format)",
      'Flux: a native API client for HTTP, WebSocket, SSE, gRPC and GraphQL in under 30 MB of RAM, with AI tests powered by Claude',
    ],
    skills: ['Rust', 'Cranelift', 'Rayon', 'Tauri', 'React', 'TypeScript', 'Claude API'],
    links: [
      { label: 'fluxapi.dev', url: 'https://fluxapi.dev/' },
      { label: 'Orion docs', url: 'https://docs-orion.onrender.com/' },
    ],
    toProjects: true,
  },
];

/* ── Dates ── */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const now = new Date();
const NOW = now.getFullYear() * 12 + now.getMonth();

// Absolute month index; a year-only date counts from January
const toMonth = (ym: string) => {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + ((m || 1) - 1);
};

const formatDate = (ym?: string) => {
  if (!ym) return 'Present';
  const [y, m] = ym.split('-').map(Number);
  return m ? `${MONTHS[m - 1]} ${y}` : `${y}`;
};

// Inclusive month count, like LinkedIn. Empty when the start has no month.
const formatDuration = (start: string, end?: string) => {
  if (!start.includes('-')) return '';
  const months = (end ? toMonth(end) : NOW) - toMonth(start) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
  return parts.join(' ');
};

/* ── Timeline scale ── */

const AXIS_START = Math.min(...roles.flatMap((r) => r.bars.map((b) => toMonth(b.start)))) - 1;
const AXIS_END = NOW + 2;
const pct = (month: number) => ((month - AXIS_START) / (AXIS_END - AXIS_START)) * 100;

const YEAR_TICKS: number[] = [];
for (let y = Math.ceil(AXIS_START / 12); y * 12 <= AXIS_END; y++) YEAR_TICKS.push(y);

interface ExperienceProps {
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
}

const Experience: React.FC<ExperienceProps> = ({ setCurrentSection }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = roles[activeIdx];

  const select = (idx: number, focus = false) => {
    setActiveIdx(idx);
    if (focus) tabRefs.current[idx]?.focus();
  };

  const onTabKey = (e: React.KeyboardEvent) => {
    const next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select((activeIdx + next + roles.length) % roles.length, true);
  };

  const goToProjects = () => {
    setCurrentSection('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const duration = formatDuration(active.start, active.end);

  return (
    <section className="exp-section">
      {/* Background */}
      <div className="exp-bg-grid" />
      <div className="exp-bg-orb exp-orb-1" />
      <div className="exp-bg-orb exp-orb-2" />

      {/* Header */}
      <div className="exp-header">
        <div className="exp-header-badge">
          <FaBriefcase size={12} />
          Professional Experience
        </div>
        <h2 className="exp-title">
          Where I've <span className="exp-gradient-text">Worked</span>
        </h2>
        <p className="exp-subtitle">
          From automation intern to software developer at BBVA, working on AI projects, plus the
          open-source tools I build on the side.
        </p>
      </div>

      {/* Timeline: what ran in parallel. Mouse shortcut to the tabs below. */}
      <div className="exp-gantt" aria-hidden>
        <div className="exp-gantt-axis">
          {YEAR_TICKS.map((y) => (
            <span key={y} className="exp-gantt-tick" style={{ left: `${pct(y * 12)}%` }}>
              {y}
            </span>
          ))}
          <span className="exp-gantt-tick exp-gantt-tick--now" style={{ left: `${pct(NOW + 1)}%` }}>
            Now
          </span>
        </div>

        <div className="exp-gantt-rows">
          {YEAR_TICKS.map((y) => (
            <span key={y} className="exp-gantt-line" style={{ left: `${pct(y * 12)}%` }} />
          ))}
          <span className="exp-gantt-line exp-gantt-line--now" style={{ left: `${pct(NOW + 1)}%` }} />

          {roles.map((role, idx) => (
            <button
              key={role.id}
              type="button"
              tabIndex={-1}
              className={`exp-gantt-row ${idx === activeIdx ? 'active' : ''}`}
              style={{ '--exp-color': role.color } as React.CSSProperties}
              onClick={() => select(idx)}
            >
              {role.bars.map((bar) => {
                const left = pct(toMonth(bar.start));
                const right = pct(bar.end ? toMonth(bar.end) + 1 : NOW + 1);
                return (
                  <span
                    key={bar.label}
                    className={`exp-gantt-bar ${bar.end ? '' : 'is-ongoing'}`}
                    style={{ left: `${left}%`, width: `${right - left}%` }}
                  >
                    {bar.label}
                  </span>
                );
              })}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs + detail */}
      <div className="exp-body">
        <div className="exp-tabs" role="tablist" aria-label="Experience" aria-orientation="vertical" onKeyDown={onTabKey}>
          {roles.map((role, idx) => (
            <button
              key={role.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              id={`exp-tab-${role.id}`}
              aria-selected={idx === activeIdx}
              aria-controls={`exp-panel-${role.id}`}
              tabIndex={idx === activeIdx ? 0 : -1}
              className={`exp-tab ${idx === activeIdx ? 'active' : ''}`}
              style={{ '--exp-color': role.color } as React.CSSProperties}
              onClick={() => select(idx)}
            >
              <span className="exp-tab-title">
                {role.title}
                {!role.end && <span className="exp-tab-live" aria-label="current" />}
              </span>
              <span className="exp-tab-company">{role.company}</span>
              <span className="exp-tab-dates">
                {formatDate(role.start)} – {formatDate(role.end)}
              </span>
            </button>
          ))}
        </div>

        <div
          key={active.id}
          role="tabpanel"
          id={`exp-panel-${active.id}`}
          aria-labelledby={`exp-tab-${active.id}`}
          className="exp-panel"
          style={{ '--exp-color': active.color } as React.CSSProperties}
        >
          <div className="exp-panel-head">
            <div>
              <h3 className="exp-panel-title">
                {active.title}{' '}
                <span className="exp-panel-at">@</span>{' '}
                {active.companyUrl ? (
                  <a
                    href={active.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="exp-panel-company"
                  >
                    {active.company} <FaExternalLinkAlt aria-hidden />
                  </a>
                ) : (
                  <span className="exp-panel-company">{active.company}</span>
                )}
              </h3>
              <p className="exp-panel-dates">
                {formatDate(active.start)} – {formatDate(active.end)}
                {duration && ` · ${duration}`}
              </p>
            </div>
            <div className="exp-badges">
              <span className="exp-badge">{active.type}</span>
              {!active.end && (
                <span className="exp-current">
                  <span className="exp-current-dot" />
                  Current
                </span>
              )}
            </div>
          </div>

          <p className="exp-panel-summary">{active.summary}</p>

          <ul className="exp-highlights">
            {active.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <div className="exp-skills">
            {active.skills.map((skill) => (
              <span key={skill} className="exp-skill">
                {skill}
              </span>
            ))}
          </div>

          {(active.links || active.toProjects) && (
            <div className="exp-actions">
              {active.toProjects && (
                <button type="button" className="exp-action exp-action--primary" onClick={goToProjects}>
                  See Orion &amp; Flux in Projects <FaArrowRight aria-hidden />
                </button>
              )}
              {active.links?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exp-action"
                >
                  {link.label} <FaExternalLinkAlt aria-hidden />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;

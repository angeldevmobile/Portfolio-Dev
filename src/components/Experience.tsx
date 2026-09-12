import React, { useRef, useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaBriefcase, FaCode, FaLaptopCode, FaMapMarkerAlt } from 'react-icons/fa';
import './css/Experience.css';

type RoleType = 'Full-time' | 'Internship' | 'Independent' | 'Projects';

interface Role {
  title: string;
  type: RoleType;
  start: string; // "YYYY-MM", or "YYYY" when the month isn't known
  end?: string; // omitted = present
  link?: { label: string; url: string };
  summary: string;
  highlights: string[];
  skills: string[];
}

interface Company {
  name: string;
  url?: string;
  location: string;
  logo: React.ReactNode;
  color: string;
  current?: boolean;
  roles: Role[];
}

const companies: Company[] = [
  {
    name: 'Independent',
    location: 'Open-source developer tools',
    logo: <FaCode />,
    color: '#a855f7',
    current: true,
    roles: [
      {
        title: 'Creator of Flux',
        type: 'Independent',
        start: '2026-05',
        link: { label: 'fluxapi.dev', url: 'https://fluxapi.dev/' },
        summary: 'Open-source desktop API client built with Tauri and Rust, a lightweight alternative to Postman.',
        highlights: [
          'Tests HTTP, WebSocket, SSE, gRPC and GraphQL from one native app that runs in under 30 MB of RAM',
          'AI test generation, error debugging and failing-test fixes powered by Claude',
          'Built-in load testing, local mock servers and a CLI runner for CI pipelines',
          'Public beta v0.3.0, launched on Product Hunt',
        ],
        skills: ['Rust', 'Tauri', 'React', 'TypeScript', 'gRPC', 'Claude API'],
      },
      {
        title: 'Creator of Orion Language',
        type: 'Independent',
        start: '2025',
        link: { label: 'docs-orion.onrender.com', url: 'https://docs-orion.onrender.com/' },
        summary: 'Programming language for backend work, automation and high-performance computing (HPC), written in Rust end to end.',
        highlights: [
          'Bytecode VM, Cranelift JIT and AOT native binaries, all sharing one frontend',
          'HPC data engine: loads and aggregates 500k CSV rows ~2× faster than Python (~6× with its binary .odf format), with rayon-parallel aggregations',
          'Linear algebra on nalgebra (LU, eigen, SVD) and a 24-qubit quantum circuit simulator',
          'Ships as a single executable with 58 standard library modules',
          'LSP and debugger (DAP) for VS Code, plus a browser playground',
          'Public beta v0.4.0, launched on Product Hunt',
        ],
        skills: ['Rust', 'Cranelift', 'Bytecode VM', 'Rayon', 'nalgebra', 'LSP', 'DAP'],
      },
    ],
  },
  {
    name: 'BBVA Perú',
    url: 'https://www.bbva.pe/',
    location: 'Banking · Perú',
    logo: <span className="exp-logo-text">BBVA</span>,
    color: '#3b82f6',
    current: true,
    roles: [
      {
        title: 'Software Developer',
        type: 'Full-time',
        start: '2024-11',
        summary:
          'Software development for internal banking operations, including AI projects: a virtual assistant built on Google Gemini with DocumentAI for document extraction and validation, and secure APIs for financial data and compliance workflows.',
        highlights: [
          'Built an AI virtual assistant using Google Gemini for natural language understanding',
          'Implemented a DocumentAI pipeline for automated document extraction and validation',
          'Developed secure REST APIs with Flask for sensitive financial data',
          'Worked in an agile team, leading the AI integration strategy and mentoring junior developers',
        ],
        skills: ['Python', 'Flask', 'Google Gemini', 'DocumentAI', 'REST APIs', 'LLMs', 'Agile'],
      },
      {
        title: 'Automation Developer',
        type: 'Internship',
        start: '2023-12',
        end: '2024-11',
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
    ],
  },
  {
    name: 'Personal & University Projects',
    location: 'Web and mobile',
    logo: <FaLaptopCode />,
    color: '#f59e0b',
    roles: [
      {
        title: 'Full Stack Developer',
        type: 'Projects',
        start: '2023-03',
        summary:
          'Full-stack web and mobile apps, from e-commerce platforms to music streaming, with React and Flutter frontends and Spring Boot and Node.js backends.',
        highlights: [
          'E-commerce platform with product search, cart and admin dashboard',
          'Cross-platform music streaming app with React Native and Firebase',
          'REST APIs with Spring Boot, Node.js and MySQL',
        ],
        skills: ['React', 'Flutter', 'TypeScript', 'Spring Boot', 'Node.js', 'MySQL', 'Firebase'],
      },
    ],
  },
];

/* ── Dates ── */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (ym?: string) => {
  if (!ym) return 'Present';
  const [y, m] = ym.split('-').map(Number);
  return m ? `${MONTHS[m - 1]} ${y}` : `${y}`;
};

// Inclusive month count, like LinkedIn. Null when a date has no month.
const monthsBetween = (start: string, end?: string) => {
  const [sy, sm] = start.split('-').map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
  if (!sm || !em) return null;
  return (ey - sy) * 12 + (em - sm) + 1;
};

const formatDuration = (months: number | null) => {
  if (months === null) return '';
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
  return parts.join(' ');
};

const companySpan = (roles: Role[]) => {
  const start = roles.map((r) => r.start).sort()[0];
  const end = roles.some((r) => !r.end) ? undefined : roles.map((r) => r.end as string).sort().reverse()[0];
  return { start, end };
};

const Experience: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visible, setVisible] = useState<boolean[]>(new Array(companies.length).fill(false));
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const options = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

    const headerObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setHeaderVisible(true);
      });
    }, options);
    if (headerRef.current) headerObs.observe(headerRef.current);

    const itemObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = itemsRef.current.indexOf(entry.target as HTMLLIElement);
        if (idx === -1) return;
        setVisible((prev) => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
      });
    }, options);
    itemsRef.current.forEach((el) => {
      if (el) itemObs.observe(el);
    });

    return () => {
      headerObs.disconnect();
      itemObs.disconnect();
    };
  }, []);

  return (
    <section className="exp-section">
      {/* Background */}
      <div className="exp-bg-grid" />
      <div className="exp-bg-orb exp-orb-1" />
      <div className="exp-bg-orb exp-orb-2" />

      {/* Header */}
      <div ref={headerRef} className={`exp-header ${headerVisible ? 'visible' : ''}`}>
        <div className="exp-header-badge">
          <FaBriefcase size={12} />
          Professional Experience
        </div>
        <h2 className="exp-title">
          Where I've <span className="exp-gradient-text">Worked</span>
        </h2>
        <p className="exp-subtitle">
          From automating banking operations to shipping my own developer tools: software development,
          AI projects and language design.
        </p>
      </div>

      {/* Companies */}
      <ol className="exp-list">
        {companies.map((company, index) => {
          const span = companySpan(company.roles);
          const total = formatDuration(monthsBetween(span.start, span.end));

          return (
            <li
              key={company.name}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className={`exp-company ${visible[index] ? 'visible' : ''}`}
              style={{ '--exp-color': company.color, '--exp-index': index } as React.CSSProperties}
            >
              <div className="exp-logo" aria-hidden>
                {company.logo}
              </div>

              <article className="exp-card">
                <header className="exp-company-head">
                  <div>
                    <h3 className="exp-company-name">
                      {company.name}
                      {company.url && (
                        <a
                          href={company.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="exp-company-link"
                          aria-label={`${company.name} website`}
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </h3>
                    <p className="exp-company-meta">
                      <FaMapMarkerAlt aria-hidden />
                      {company.location}
                      {/* With a single role the dates already sit on the role itself */}
                      {company.roles.length > 1 && (
                        <>
                          <span className="exp-meta-sep">·</span>
                          {formatDate(span.start)} – {formatDate(span.end)}
                          {total && (
                            <>
                              <span className="exp-meta-sep">·</span>
                              {total}
                            </>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                  {company.current && (
                    <span className="exp-current">
                      <span className="exp-current-dot" />
                      Current
                    </span>
                  )}
                </header>

                <div className={`exp-roles ${company.roles.length > 1 ? 'exp-roles--multi' : ''}`}>
                  {company.roles.map((role) => {
                    const duration = formatDuration(monthsBetween(role.start, role.end));
                    return (
                      <div key={role.title} className="exp-role">
                        <div className="exp-role-head">
                          <h4 className="exp-role-title">{role.title}</h4>
                          <span className="exp-role-type">{role.type}</span>
                        </div>
                        <p className="exp-role-dates">
                          {formatDate(role.start)} – {formatDate(role.end)}
                          {duration && ` · ${duration}`}
                          {role.link && (
                            <>
                              <span className="exp-meta-sep">·</span>
                              <a
                                href={role.link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="exp-role-link"
                              >
                                {role.link.label} <FaExternalLinkAlt aria-hidden />
                              </a>
                            </>
                          )}
                        </p>
                        <p className="exp-role-summary">{role.summary}</p>
                        <ul className="exp-role-highlights">
                          {role.highlights.map((h) => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                        <div className="exp-skills">
                          {role.skills.map((skill) => (
                            <span key={skill} className="exp-skill">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default Experience;

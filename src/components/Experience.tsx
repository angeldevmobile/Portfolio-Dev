import React, { useRef, useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaBriefcase, FaRocket, FaCode, FaCogs } from 'react-icons/fa';
import frontend from '../assets/front_end.gif';
import backend from '../assets/backend.gif';
import automation from '../assets/automation.gif';
import './css/Experience.css';

interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  date: string;
  type: 'founder' | 'fulltime' | 'intern' | 'freelance';
  description: string;
  highlights: string[];
  skills: string[];
  image: string;
  color: string;
}

/* ── SVG Animated Icons per role ── */
const FounderSVG = () => (
  <svg className="exp-svg-icon" viewBox="0 0 70 70" fill="none">
    <defs>
      <linearGradient id="founderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
      <filter id="founder3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#a855f7" floodOpacity="0.35" />
      </filter>
    </defs>
    {/* Rocket body */}
    <path d="M35 8 L28 35 L35 42 L42 35 Z" fill="url(#founderGrad)" filter="url(#founder3d)" />
    <ellipse cx="35" cy="24" rx="5" ry="8" fill="#0a0a2e" opacity="0.5" />
    <circle cx="35" cy="20" r="3" fill="#ec4899" opacity="0.8" />
    {/* Flames */}
    <path d="M30 40 L35 55 L40 40" fill="#f59e0b" opacity="0.7">
      <animate attributeName="d" values="M30 40 L35 55 L40 40;M31 40 L35 52 L39 40;M30 40 L35 55 L40 40" dur="0.8s" repeatCount="indefinite" />
    </path>
    <path d="M32 42 L35 50 L38 42" fill="#ef4444" opacity="0.6">
      <animate attributeName="d" values="M32 42 L35 50 L38 42;M33 42 L35 48 L37 42;M32 42 L35 50 L38 42" dur="0.6s" repeatCount="indefinite" />
    </path>
    {/* Stars */}
    <circle cx="12" cy="14" r="1.5" fill="#c084fc" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="58" cy="20" r="1" fill="#f9a8d4" opacity="0.4">
      <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="20" cy="50" r="1.5" fill="#818cf8" opacity="0.3">
      <animate attributeName="cy" values="50;46;50" dur="3s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const BackendSVG = () => (
  <svg className="exp-svg-icon" viewBox="0 0 70 70" fill="none">
    <defs>
      <linearGradient id="beExpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <filter id="beExp3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#3b82f6" floodOpacity="0.35" />
      </filter>
    </defs>
    {/* Brain / AI */}
    <circle cx="35" cy="28" r="18" fill="url(#beExpGrad)" filter="url(#beExp3d)" opacity="0.9" />
    <circle cx="35" cy="28" r="12" fill="#0a0a2e" opacity="0.6" />
    {/* Neural connections */}
    <line x1="28" y1="24" x2="24" y2="18" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6" />
    <line x1="42" y1="24" x2="46" y2="18" stroke="#22d3ee" strokeWidth="1.5" opacity="0.6" />
    <line x1="35" y1="20" x2="35" y2="12" stroke="#818cf8" strokeWidth="1.5" opacity="0.6" />
    <circle cx="24" cy="18" r="2.5" fill="#60a5fa" opacity="0.5" />
    <circle cx="46" cy="18" r="2.5" fill="#22d3ee" opacity="0.5" />
    <circle cx="35" cy="12" r="2.5" fill="#818cf8" opacity="0.5" />
    {/* Code brackets */}
    <text x="28" y="32" fill="#60a5fa" fontSize="12" fontWeight="bold" opacity="0.8">{'<'}</text>
    <text x="38" y="32" fill="#22d3ee" fontSize="12" fontWeight="bold" opacity="0.8">{'/>'}</text>
    {/* Data flow */}
    <rect x="22" y="50" width="26" height="3" rx="1.5" fill="url(#beExpGrad)" opacity="0.4" />
    <rect x="28" y="55" width="14" height="3" rx="1.5" fill="url(#beExpGrad)" opacity="0.3" />
    <circle cx="12" cy="40" r="1" fill="#60a5fa" opacity="0.3">
      <animate attributeName="cy" values="40;36;40" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="58" cy="45" r="1.5" fill="#22d3ee" opacity="0.4">
      <animate attributeName="cy" values="45;41;45" dur="3s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const AutomationSVG = () => (
  <svg className="exp-svg-icon" viewBox="0 0 70 70" fill="none">
    <defs>
      <linearGradient id="autoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <filter id="auto3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#22c55e" floodOpacity="0.35" />
      </filter>
    </defs>
    {/* Gear 1 */}
    <circle cx="28" cy="26" r="12" fill="url(#autoGrad)" filter="url(#auto3d)" opacity="0.9">
      <animateTransform attributeName="transform" type="rotate" from="0 28 26" to="360 28 26" dur="8s" repeatCount="indefinite" />
    </circle>
    <circle cx="28" cy="26" r="6" fill="#0a0a2e" opacity="0.7" />
    {/* Gear 2 */}
    <circle cx="46" cy="40" r="9" fill="url(#autoGrad)" filter="url(#auto3d)" opacity="0.7">
      <animateTransform attributeName="transform" type="rotate" from="360 46 40" to="0 46 40" dur="6s" repeatCount="indefinite" />
    </circle>
    <circle cx="46" cy="40" r="4.5" fill="#0a0a2e" opacity="0.7" />
    {/* Gear teeth (simplified) */}
    <rect x="25" y="12" width="6" height="3" rx="1" fill="url(#autoGrad)" opacity="0.5">
      <animateTransform attributeName="transform" type="rotate" from="0 28 26" to="360 28 26" dur="8s" repeatCount="indefinite" />
    </rect>
    {/* Arrow / flow */}
    <path d="M16 52 L30 52 L28 48 L36 54 L28 60 L30 56 L16 56 Z" fill="#34d399" opacity="0.5" />
    <circle cx="10" cy="18" r="1" fill="#34d399" opacity="0.4">
      <animate attributeName="cy" values="18;14;18" dur="2.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="60" cy="22" r="1.5" fill="#22d3ee" opacity="0.3">
      <animate attributeName="cy" values="22;18;22" dur="3.2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const FrontendSVG = () => (
  <svg className="exp-svg-icon" viewBox="0 0 70 70" fill="none">
    <defs>
      <linearGradient id="feExpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
      <filter id="feExp3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.35" />
      </filter>
    </defs>
    {/* Monitor */}
    <rect x="10" y="10" width="50" height="35" rx="4" fill="url(#feExpGrad)" filter="url(#feExp3d)" opacity="0.9" />
    <rect x="14" y="14" width="42" height="25" rx="2" fill="#0a0a2e" opacity="0.8" />
    {/* UI Elements */}
    <rect x="18" y="18" width="18" height="3" rx="1" fill="#fbbf24" opacity="0.6" />
    <rect x="18" y="24" width="12" height="2" rx="1" fill="#f87171" opacity="0.5" />
    <rect x="18" y="29" width="16" height="2" rx="1" fill="#fbbf24" opacity="0.4" />
    <rect x="40" y="18" width="12" height="16" rx="2" fill="#f59e0b" opacity="0.2" />
    {/* Stand */}
    <rect x="28" y="45" width="14" height="3" rx="1" fill="#78716c" opacity="0.5" />
    <rect x="24" y="48" width="22" height="3" rx="1.5" fill="#78716c" opacity="0.4" />
    <circle cx="8" cy="50" r="1" fill="#fbbf24" opacity="0.3">
      <animate attributeName="cy" values="50;46;50" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="62" cy="12" r="1.5" fill="#f87171" opacity="0.4">
      <animate attributeName="cy" values="12;8;12" dur="3s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const svgMap: Record<string, React.ReactNode> = {
  founder: <FounderSVG />,
  backend: <BackendSVG />,
  automation: <AutomationSVG />,
  frontend: <FrontendSVG />,
};

const typeLabels: Record<string, string> = {
  founder: 'Founder & Lead',
  fulltime: 'Full-time',
  intern: 'Internship',
  freelance: 'Freelance',
};

const typeIcons: Record<string, React.ReactNode> = {
  founder: <FaRocket size={12} />,
  fulltime: <FaBriefcase size={12} />,
  intern: <FaCogs size={12} />,
  freelance: <FaCode size={12} />,
};

const experiences: ExperienceItem[] = [
  {
    role: 'Founder & Lead Developer',
    company: 'Orion AI',
    date: 'September 2025 – Present',
    type: 'founder',
    description:
      'Founded and lead the development of Orion AI — an AI-powered platform integrating multiple LLM models (GPT-4, Claude, Gemini) with automation tools and intelligent workflows. Also designing the Orion programming language, a modern interpreted language with clean syntax and built-in concurrency.',
    highlights: [
      'Architected full-stack platform with React, TypeScript, Node.js, and PostgreSQL',
      'Integrated OpenAI, Anthropic Claude, and Google Gemini APIs for multi-model AI orchestration',
      'Designed & built Orion Language interpreter using Python, ANTLR4, and custom bytecode VM',
      'Led product vision, technical architecture, and development roadmap',
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'OpenAI', 'Claude', 'ANTLR4', 'Python', 'Docker'],
    image: backend,
    color: '#a855f7',
  },
  {
    role: 'Backend Developer — AI Engineer',
    company: 'BBVA Perú',
    companyUrl: 'https://www.bbva.pe/',
    date: 'January 2024 – Active',
    type: 'fulltime',
    description:
      'Developed an AI-powered virtual assistant for internal banking operations, integrating Google Gemini LLM with DocumentAI for intelligent document extraction and validation. Built secure APIs for financial data processing and compliance workflows.',
    highlights: [
      'Built AI virtual assistant using Google Gemini for natural language understanding',
      'Implemented DocumentAI pipeline for automated document extraction & validation',
      'Developed secure REST APIs handling sensitive financial data with Flask',
      'Collaborated in agile team; led AI integration strategy and mentored junior developers',
    ],
    skills: ['Python', 'Flask', 'Google Gemini', 'DocumentAI', 'REST APIs', 'JavaScript', 'Bootstrap', 'LLMs', 'Agile'],
    image: backend,
    color: '#3b82f6',
  },
  {
    role: 'Automation Developer',
    company: 'BBVA Perú',
    companyUrl: 'https://www.bbva.pe/',
    date: 'December 2023 – 2024',
    type: 'intern',
    description:
      'Designed and implemented enterprise automation solutions for banking operations, reducing manual workload by 60%. Built data dashboards, automated reporting pipelines, and email notification systems for real-time KPI tracking.',
    highlights: [
      'Automated repetitive banking tasks, saving 100+ work hours per month',
      'Built interactive dashboards for data visualization and KPI monitoring',
      'Created automated report extraction pipelines from legacy terminals to Excel/Sheets',
      'Developed automated email notification systems with App Script and Python',
    ],
    skills: ['Python', 'AutoHotkey', 'VBA', 'App Script', 'Excel', 'Google Sheets', 'Dashboards', 'KPIs'],
    image: automation,
    color: '#22c55e',
  },
  {
    role: 'Full Stack Developer',
    company: 'Personal & University Projects',
    date: 'March 2023 – Active',
    type: 'freelance',
    description:
      'Built multiple full-stack web applications including e-commerce platforms, music streaming apps, and portfolio websites. Developed both frontend interfaces with React/Flutter and backend APIs with Spring Boot and Node.js.',
    highlights: [
      'Built e-commerce platform with product search, cart system, and admin dashboard',
      'Developed cross-platform music streaming app with React Native and Firebase',
      'Created responsive web interfaces using React, Tailwind CSS, and TypeScript',
      'Designed and implemented REST APIs with Spring Boot, Node.js, and MySQL',
    ],
    skills: ['React', 'Flutter', 'TypeScript', 'Spring Boot', 'Node.js', 'MySQL', 'Firebase', 'Tailwind', 'Figma'],
    image: frontend,
    color: '#f59e0b',
  },
];

const Experience: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(experiences.length).fill(false));
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const options = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

    const headerObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setHeaderVisible(true);
      });
    }, options);

    if (headerRef.current) headerObs.observe(headerRef.current);

    const cardObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = cardsRef.current.indexOf(entry.target as HTMLDivElement);
          if (idx !== -1) {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }, idx * 180);
          }
        }
      });
    }, options);

    cardsRef.current.forEach((c) => {
      if (c) cardObs.observe(c);
    });

    return () => {
      headerObs.disconnect();
      cardObs.disconnect();
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
          From founding an AI startup to building enterprise banking solutions — my journey across full-stack development, AI engineering, and automation.
        </p>
      </div>

      {/* Timeline */}
      <div className="exp-timeline">
        <div className="exp-timeline-line" />

        {experiences.map((exp, index) => (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className={`exp-card-wrapper ${index % 2 === 0 ? 'left' : 'right'} ${visibleCards[index] ? 'visible' : ''}`}
            style={{ '--exp-index': index, '--exp-color': exp.color } as React.CSSProperties}
          >
            {/* Timeline node */}
            <div className="exp-timeline-node">
              <div className="exp-node-inner">
                {typeIcons[exp.type]}
              </div>
              <div className="exp-node-ping" />
            </div>

            {/* Card */}
            <div
              className={`exp-card ${expandedIdx === index ? 'expanded' : ''}`}
              onClick={() => setExpandedIdx(expandedIdx === index ? null : index)}
            >
              <div className="exp-card-glow" />
              <div className="exp-card-inner">
                {/* SVG */}
                <div className="exp-card-svg">
                  {svgMap[exp.type === 'founder' ? 'founder' : exp.type === 'fulltime' ? 'backend' : exp.type === 'intern' ? 'automation' : 'frontend']}
                </div>

                {/* Image */}
                <div className="exp-card-image">
                  <img src={exp.image} alt={exp.role} />
                  <div className="exp-image-overlay" />
                </div>

                {/* Header row */}
                <div className="exp-card-header">
                  <div className="exp-card-meta">
                    <span className="exp-card-type" style={{ '--type-color': exp.color } as React.CSSProperties}>
                      {typeIcons[exp.type]}
                      {typeLabels[exp.type]}
                    </span>
                    <span className="exp-card-date">{exp.date}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="exp-card-role">{exp.role}</h3>
                <div className="exp-card-company-row">
                  <span className="exp-card-company">{exp.company}</span>
                  {exp.companyUrl && (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="exp-company-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                </div>

                <p className="exp-card-description">{exp.description}</p>

                {/* Highlights */}
                <div className={`exp-highlights ${expandedIdx === index ? 'show' : ''}`}>
                  <div className="exp-highlights-label">Key Achievements</div>
                  <ul className="exp-highlights-list">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="exp-highlight-item">
                        <span className="exp-highlight-dot" style={{ background: exp.color }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div className="exp-skills-row">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="exp-skill-tag"
                      style={{ '--tag-color': exp.color } as React.CSSProperties}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Expand hint */}
                <div className="exp-expand-hint">
                  {expandedIdx === index ? 'Click to collapse' : 'Click for details'}
                  <span className={`exp-expand-arrow ${expandedIdx === index ? 'rotated' : ''}`}>›</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;

import React, { useRef, useState, useEffect } from 'react';
import logo1 from '../assets/OIP.jpeg';
import logo2 from '../assets/oci_ai_1.png';
import logo3 from '../assets/ibm_cert.png';
import logo4 from '../assets/intro_CISCO.png';
import { FaExternalLinkAlt, FaGraduationCap, FaCertificate } from 'react-icons/fa';
import './css/Study.css';

interface Education {
  title: string;
  institution: string;
  subtitle: string;
  date: string;
  grade: string;
  description: string;
  logo: string;
  url: string;
  type: 'university' | 'certification';
  color: string;
  skills?: string[];
}

/* ── SVG Animated Icons ── */
const UniversitySVG = () => (
  <svg className="edu-svg-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="uniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <filter id="uni3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#a855f7" floodOpacity="0.4" />
      </filter>
    </defs>
    {/* Building */}
    <polygon points="40,8 12,28 68,28" fill="url(#uniGrad)" filter="url(#uni3d)" />
    <rect x="16" y="28" width="48" height="36" rx="2" fill="url(#uniGrad)" filter="url(#uni3d)" opacity="0.9" />
    {/* Pillars */}
    <rect x="22" y="32" width="5" height="28" rx="1" fill="#1e1b4b" opacity="0.6" />
    <rect x="33" y="32" width="5" height="28" rx="1" fill="#1e1b4b" opacity="0.6" />
    <rect x="43" y="32" width="5" height="28" rx="1" fill="#1e1b4b" opacity="0.6" />
    <rect x="53" y="32" width="5" height="28" rx="1" fill="#1e1b4b" opacity="0.6" />
    {/* Door */}
    <rect x="35" y="48" width="10" height="16" rx="5" fill="#1e1b4b" opacity="0.8" />
    {/* Base */}
    <rect x="10" y="64" width="60" height="4" rx="2" fill="#7c3aed" opacity="0.5" />
    {/* Floating particles */}
    <circle cx="8" cy="18" r="1.5" fill="#c084fc" opacity="0.5">
      <animate attributeName="cy" values="18;12;18" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="72" cy="22" r="2" fill="#818cf8" opacity="0.4">
      <animate attributeName="cy" values="22;16;22" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="40" cy="4" r="1" fill="#e879f9" opacity="0.6">
      <animate attributeName="cy" values="4;1;4" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const CertSVG = ({ color1, color2 }: { color1: string; color2: string }) => (
  <svg className="edu-svg-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`certGrad-${color1.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color1} />
        <stop offset="100%" stopColor={color2} />
      </linearGradient>
      <filter id={`cert3d-${color1.replace('#', '')}`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor={color1} floodOpacity="0.35" />
      </filter>
    </defs>
    {/* Certificate body */}
    <rect x="12" y="14" width="56" height="42" rx="6" fill={`url(#certGrad-${color1.replace('#', '')})`} filter={`url(#cert3d-${color1.replace('#', '')})`} />
    <rect x="18" y="20" width="44" height="30" rx="3" fill="#0f0f2e" opacity="0.7" />
    {/* Lines */}
    <rect x="24" y="26" width="32" height="2" rx="1" fill={color1} opacity="0.5" />
    <rect x="24" y="32" width="24" height="2" rx="1" fill={color2} opacity="0.4" />
    <rect x="24" y="38" width="28" height="2" rx="1" fill={color1} opacity="0.3" />
    {/* Seal */}
    <circle cx="50" cy="55" r="10" fill={`url(#certGrad-${color1.replace('#', '')})`} filter={`url(#cert3d-${color1.replace('#', '')})`} />
    <circle cx="50" cy="55" r="6" fill="#0f0f2e" opacity="0.6" />
    <text x="50" y="58" textAnchor="middle" fill={color1} fontSize="7" fontWeight="bold">✓</text>
    {/* Ribbon */}
    <path d="M44 62 L47 72 L50 66 L53 72 L56 62" fill={color2} opacity="0.7" />
    {/* Particles */}
    <circle cx="8" cy="20" r="1.5" fill={color1} opacity="0.4">
      <animate attributeName="cy" values="20;14;20" dur="2.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="72" cy="40" r="1" fill={color2} opacity="0.5">
      <animate attributeName="cy" values="40;35;40" dur="3.2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const educationData: Education[] = [
  {
    title: 'Universidad Tecnológica del Perú',
    institution: 'Lima, Perú',
    subtitle: 'Systems & Computer Engineering',
    date: 'March 2020 – 2024',
    grade: '80%',
    description:
      'Completed 10th semester of Systems and Computer Engineering. Gained expertise in software architecture, algorithms, databases, and cloud computing while pursuing IBM Data Science certification.',
    logo: logo1,
    url: 'https://www.utp.edu.pe/web/',
    type: 'university',
    color: '#a855f7',
    skills: ['Software Engineering', 'Algorithms', 'Databases', 'Cloud Computing'],
  },
  {
    title: 'Oracle Cloud Infrastructure',
    institution: 'Oracle University',
    subtitle: 'Associate Cloud Foundations',
    date: 'Oct 2023 – Oct 2025',
    grade: '90%',
    description:
      'Cloud Infrastructure Associate certification covering database management, networking, security, and designing scalable cloud solutions with optimal performance.',
    logo: logo2,
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=8863ADAE540F09DCABC0A61AA55654831F4DD0AFAE1C21F5F888268DDD2EE879',
    type: 'certification',
    color: '#ef4444',
    skills: ['OCI', 'Networking', 'Security', 'Database', 'Cloud Architecture'],
  },
  {
    title: 'IBM Python for Data Science & AI',
    institution: 'IBM via Coursera',
    subtitle: 'Data Science & AI Professional',
    date: 'Aug 2024 – Present',
    grade: '90%',
    description:
      'Professional certification covering Python, data analysis, AI/ML fundamentals, Jupyter Notebooks, Pandas, NumPy, Matplotlib, and DocumentAI for enterprise solutions.',
    logo: logo3,
    url: 'https://coursera.org/share/cfcc034c2208e294640bbb82ede99f6d',
    type: 'certification',
    color: '#3b82f6',
    skills: ['Python', 'Pandas', 'NumPy', 'ML', 'Jupyter', 'DocumentAI'],
  },
  {
    title: 'Cisco Introduction to Data Science',
    institution: 'Cisco Networking Academy',
    subtitle: 'Data Science Foundations',
    date: 'Aug 2024 – Sep 2024',
    grade: '90%',
    description:
      'Foundational certification in data collection, AI, and machine learning with practical hands-on labs covering data engineering and analysis methodologies.',
    logo: logo4,
    url: 'https://www.credly.com/earner/dashboard',
    type: 'certification',
    color: '#06b6d4',
    skills: ['Data Collection', 'AI Basics', 'Machine Learning', 'Data Engineering'],
  },
];

const certColors: Record<string, [string, string]> = {
  '#ef4444': ['#ef4444', '#f97316'],
  '#3b82f6': ['#3b82f6', '#6366f1'],
  '#06b6d4': ['#06b6d4', '#22d3ee'],
};

const Study = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(educationData.length).fill(false));
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const options = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      });
    }, options);

    if (headerRef.current) headerObserver.observe(headerRef.current);

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardsRef.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }, index * 180);
          }
        }
      });
    }, options);

    cardsRef.current.forEach((card) => {
      if (card) cardObserver.observe(card);
    });

    return () => {
      headerObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section className="study-section">
      {/* Animated background */}
      <div className="study-bg-grid" />
      <div className="study-bg-orb study-bg-orb-1" />
      <div className="study-bg-orb study-bg-orb-2" />

      {/* Header */}
      <div ref={headerRef} className={`study-header ${headerVisible ? 'visible' : ''}`}>
        <div className="study-header-badge">
          <FaGraduationCap size={12} />
          Education & Certifications
        </div>
        <h2 className="study-title">
          My Learning <span className="study-gradient-text">Journey</span>
        </h2>
        <p className="study-subtitle">
          A continuous path of growth through formal education and industry-recognized certifications that shape my expertise.
        </p>
      </div>

      {/* Timeline */}
      <div className="study-timeline">
        <div className="timeline-line" />

        {educationData.map((edu, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            className={`study-card-wrapper ${index % 2 === 0 ? 'left' : 'right'} ${visibleCards[index] ? 'visible' : ''}`}
            style={{ '--card-index': index, '--card-color': edu.color } as React.CSSProperties}
          >
            {/* Timeline node */}
            <div className="timeline-node">
              <div className="timeline-node-inner">
                {edu.type === 'university' ? (
                  <FaGraduationCap size={14} />
                ) : (
                  <FaCertificate size={14} />
                )}
              </div>
              <div className="timeline-node-ping" />
            </div>

            {/* Card */}
            <a href={edu.url} target="_blank" rel="noopener noreferrer" className="study-card">
              <div className="study-card-glow" />
              <div className="study-card-inner">
                {/* SVG Icon */}
                <div className="study-card-svg">
                  {edu.type === 'university' ? (
                    <UniversitySVG />
                  ) : (
                    <CertSVG
                      color1={certColors[edu.color]?.[0] || edu.color}
                      color2={certColors[edu.color]?.[1] || edu.color}
                    />
                  )}
                </div>

                {/* Header row */}
                <div className="study-card-header">
                  <img src={edu.logo} alt={edu.title} className="study-card-logo" />
                  <div className="study-card-meta">
                    <span
                      className="study-card-type"
                      style={{ '--type-color': edu.color } as React.CSSProperties}
                    >
                      {edu.type === 'university' ? 'University' : 'Certification'}
                    </span>
                    <span className="study-card-date">{edu.date}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="study-card-title">{edu.title}</h3>
                <p className="study-card-institution">{edu.institution}</p>
                <p className="study-card-subtitle">{edu.subtitle}</p>

                {/* Grade bar */}
                <div className="study-grade-wrapper">
                  <div className="study-grade-label">
                    <span>Grade</span>
                    <span className="study-grade-value">{edu.grade}</span>
                  </div>
                  <div className="study-grade-bar">
                    <div
                      className="study-grade-fill"
                      style={{
                        width: visibleCards[index] ? edu.grade : '0%',
                        background: `linear-gradient(90deg, ${edu.color}, ${edu.color}aa)`,
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="study-card-description">{edu.description}</p>

                {/* Skills */}
                {edu.skills && (
                  <div className="study-skills-row">
                    {edu.skills.map((skill) => (
                      <span
                        key={skill}
                        className="study-skill-tag"
                        style={{ '--tag-color': edu.color } as React.CSSProperties}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="study-card-footer">
                  <span className="study-view-link">
                    View Credential <FaExternalLinkAlt size={10} />
                  </span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Study;

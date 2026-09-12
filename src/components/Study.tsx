import React from 'react';
import utpLogo from '../assets/OIP.jpeg';
import oracleLogo from '../assets/oci_ai_1.png';
import ibmLogo from '../assets/ibm_cert.png';
import ciscoLogo from '../assets/intro_CISCO.png';
import { FaExternalLinkAlt, FaGraduationCap } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import './css/Study.css';

const degree = {
  level: "Bachelor's degree",
  title: 'Systems & Computer Engineering',
  school: 'Universidad Tecnológica del Perú',
  location: 'Lima, Perú',
  period: '2019 – 2025',
  status: 'Graduated',
  summary: 'Ten semesters covering software architecture, algorithms, databases and cloud computing.',
  skills: ['Software Engineering', 'Algorithms', 'Databases', 'Cloud Computing'],
  logo: utpLogo,
  url: 'https://www.utp.edu.pe/web/',
  urlLabel: 'utp.edu.pe',
  color: '#a855f7',
};

interface Certification {
  name: string;
  issuer: string;
  detail?: string; // e.g. "Professional Certificate · 8 courses"
  logo?: string; // image asset
  icon?: React.ReactNode; // used when there's no image asset for the issuer
  color: string;
  skills: string[];
  url?: string; // public, verifiable credential; omit rather than link to a private page
}

const certifications: Certification[] = [
  {
    name: 'Google Data Analytics',
    issuer: 'Google · Coursera',
    detail: 'Professional Certificate · 8 courses',
    icon: <FcGoogle />,
    color: '#34a853',
    skills: ['SQL', 'Spreadsheets', 'Tableau', 'R', 'Data Visualization'],
    url: 'https://coursera.org/verify/professional-cert/NB0L73B6KQ84',
  },
  {
    name: 'IBM Mainframe Developer',
    issuer: 'IBM & LearnQuest · Coursera',
    detail: 'Professional Certificate · 7 courses',
    logo: ibmLogo,
    color: '#6366f1',
    skills: ['COBOL', 'IBM Z', 'Enterprise Computing', 'SDLC', 'Testing & Debugging'],
    url: 'https://coursera.org/verify/professional-cert/ER0D3LXLFV5A',
  },
  {
    name: 'Oracle Cloud Infrastructure Foundations Associate',
    issuer: 'Oracle University',
    logo: oracleLogo,
    color: '#ef4444',
    skills: ['OCI', 'Networking', 'Security', 'Cloud Architecture'],
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=8863ADAE540F09DCABC0A61AA55654831F4DD0AFAE1C21F5F888268DDD2EE879',
  },
  {
    name: 'Python for Data Science & AI',
    issuer: 'IBM · Coursera',
    logo: ibmLogo,
    color: '#3b82f6',
    skills: ['Python', 'Pandas', 'NumPy', 'Jupyter'],
    url: 'https://coursera.org/share/cfcc034c2208e294640bbb82ede99f6d',
  },
  {
    name: 'Introduction to Data Science',
    issuer: 'Cisco Networking Academy',
    logo: ciscoLogo,
    color: '#06b6d4',
    skills: ['Data Collection', 'AI Basics', 'Machine Learning', 'Data Engineering'],
  },
];

const Study = () => (
  <section className="study-section">
    {/* Background */}
    <div className="study-bg-grid" />
    <div className="study-bg-orb study-bg-orb-1" />
    <div className="study-bg-orb study-bg-orb-2" />

    {/* Header */}
    <div className="study-header">
      <div className="study-header-badge">
        <FaGraduationCap size={12} />
        Education &amp; Certifications
      </div>
      <h2 className="study-title">
        My Learning <span className="study-gradient-text">Journey</span>
      </h2>
      <p className="study-subtitle">
        A bachelor's degree in Systems &amp; Computer Engineering, plus certifications in data
        analytics, cloud and mainframe development.
      </p>
    </div>

    {/* Degree */}
    <article className="edu-degree" style={{ '--edu-color': degree.color } as React.CSSProperties}>
      <div className="edu-logo">
        <img src={degree.logo} alt={degree.school} />
      </div>

      <div className="edu-degree-body">
        <span className="edu-kicker">{degree.level}</span>
        <h3 className="edu-degree-title">{degree.title}</h3>
        <p className="edu-degree-school">
          {degree.school} <span>· {degree.location}</span>
        </p>
        <p className="edu-degree-desc">{degree.summary}</p>
        <div className="edu-skills">
          {degree.skills.map((skill) => (
            <span key={skill} className="edu-skill">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="edu-degree-aside">
        <span className="edu-period">{degree.period}</span>
        <span className="edu-status edu-status--done">{degree.status}</span>
        <a href={degree.url} target="_blank" rel="noopener noreferrer" className="edu-link">
          {degree.urlLabel} <FaExternalLinkAlt aria-hidden />
        </a>
      </div>
    </article>

    {/* Certifications */}
    <div className="edu-certs-block">
      <div className="edu-certs-head">
        <h3 className="edu-certs-title">Certifications</h3>
        <span className="edu-certs-count">{certifications.length}</span>
      </div>

      <div className="edu-certs">
        {certifications.map((cert) => (
          <article
            key={cert.name}
            className="edu-cert"
            style={{ '--edu-color': cert.color } as React.CSSProperties}
          >
            <div className="edu-cert-top">
              <div className="edu-logo" role="img" aria-label={cert.issuer}>
                {cert.logo ? <img src={cert.logo} alt="" /> : cert.icon}
              </div>
            </div>

            <h4 className="edu-cert-name">{cert.name}</h4>
            <p className="edu-cert-issuer">{cert.issuer}</p>
            {cert.detail && <p className="edu-cert-detail">{cert.detail}</p>}

            <div className="edu-skills">
              {cert.skills.map((skill) => (
                <span key={skill} className="edu-skill">
                  {skill}
                </span>
              ))}
            </div>

            {cert.url && (
              <div className="edu-cert-foot">
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="edu-link">
                  Verify credential <FaExternalLinkAlt aria-hidden />
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Study;

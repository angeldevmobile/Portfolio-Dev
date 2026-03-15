import React, { useState, useEffect, useRef } from "react";
import "./css/Projects.css";
import Imagen1 from "../assets/ux_ui.png";
import Imagen2 from "../assets/web.png";
import Imagen3 from "../assets/asistente_ia.png";
import imagen4 from "../assets/orion.png";
import colaborator1 from "../assets/platform.png";
import colaborator2 from "../assets/perfil-github.png";
import { FaLinkedin, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface Projects {
  title: string;
  date: string;
  description: string;
  image: string;
  collaborators: string[];
  technologies?: string[];
  icon?: React.ReactNode;
  members?: {
    name: string;
    photo: string;
    github?: string;
    linkedin?: string;
  }[];
  codeUrl?: string;
  liveUrl?: string;
  status?: string;
  statusColor?: string;
  category?: string;
}

/* ── SVG 3D Icons ── */
const MobileIcon = () => (
  <svg className="project-svg-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mobileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <filter id="mobile3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="6" stdDeviation="4" floodColor="#6366f1" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="20" y="8" width="40" height="64" rx="8" fill="url(#mobileGrad)" filter="url(#mobile3d)" />
    <rect x="26" y="16" width="28" height="40" rx="3" fill="#1e1b4b" opacity="0.8" />
    <circle cx="40" cy="64" r="3" fill="#c4b5fd" />
    <circle cx="14" cy="20" r="2" fill="#818cf8" opacity="0.6">
      <animate attributeName="cy" values="20;14;20" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="66" cy="50" r="1.5" fill="#c084fc" opacity="0.5">
      <animate attributeName="cy" values="50;44;50" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="12" cy="55" r="1" fill="#a78bfa" opacity="0.4">
      <animate attributeName="cy" values="55;50;55" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const WebIcon = () => (
  <svg className="project-svg-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <filter id="web3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="6" stdDeviation="4" floodColor="#3b82f6" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="8" y="14" width="64" height="44" rx="6" fill="url(#webGrad)" filter="url(#web3d)" />
    <rect x="14" y="20" width="52" height="30" rx="2" fill="#0c1445" opacity="0.8" />
    <circle cx="18" cy="17" r="1.5" fill="#ef4444" />
    <circle cx="24" cy="17" r="1.5" fill="#eab308" />
    <circle cx="30" cy="17" r="1.5" fill="#22c55e" />
    <rect x="20" y="26" width="20" height="2" rx="1" fill="#38bdf8" opacity="0.7" />
    <rect x="20" y="32" width="30" height="2" rx="1" fill="#818cf8" opacity="0.5" />
    <rect x="20" y="38" width="15" height="2" rx="1" fill="#34d399" opacity="0.6" />
    <rect x="34" y="58" width="12" height="4" rx="1" fill="#64748b" />
    <rect x="28" y="62" width="24" height="3" rx="1.5" fill="#475569" />
    <circle cx="68" cy="12" r="2" fill="#38bdf8" opacity="0.5">
      <animate attributeName="cy" values="12;6;12" dur="2.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="6" cy="40" r="1.5" fill="#818cf8" opacity="0.4">
      <animate attributeName="cy" values="40;34;40" dur="3.2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const AIIcon = () => (
  <svg className="project-svg-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <filter id="ai3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="6" stdDeviation="4" floodColor="#f43f5e" floodOpacity="0.4" />
      </filter>
    </defs>
    <circle cx="40" cy="36" r="22" fill="url(#aiGrad)" filter="url(#ai3d)" />
    <circle cx="40" cy="36" r="5" fill="#1e1b4b" opacity="0.8" />
    <circle cx="30" cy="28" r="3" fill="#fbbf24" opacity="0.7" />
    <circle cx="50" cy="28" r="3" fill="#fbbf24" opacity="0.7" />
    <circle cx="34" cy="44" r="3" fill="#fbbf24" opacity="0.7" />
    <circle cx="46" cy="44" r="3" fill="#fbbf24" opacity="0.7" />
    <line x1="40" y1="36" x2="30" y2="28" stroke="#fde68a" strokeWidth="1" opacity="0.5" />
    <line x1="40" y1="36" x2="50" y2="28" stroke="#fde68a" strokeWidth="1" opacity="0.5" />
    <line x1="40" y1="36" x2="34" y2="44" stroke="#fde68a" strokeWidth="1" opacity="0.5" />
    <line x1="40" y1="36" x2="46" y2="44" stroke="#fde68a" strokeWidth="1" opacity="0.5" />
    <circle cx="40" cy="36" r="26" fill="none" stroke="#f43f5e" strokeWidth="1" opacity="0.3">
      <animate attributeName="r" values="22;30;22" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="40" cy="36" r="22" fill="none" stroke="#f97316" strokeWidth="0.5" opacity="0.2">
      <animate attributeName="r" values="22;34;22" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
    </circle>
    <text x="40" y="68" textAnchor="middle" fill="#f9a8d4" fontSize="8" fontWeight="bold" fontFamily="monospace">AI</text>
    <circle cx="10" cy="20" r="1.5" fill="#fb923c" opacity="0.5">
      <animate attributeName="cy" values="20;14;20" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="70" cy="50" r="2" fill="#f472b6" opacity="0.4">
      <animate attributeName="cy" values="50;44;50" dur="3s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const OrionPlatformIcon = () => (
  <svg className="project-svg-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="orionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <filter id="orion3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="6" stdDeviation="4" floodColor="#8b5cf6" floodOpacity="0.4" />
      </filter>
    </defs>
    {/* Constellation / Star shape */}
    <polygon points="40,6 46,28 68,28 50,40 56,62 40,48 24,62 30,40 12,28 34,28" fill="url(#orionGrad)" filter="url(#orion3d)" />
    <circle cx="40" cy="34" r="6" fill="#0f172a" opacity="0.8" />
    <circle cx="40" cy="34" r="3" fill="#c4b5fd" opacity="0.9">
      <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
    </circle>
    {/* Orbiting dots */}
    <circle cx="40" cy="14" r="2" fill="#22d3ee" opacity="0.7">
      <animateTransform attributeName="transform" type="rotate" values="0 40 34;360 40 34" dur="6s" repeatCount="indefinite" />
    </circle>
    <circle cx="58" cy="46" r="1.5" fill="#a78bfa" opacity="0.6">
      <animateTransform attributeName="transform" type="rotate" values="120 40 34;480 40 34" dur="6s" repeatCount="indefinite" />
    </circle>
    <circle cx="22" cy="46" r="1.5" fill="#67e8f9" opacity="0.5">
      <animateTransform attributeName="transform" type="rotate" values="240 40 34;600 40 34" dur="6s" repeatCount="indefinite" />
    </circle>
    {/* Glow ring */}
    <circle cx="40" cy="34" r="28" fill="none" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.2">
      <animate attributeName="r" values="28;34;28" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
    </circle>
    <text x="40" y="76" textAnchor="middle" fill="#a78bfa" fontSize="6" fontWeight="bold" fontFamily="monospace">ORION</text>
  </svg>
);

const LanguageIcon = () => (
  <svg className="project-svg-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="langGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <filter id="lang3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="6" stdDeviation="4" floodColor="#eab308" floodOpacity="0.4" />
      </filter>
    </defs>
    {/* Terminal/Code block */}
    <rect x="10" y="12" width="60" height="48" rx="8" fill="url(#langGrad)" filter="url(#lang3d)" />
    <rect x="14" y="20" width="52" height="36" rx="4" fill="#1c1917" opacity="0.9" />
    {/* Terminal dots */}
    <circle cx="20" cy="16" r="1.5" fill="#ef4444" />
    <circle cx="26" cy="16" r="1.5" fill="#eab308" />
    <circle cx="32" cy="16" r="1.5" fill="#22c55e" />
    {/* Code lines typing effect */}
    <rect x="20" y="26" width="16" height="2" rx="1" fill="#fbbf24" opacity="0.8">
      <animate attributeName="width" values="0;16;16" dur="2s" repeatCount="indefinite" />
    </rect>
    <rect x="38" y="26" width="12" height="2" rx="1" fill="#34d399" opacity="0.6">
      <animate attributeName="width" values="0;12;12" dur="2s" begin="0.3s" repeatCount="indefinite" />
    </rect>
    <rect x="20" y="32" width="24" height="2" rx="1" fill="#818cf8" opacity="0.7">
      <animate attributeName="width" values="0;24;24" dur="2s" begin="0.6s" repeatCount="indefinite" />
    </rect>
    <rect x="20" y="38" width="8" height="2" rx="1" fill="#fb923c" opacity="0.7">
      <animate attributeName="width" values="0;8;8" dur="2s" begin="0.9s" repeatCount="indefinite" />
    </rect>
    <rect x="30" y="38" width="20" height="2" rx="1" fill="#f472b6" opacity="0.5">
      <animate attributeName="width" values="0;20;20" dur="2s" begin="1.2s" repeatCount="indefinite" />
    </rect>
    {/* Cursor blink */}
    <rect x="20" y="44" width="2" height="8" rx="1" fill="#fbbf24">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
    </rect>
    {/* Lightning bolt */}
    <polygon points="62,4 56,18 64,18 54,34 60,22 52,22" fill="#fde68a" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.3;0.6" dur="1.5s" repeatCount="indefinite" />
    </polygon>
    <text x="40" y="72" textAnchor="middle" fill="#fbbf24" fontSize="7" fontWeight="bold" fontFamily="monospace">{"</>"}
    </text>
  </svg>
);

const MusicIcon = () => (
  <svg className="project-svg-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="musicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <filter id="music3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="6" stdDeviation="4" floodColor="#10b981" floodOpacity="0.4" />
      </filter>
    </defs>
    {/* Disc */}
    <circle cx="40" cy="38" r="24" fill="url(#musicGrad)" filter="url(#music3d)" />
    <circle cx="40" cy="38" r="16" fill="#0f172a" opacity="0.6" />
    <circle cx="40" cy="38" r="8" fill="#1e293b" opacity="0.8" />
    <circle cx="40" cy="38" r="3" fill="#34d399" opacity="0.9" />
    {/* Spinning grooves */}
    <circle cx="40" cy="38" r="20" fill="none" stroke="#34d399" strokeWidth="0.5" opacity="0.3">
      <animateTransform attributeName="transform" type="rotate" values="0 40 38;360 40 38" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="40" cy="38" r="12" fill="none" stroke="#5eead4" strokeWidth="0.5" opacity="0.2" strokeDasharray="3 3">
      <animateTransform attributeName="transform" type="rotate" values="360 40 38;0 40 38" dur="3s" repeatCount="indefinite" />
    </circle>
    {/* Sound waves */}
    <path d="M66 30 Q70 38 66 46" stroke="#22d3ee" strokeWidth="2" fill="none" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.5s" repeatCount="indefinite" />
    </path>
    <path d="M70 26 Q76 38 70 50" stroke="#22d3ee" strokeWidth="1.5" fill="none" opacity="0.3">
      <animate attributeName="opacity" values="0.3;0.05;0.3" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
    </path>
    {/* Music note */}
    <path d="M16 18 L16 10 L24 8 L24 16" stroke="#a7f3d0" strokeWidth="2" fill="none" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
    </path>
    <circle cx="14" cy="18" r="3" fill="#a7f3d0" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
    </circle>
    <text x="40" y="72" textAnchor="middle" fill="#34d399" fontSize="7" fontWeight="bold" fontFamily="monospace">♪</text>
  </svg>
);

const categories = ["All", "AI & ML", "Web", "Mobile", "Languages"];

const projects: Projects[] = [
  {
    title: "Orion AI Platform",
    date: "2025 - Present",
    description:
      "AI-powered platform integrating multiple LLM models (OpenAI GPT, Anthropic Claude) with automation tools, intelligent workflows, and a modern React-based dashboard for enterprise productivity.",
    image: colaborator1,
    collaborators: [colaborator1],
    technologies: ["React", "TypeScript", "Vite", "Node.js", "Express", "PostgreSQL", "Prisma", "OpenAI", "Claude"],
    icon: undefined,
    status: "In Development",
    statusColor: "#eab308",
    category: "AI & ML",
    members: [
      {
        name: "Angel Zapata",
        photo: colaborator1,
        github: "https://github.com/angeldevmobile",
        linkedin: "https://www.linkedin.com/in/gabriel-zapata-239501287/",
      },
    ],
    codeUrl: "https://github.com/angeldevmobile",
  },
  {
    title: "Orion Language",
    date: "2025 - Present",
    description:
      "Modern interpreted programming language with clean syntax, built-in concurrency, Spanish-friendly keywords, powerful metaprogramming, a custom parser/AST, and a bytecode VM runtime for fast execution.",
    image: imagen4,
    collaborators: [colaborator2],
    technologies: ["Python", "ANTLR4", "Custom Parser", "AST", "Bytecode VM", "Compiler Design"],
    icon: undefined,
    status: "Interpreter Phase",
    statusColor: "#f97316",
    category: "Languages",
    members: [
      {
        name: "Angel Zapata",
        photo: colaborator2,
        github: "https://github.com/angeldevmobile",
        linkedin: "https://www.linkedin.com/in/gabriel-zapata-239501287/",
      },
    ],
    codeUrl: "https://github.com/angeldevmobile",
  },
  {
    title: "Music Streaming App",
    date: "2025 - Present",
    description:
      "Cross-platform music streaming application with real-time playback, social features, personalized recommendations, playlist management, and a beautiful responsive UI built with React Native.",
    image: Imagen1,
    collaborators: [colaborator2],
    technologies: ["React Native", "TypeScript", "Firebase", "PostgreSQL", "Node.js"],
    icon: undefined,
    status: "60% Complete",
    statusColor: "#06b6d4",
    category: "Mobile",
    members: [
      {
        name: "Angel Zapata",
        photo: colaborator2,
        github: "https://github.com/angeldevmobile",
        linkedin: "https://www.linkedin.com/in/gabriel-zapata-239501287/",
      },
    ],
    codeUrl: "https://github.com/angeldevmobile",
  },
  {
    title: "Mobile Applications",
    date: "January 2021 - Present",
    description:
      "Mobile applications built with Flutter & Dart, featuring pixel-perfect UI/UX design, smooth animations, and exceptional user experiences across Android and iOS platforms.",
    image: Imagen1,
    collaborators: [colaborator2],
    technologies: ["Flutter", "Dart", "Android", "Firebase", "Figma", "Kotlin"],
    icon: undefined,
    status: "Active",
    statusColor: "#22c55e",
    category: "Mobile",
    members: [
      {
        name: "Angel Zapata",
        photo: colaborator2,
        github: "https://github.com/angeldevmobile/shopping-econmerce-app",
        linkedin: "https://www.linkedin.com/in/gabriel-zapata-239501287/",
      },
    ],
    codeUrl: "https://github.com/angeldevmobile/shopping-econmerce-app",
  },
  {
    title: "Portfolio & E-commerce",
    date: "Apr 2021 - Present",
    description:
      "Full-stack eCommerce platform with admin & user portals, secure payment processing, product management, and a stunning developer portfolio showcasing professional work and projects.",
    image: Imagen2,
    collaborators: [colaborator2],
    technologies: ["React", "TypeScript", "Spring Boot", "Node.js", "Tailwind", "Bootstrap", "Vite"],
    icon: undefined,
    status: "Active",
    statusColor: "#22c55e",
    category: "Web",
    members: [
      {
        name: "Angel Zapata",
        photo: colaborator2,
        github: "https://github.com/angeldevmobile/my-portfolio-dev",
        linkedin: "https://www.linkedin.com/in/gabriel-zapata-239501287/",
      },
    ],
    codeUrl: "https://github.com/angeldevmobile/my-portfolio-dev",
    liveUrl: "https://portfolio-angel-dev.onrender.com/",
  },
  {
    title: "AI Virtual Assistant",
    date: "January 2024 - July 2025",
    description:
      "Intelligent document processing platform powered by AI, featuring document validation, natural language interaction, and trained on custom data pipelines for enterprise use with Google's AI tools.",
    image: Imagen3,
    collaborators: [colaborator2],
    technologies: ["Python", "Flask", "Gemini", "DocumentAI", "Cloud Storage", "LangChain", "LLMs"],
    icon: undefined,
    status: "Completed",
    statusColor: "#3b82f6",
    category: "AI & ML",
    members: [
      {
        name: "Angel Zapata",
        photo: colaborator2,
        github: "https://github.com/angeldevmobile",
        linkedin: "https://www.linkedin.com/in/gabriel-zapata-239501287/",
      },
    ],
    codeUrl: "https://github.com/angeldevmobile",
  },
];

const svgIcons = [
  <OrionPlatformIcon />,
  <LanguageIcon />,
  <MusicIcon />,
  <MobileIcon />,
  <WebIcon />,
  <AIIcon />,
];

const Project = () => {
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(projects.length).fill(false));
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    setVisibleCards(new Array(filteredProjects.length).fill(false));

    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      });
    }, observerOptions);

    if (headerRef.current) headerObserver.observe(headerRef.current);

    const timeout = setTimeout(() => {
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
              }, index * 150);
            }
          }
        });
      }, observerOptions);

      cardsRef.current.forEach((card) => {
        if (card) cardObserver.observe(card);
      });

      return () => cardObserver.disconnect();
    }, 100);

    return () => {
      headerObserver.disconnect();
      clearTimeout(timeout);
    };
  }, [activeCategory, filteredProjects.length]);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedProject]);

  const openModal = (project: Projects) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <section className="projects-section" id="projects">
      {/* Animated background grid */}
      <div className="projects-bg-grid" />

      {/* Floating orbs */}
      <div className="projects-orb projects-orb-1" />
      <div className="projects-orb projects-orb-2" />
      <div className="projects-orb projects-orb-3" />

      <div ref={headerRef} className={`projects-header ${headerVisible ? "visible" : ""}`}>
        <div className="projects-header-badge">
          <span className="badge-dot" />
          Featured Work
        </div>
        <h2 className="projects-title">
          Projects I've <span className="gradient-text">Built</span>
        </h2>
        <p className="projects-subtitle">
          From AI platforms to custom programming languages — here's a selection of work that defines my journey as a developer and founder.
        </p>

        {/* Category filter */}
        <div className="projects-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project count */}
      <div className="projects-count">
        <span className="count-number">{filteredProjects.length}</span>
        <span className="count-label">
          {activeCategory === "All" ? "Total Projects" : `${activeCategory} Projects`}
        </span>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => {
          const globalIndex = projects.indexOf(project);
          return (
            <div
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`project-card-3d ${visibleCards[index] ? "visible" : ""}`}
              key={`${project.title}-${index}`}
              style={{ "--card-index": index } as React.CSSProperties}
              onClick={() => openModal(project)}
            >
              <div className="card-glow" />
              <div className="card-inner">
                {/* SVG Icon floating */}
                <div className="card-svg-icon">{svgIcons[globalIndex]}</div>

                {/* Status badge */}
                <div className="card-status" style={{ "--status-color": project.statusColor } as React.CSSProperties}>
                  <span className="status-dot" style={{ background: project.statusColor }} />
                  {project.status}
                </div>

                {/* Category tag */}
                <div className="card-category">{project.category}</div>

                {/* Image */}
                <div className="card-image-wrapper">
                  <img src={project.image} alt={project.title} className="card-image" />
                  <div className="card-image-overlay" />
                </div>

                {/* Content */}
                <div className="card-content">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-date">{project.date}</p>
                  <p className="card-description">{project.description}</p>

                  {/* Tech tags */}
                  <div className="card-tech-row">
                    {project.technologies?.slice(0, 4).map((tech) => (
                      <span key={tech} className="card-tech-tag">
                        {tech}
                      </span>
                    ))}
                    {(project.technologies?.length || 0) > 4 && (
                      <span className="card-tech-tag card-tech-more">
                        +{(project.technologies?.length || 0) - 4}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="card-footer">
                    <div className="card-collaborators">
                      {project.collaborators.map((c, idx) => (
                        <img src={c} alt={`Collaborator ${idx + 1}`} key={idx} className="card-avatar" />
                      ))}
                    </div>
                    <span className="card-view-btn">
                      View Details <FaExternalLinkAlt size={10} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Modal ── */}
      {selectedProject && (
        <>
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal-3d">
            <div className="modal-inner">
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>

              <div className="modal-hero">
                <img src={selectedProject.image} alt={selectedProject.title} className="modal-hero-image" />
                <div className="modal-hero-overlay" />
                <div className="modal-hero-content">
                  <div className="modal-badges-row">
                    <div
                      className="modal-status-badge"
                      style={{ "--status-color": selectedProject.statusColor } as React.CSSProperties}
                    >
                      <span className="status-dot" style={{ background: selectedProject.statusColor }} />
                      {selectedProject.status}
                    </div>
                    {selectedProject.category && (
                      <div className="modal-category-badge">{selectedProject.category}</div>
                    )}
                  </div>
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <p className="modal-date">{selectedProject.date}</p>
                </div>
              </div>

              <div className="modal-body">
                <p className="modal-description">{selectedProject.description}</p>

                <div className="modal-section">
                  <h4 className="modal-section-title">Technologies</h4>
                  <div className="modal-tech-grid">
                    {selectedProject.technologies?.map((tech) => (
                      <span key={tech} className="modal-tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-section">
                  <h4 className="modal-section-title">Team</h4>
                  <div className="modal-members">
                    {selectedProject.members?.map((member) => (
                      <div key={member.name} className="modal-member">
                        <img src={member.photo} alt={member.name} className="modal-member-photo" />
                        <div className="modal-member-info">
                          <span className="modal-member-name">{member.name}</span>
                          <div className="modal-member-links">
                            {member.github && (
                              <a href={member.github} target="_blank" rel="noopener noreferrer" className="member-link">
                                <FaGithub /> GitHub
                              </a>
                            )}
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="member-link linkedin"
                              >
                                <FaLinkedin /> LinkedIn
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <a
                    href={selectedProject.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn primary"
                  >
                    <FaGithub /> View Source Code
                  </a>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-btn live"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  <button className="modal-btn secondary" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Project;

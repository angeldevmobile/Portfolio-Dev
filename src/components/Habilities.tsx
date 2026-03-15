import React, { useRef, useState, useEffect, useCallback } from "react";
import { FaReact, FaNodeJs, FaGithub, FaJava, FaFutbol, FaBrain, FaUsers, FaLightbulb, FaComments, FaRocket, FaHeart, FaGamepad } from "react-icons/fa";
import {
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiBootstrap,
  SiExpress,
  SiPython,
  SiMysql,
  SiMongodb,
  SiSpringboot,
  SiFirebase,
  SiNetlify,
  SiVisualstudiocode,
  SiPostman,
  SiFigma,
  SiAndroidstudio,
  SiFlutter,
  SiIntellijidea,
  SiTypescript,
  SiGooglecloud,
  SiOpenai,
  SiLangchain,
  SiTensorflow,
  SiHuggingface,
  SiFastapi,
  SiPostgresql,
  SiRedis,
  SiVercel,
  SiLinux,
} from "react-icons/si";
import "./css/Skills.css";

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
  level: number;
}

interface SoftSkillItem {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface SkillCategory {
  title: string;
  description: string;
  gradient: [string, string];
  icon: React.ReactNode;
  skills: Skill[];
}

/* ═══════════════════════════════════════════
   SVG CATEGORY ICONS
   ═══════════════════════════════════════════ */

const FrontendSVG = () => (
  <svg className="category-svg" viewBox="0 0 60 60" fill="none">
    <defs>
      <linearGradient id="feGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <rect x="6" y="8" width="48" height="34" rx="4" fill="url(#feGrad)" opacity="0.9" />
    <rect x="10" y="12" width="40" height="24" rx="2" fill="#0a0a2e" opacity="0.8" />
    <rect x="16" y="18" width="14" height="2" rx="1" fill="#38bdf8" opacity="0.7">
      <animate attributeName="width" values="14;20;14" dur="3s" repeatCount="indefinite" />
    </rect>
    <rect x="16" y="23" width="20" height="2" rx="1" fill="#818cf8" opacity="0.5" />
    <rect x="16" y="28" width="10" height="2" rx="1" fill="#34d399" opacity="0.6" />
    <rect x="22" y="44" width="16" height="3" rx="1.5" fill="#475569" />
    <circle cx="50" cy="6" r="2" fill="#38bdf8" opacity="0.4">
      <animate attributeName="cy" values="6;3;6" dur="2.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const BackendSVG = () => (
  <svg className="category-svg" viewBox="0 0 60 60" fill="none">
    <defs>
      <linearGradient id="beGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <rect x="10" y="6" width="40" height="12" rx="4" fill="url(#beGrad)" opacity="0.9" />
    <circle cx="17" cy="12" r="2" fill="#0a0a2e" opacity="0.6" />
    <circle cx="24" cy="12" r="2" fill="#0a0a2e" opacity="0.6" />
    <rect x="30" y="10" width="14" height="4" rx="2" fill="#0a0a2e" opacity="0.4" />
    <rect x="10" y="22" width="40" height="12" rx="4" fill="url(#beGrad)" opacity="0.7" />
    <circle cx="17" cy="28" r="2" fill="#0a0a2e" opacity="0.6" />
    <circle cx="24" cy="28" r="2" fill="#0a0a2e" opacity="0.6" />
    <rect x="10" y="38" width="40" height="12" rx="4" fill="url(#beGrad)" opacity="0.5" />
    <circle cx="17" cy="44" r="2" fill="#0a0a2e" opacity="0.6" />
    <circle cx="24" cy="44" r="2" fill="#0a0a2e" opacity="0.6" />
    <line x1="30" y1="18" x2="30" y2="22" stroke="#22c55e" strokeWidth="1" opacity="0.4" />
    <line x1="30" y1="34" x2="30" y2="38" stroke="#22c55e" strokeWidth="1" opacity="0.4" />
    <circle cx="52" cy="8" r="1.5" fill="#34d399" opacity="0.5">
      <animate attributeName="cy" values="8;4;8" dur="3s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const AiSVG = () => (
  <svg className="category-svg" viewBox="0 0 60 60" fill="none">
    <defs>
      <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
      <filter id="aiGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    {/* Brain outline */}
    <path d="M30 8 Q18 8 14 18 Q10 28 16 36 Q12 40 14 46 Q16 52 24 52 L30 52 L36 52 Q44 52 46 46 Q48 40 44 36 Q50 28 46 18 Q42 8 30 8 Z"
      fill="none" stroke="url(#aiGrad)" strokeWidth="2" opacity="0.8" filter="url(#aiGlow)" />
    {/* Neural connections */}
    <circle cx="24" cy="22" r="3" fill="#a855f7" opacity="0.6">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="36" cy="22" r="3" fill="#ec4899" opacity="0.6">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="30" cy="32" r="3" fill="#a855f7" opacity="0.7">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="1s" repeatCount="indefinite" />
    </circle>
    <circle cx="22" cy="40" r="2.5" fill="#ec4899" opacity="0.5" />
    <circle cx="38" cy="40" r="2.5" fill="#a855f7" opacity="0.5" />
    <line x1="24" y1="22" x2="36" y2="22" stroke="#c084fc" strokeWidth="1" opacity="0.3" />
    <line x1="24" y1="22" x2="30" y2="32" stroke="#c084fc" strokeWidth="1" opacity="0.3" />
    <line x1="36" y1="22" x2="30" y2="32" stroke="#c084fc" strokeWidth="1" opacity="0.3" />
    <line x1="30" y1="32" x2="22" y2="40" stroke="#c084fc" strokeWidth="1" opacity="0.3" />
    <line x1="30" y1="32" x2="38" y2="40" stroke="#c084fc" strokeWidth="1" opacity="0.3" />
    {/* Sparkles */}
    <circle cx="8" cy="16" r="1.5" fill="#a855f7" opacity="0.4">
      <animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="52" cy="44" r="1" fill="#ec4899" opacity="0.4">
      <animate attributeName="r" values="1;2;1" dur="2.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const ToolsSVG = () => (
  <svg className="category-svg" viewBox="0 0 60 60" fill="none">
    <defs>
      <linearGradient id="toolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>
    <path d="M18 14 L30 26 L26 30 L14 18" stroke="url(#toolGrad)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
    <circle cx="12" cy="12" r="6" fill="none" stroke="url(#toolGrad)" strokeWidth="2" opacity="0.6" />
    <circle cx="42" cy="36" r="10" fill="url(#toolGrad)" opacity="0.8">
      <animateTransform attributeName="transform" type="rotate" from="0 42 36" to="360 42 36" dur="12s" repeatCount="indefinite" />
    </circle>
    <circle cx="42" cy="36" r="5" fill="#0a0a2e" opacity="0.8" />
    <rect x="40" y="22" width="4" height="6" rx="1" fill="url(#toolGrad)" opacity="0.6" />
    <rect x="40" y="44" width="4" height="6" rx="1" fill="url(#toolGrad)" opacity="0.6" />
    <rect x="28" y="34" width="6" height="4" rx="1" fill="url(#toolGrad)" opacity="0.6" />
    <rect x="50" y="34" width="6" height="4" rx="1" fill="url(#toolGrad)" opacity="0.6" />
    <circle cx="8" cy="48" r="1.5" fill="#fbbf24" opacity="0.4">
      <animate attributeName="cy" values="48;44;48" dur="2.8s" repeatCount="indefinite" />
    </circle>
  </svg>
);

/* ═══════════════════════════════════════════
   TECHNICAL SKILL CATEGORIES
   ═══════════════════════════════════════════ */

const categories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Building beautiful, responsive user interfaces",
    gradient: ["#06b6d4", "#3b82f6"],
    icon: <FrontendSVG />,
    skills: [
      { name: "React", icon: <FaReact />, color: "#61dafb", level: 78 },
      { name: "Flutter", icon: <SiFlutter />, color: "#02569B", level: 72 },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178c6", level: 75 },
      { name: "JavaScript", icon: <SiJavascript />, color: "#f7df1e", level: 80 },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06b6d4", level: 78 },
      { name: "HTML5", icon: <SiHtml5 />, color: "#e34f26", level: 85 },
      { name: "CSS3", icon: <SiCss3 />, color: "#1572b6", level: 82 },
      { name: "Bootstrap", icon: <SiBootstrap />, color: "#7952b3", level: 70 },
    ],
  },
  {
    title: "Backend",
    description: "Crafting robust APIs & server architectures",
    gradient: ["#22c55e", "#06b6d4"],
    icon: <BackendSVG />,
    skills: [
      { name: "Node.js", icon: <FaNodeJs />, color: "#339933", level: 78 },
      { name: "Express", icon: <SiExpress />, color: "#ffffff", level: 74 },
      { name: "Python", icon: <SiPython />, color: "#3776ab", level: 76 },
      { name: "FastAPI", icon: <SiFastapi />, color: "#009688", level: 68 },
      { name: "Java", icon: <FaJava />, color: "#ed8b00", level: 65 },
      { name: "Spring Boot", icon: <SiSpringboot />, color: "#6db33f", level: 62 },
      { name: "MySQL", icon: <SiMysql />, color: "#4479a1", level: 75 },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169e1", level: 72 },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47a248", level: 70 },
      { name: "Redis", icon: <SiRedis />, color: "#dc382d", level: 60 },
    ],
  },
  {
    title: "AI & Machine Learning",
    description: "Building intelligent systems & autonomous agents",
    gradient: ["#a855f7", "#ec4899"],
    icon: <AiSVG />,
    skills: [
      { name: "OpenAI / GPT-4", icon: <SiOpenai />, color: "#10a37f", level: 78 },
      { name: "LangChain", icon: <SiLangchain />, color: "#1c3c3c", level: 72 },
      { name: "Hugging Face", icon: <SiHuggingface />, color: "#ffcc00", level: 65 },
      { name: "TensorFlow", icon: <SiTensorflow />, color: "#ff6f00", level: 55 },
      { name: "Claude API", icon: <FaBrain />, color: "#d97706", level: 74 },
      { name: "Prompt Engineering", icon: <FaLightbulb />, color: "#fbbf24", level: 80 },
    ],
  },
  {
    title: "Tools & Cloud",
    description: "Development workflow & cloud infrastructure",
    gradient: ["#f59e0b", "#ef4444"],
    icon: <ToolsSVG />,
    skills: [
      { name: "GitHub", icon: <FaGithub />, color: "#ffffff", level: 82 },
      { name: "Google Cloud", icon: <SiGooglecloud />, color: "#4285f4", level: 60 },
      { name: "Firebase", icon: <SiFirebase />, color: "#ffca28", level: 72 },
      { name: "VS Code", icon: <SiVisualstudiocode />, color: "#007acc", level: 88 },
      { name: "Postman", icon: <SiPostman />, color: "#ff6c37", level: 78 },
      { name: "Figma", icon: <SiFigma />, color: "#f24e1e", level: 68 },
      { name: "IntelliJ", icon: <SiIntellijidea />, color: "#ffffff", level: 70 },
      { name: "Android Studio", icon: <SiAndroidstudio />, color: "#3ddc84", level: 75 },
      { name: "Vercel", icon: <SiVercel />, color: "#ffffff", level: 72 },
      { name: "Netlify", icon: <SiNetlify />, color: "#00c7b7", level: 75 },
      { name: "Linux", icon: <SiLinux />, color: "#fcc624", level: 68 },
    ],
  },
];

/* ═══════════════════════════════════════════
   SOFT SKILLS & INTERESTS
   ═══════════════════════════════════════════ */

const softSkills: SoftSkillItem[] = [
  {
    name: "Leadership",
    icon: <FaRocket />,
    color: "#a855f7",
    description: "Founder mindset — leading projects from 0 to 1 with vision and strategy",
  },
  {
    name: "Teamwork",
    icon: <FaUsers />,
    color: "#3b82f6",
    description: "Collaborative spirit, Agile/Scrum experience in cross-functional teams",
  },
  {
    name: "Problem Solving",
    icon: <FaBrain />,
    color: "#06b6d4",
    description: "Analytical thinking to break down complex problems into elegant solutions",
  },
  {
    name: "Communication",
    icon: <FaComments />,
    color: "#22c55e",
    description: "Clear technical communication — bilingual (Spanish & English)",
  },
  {
    name: "Fast Learner",
    icon: <FaLightbulb />,
    color: "#f59e0b",
    description: "Quickly adapting to new technologies, frameworks, and paradigms",
  },
  {
    name: "Creativity",
    icon: <FaHeart />,
    color: "#ec4899",
    description: "Designing unique user experiences and innovative product features",
  },
];

interface InterestItem {
  name: string;
  icon: React.ReactNode;
  color: string;
  emoji: string;
}

const interests: InterestItem[] = [
  { name: "Football", icon: <FaFutbol />, color: "#22c55e", emoji: "⚽" },
  { name: "AI Models", icon: <FaBrain />, color: "#a855f7", emoji: "🤖" },
  { name: "Gaming", icon: <FaGamepad />, color: "#3b82f6", emoji: "🎮" },
  { name: "Open Source", icon: <FaGithub />, color: "#ffffff", emoji: "💻" },
  { name: "Language Design", icon: <FaRocket />, color: "#ec4899", emoji: "🚀" },
  { name: "Tech News", icon: <FaLightbulb />, color: "#f59e0b", emoji: "📰" },
];

/* ═══════════════════════════════════════════
   3D TILT EFFECT HOOK
   ═══════════════════════════════════════════ */

const useTilt3D = (ref: React.RefObject<HTMLDivElement | null>, intensity: number = 8) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      targetX = ((y - centerY) / centerY) * -intensity;
      targetY = ((x - centerX) / centerX) * intensity;
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      el.style.transform = `perspective(800px) rotateX(${currentX}deg) rotateY(${currentY}deg) scale3d(1.02, 1.02, 1.02)`;
      rafId = requestAnimationFrame(animate);
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [ref, intensity]);
};

/* ═══════════════════════════════════════════
   ANIMATED COUNTER HOOK
   ═══════════════════════════════════════════ */

const useCounter = (target: number, isVisible: boolean, duration: number = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [target, isVisible, duration]);

  return count;
};

/* ═══════════════════════════════════════════
   FLOATING PARTICLES COMPONENT
   ═══════════════════════════════════════════ */

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const FloatingParticles: React.FC = () => {
  const [particles] = useState<Particle[]>(() => {
    const colors = ['#a855f7', '#3b82f6', '#06b6d4', '#22c55e', '#f59e0b', '#ec4899'];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }));
  });

  return (
    <div className="skills-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="skills-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAGNETIC HOVER HOOK
   ═══════════════════════════════════════════ */

const useMagneticHover = () => {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`;
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translate(0, 0) scale(1)';
  }, []);

  return { handleMouseMove, handleMouseLeave };
};

/* ═══════════════════════════════════════════
   SKILL CARD WITH 3D TILT 
   ═══════════════════════════════════════════ */

const SkillCard: React.FC<{
  category: SkillCategory;
  catIdx: number;
  isVisible: boolean;
}> = ({ category, catIdx, isVisible }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useTilt3D(cardRef, 6);

  return (
    <div
      ref={cardRef}
      className={`skills-category-card ${isVisible ? "visible" : ""}`}
      style={{
        '--cat-index': catIdx,
        '--cat-color-1': category.gradient[0],
        '--cat-color-2': category.gradient[1],
      } as React.CSSProperties}
    >
      <div className="category-glow" />
      <div className="category-inner">
        {/* Corner shine effect */}
        <div className="category-shine" />

        {/* SVG floating icon */}
        <div className="category-svg-wrapper">{category.icon}</div>

        {/* Category header */}
        <div className="category-header">
          <h3 className="category-title">{category.title}</h3>
          <p className="category-description">{category.description}</p>
        </div>

        {/* Skills list */}
        <div className="skills-list">
          {category.skills.map((skill, skillIdx) => (
            <div
              key={skill.name}
              className={`skill-item ${isVisible ? "visible" : ""}`}
              style={{
                '--skill-index': skillIdx,
                '--skill-color': skill.color,
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="skill-icon-wrapper">
                <div
                  className="skill-icon-bg"
                  style={{
                    background: hoveredSkill === skill.name
                      ? `${skill.color}20`
                      : "rgba(255,255,255,0.03)",
                    borderColor: hoveredSkill === skill.name
                      ? `${skill.color}40`
                      : "rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="skill-icon" style={{ color: skill.color }}>
                    {skill.icon}
                  </span>
                </div>
              </div>

              <div className="skill-info">
                <div className="skill-name-row">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level-text" style={{ color: skill.color }}>
                    {skill.level}%
                  </span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                      transitionDelay: `${0.6 + skillIdx * 0.08}s`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skill count badge */}
        <div className="category-footer">
          <span className="skill-count">{category.skills.length} technologies</span>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SOFT SKILL CARD — Hexagonal design
   ═══════════════════════════════════════════ */

const SoftSkillCard: React.FC<{
  skill: SoftSkillItem;
  index: number;
  isVisible: boolean;
}> = ({ skill, index, isVisible }) => {
  const magnetic = useMagneticHover();

  return (
    <div
      className={`soft-skill-card ${isVisible ? 'visible' : ''}`}
      style={{
        '--ss-index': index,
        '--ss-color': skill.color,
      } as React.CSSProperties}
      onMouseMove={magnetic.handleMouseMove}
      onMouseLeave={magnetic.handleMouseLeave}
    >
      <div className="soft-skill-inner">
        <div className="soft-skill-icon-ring">
          <div className="soft-skill-icon" style={{ color: skill.color }}>
            {skill.icon}
          </div>
        </div>
        <h4 className="soft-skill-name">{skill.name}</h4>
        <p className="soft-skill-desc">{skill.description}</p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN SKILLS COMPONENT
   ═══════════════════════════════════════════ */

const Skills: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(categories.length).fill(false));
  const [softVisible, setSoftVisible] = useState(false);
  const [interestsVisible, setInterestsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const softRef = useRef<HTMLDivElement>(null);
  const interestsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Animated counters 
  const techCount = useCounter(20, statsVisible, 1800);
  const projectCount = useCounter(6, statsVisible, 1500);
  const aiModels = useCounter(4, statsVisible, 1200);
  const yearsExp = useCounter(1, statsVisible, 1000);

  useEffect(() => {
    const options = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const headerObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setHeaderVisible(true); });
    }, options);

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
            }, idx * 200);
          }
        }
      });
    }, options);

    const softObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setSoftVisible(true); });
    }, options);

    const interestsObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setInterestsVisible(true); });
    }, options);

    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setStatsVisible(true); });
    }, { threshold: 0.3 });

    if (headerRef.current) headerObs.observe(headerRef.current);
    if (softRef.current) softObs.observe(softRef.current);
    if (interestsRef.current) interestsObs.observe(interestsRef.current);
    if (statsRef.current) statsObs.observe(statsRef.current);

    cardsRef.current.forEach((c) => { if (c) cardObs.observe(c); });

    return () => {
      headerObs.disconnect();
      cardObs.disconnect();
      softObs.disconnect();
      interestsObs.disconnect();
      statsObs.disconnect();
    };
  }, []);

  return (
    <section className="skills-section">
      {/* Background effects */}
      <div className="skills-bg-grid" />
      <div className="skills-bg-orb skills-orb-1" />
      <div className="skills-bg-orb skills-orb-2" />
      <div className="skills-bg-orb skills-orb-3" />
      <FloatingParticles />

      {/* ═══ HEADER ═══ */}
      <div ref={headerRef} className={`skills-header ${headerVisible ? "visible" : ""}`}>
        <div className="skills-header-badge">
          <span className="skills-badge-dot" />
          Technical Expertise
        </div>
        <h2 className="skills-title">
          Skills & <span className="skills-gradient-text">Technologies</span>
        </h2>
        <p className="skills-subtitle">
          A comprehensive toolkit built through years of professional development —
          from pixel-perfect frontends to intelligent AI systems and cloud infrastructure.
        </p>
      </div>

      {/* ═══ STATS BAR ═══ */}
      <div ref={statsRef} className={`skills-stats ${statsVisible ? 'visible' : ''}`}>
        <div className="skills-stat-item">
          <span className="stat-number">{techCount}+</span>
          <span className="stat-label">Technologies</span>
        </div>
        <div className="skills-stat-divider" />
        <div className="skills-stat-item">
          <span className="stat-number">{projectCount}+</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="skills-stat-divider" />
        <div className="skills-stat-item">
          <span className="stat-number">{aiModels}+</span>
          <span className="stat-label">AI Models Used</span>
        </div>
        <div className="skills-stat-divider" />
        <div className="skills-stat-item">
          <span className="stat-number">{yearsExp}+</span>
          <span className="stat-label">Years Experience</span>
        </div>
      </div>

      {/* ═══ TECHNICAL SKILLS GRID ═══ */}
      <div className="skills-categories">
        {categories.map((category, catIdx) => (
          <div
            key={category.title}
            ref={(el) => { cardsRef.current[catIdx] = el; }}
          >
            <SkillCard
              category={category}
              catIdx={catIdx}
              isVisible={visibleCards[catIdx]}
            />
          </div>
        ))}
      </div>

      {/* ═══ SOFT SKILLS ═══ */}
      <div ref={softRef} className={`soft-skills-section ${softVisible ? 'visible' : ''}`}>
        <div className="soft-skills-header">
          <div className="skills-header-badge">
            <span className="skills-badge-dot" style={{ background: '#ec4899' }} />
            Beyond Code
          </div>
          <h2 className="skills-title">
            Soft <span className="skills-gradient-text-pink">Skills</span>
          </h2>
          <p className="skills-subtitle">
            Technical excellence is just the beginning — these are the human skills
            that make great software truly exceptional.
          </p>
        </div>

        <div className="soft-skills-grid">
          {softSkills.map((skill, idx) => (
            <SoftSkillCard
              key={skill.name}
              skill={skill}
              index={idx}
              isVisible={softVisible}
            />
          ))}
        </div>
      </div>

      {/* ═══ INTERESTS & HOBBIES ═══ */}
      <div ref={interestsRef} className={`interests-section ${interestsVisible ? 'visible' : ''}`}>
        <div className="interests-header">
          <h3 className="interests-title">
            <span className="interests-emoji">✨</span>
            When I'm not coding
          </h3>
        </div>

        <div className="interests-grid">
          {interests.map((interest, idx) => (
            <div
              key={interest.name}
              className={`interest-chip ${interestsVisible ? 'visible' : ''}`}
              style={{
                '--int-index': idx,
                '--int-color': interest.color,
              } as React.CSSProperties}
            >
              <span className="interest-emoji">{interest.emoji}</span>
              <span className="interest-icon" style={{ color: interest.color }}>
                {interest.icon}
              </span>
              <span className="interest-name">{interest.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

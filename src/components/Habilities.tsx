import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaFutbol,
  FaBrain,
  FaUsers,
  FaLightbulb,
  FaComments,
  FaRocket,
  FaHeart,
  FaGamepad,
  FaMicrochip,
} from "react-icons/fa";
import {
  SiRust,
  SiTypescript,
  SiPython,
  SiTauri,
  SiFlutter,
  SiPostgresql,
  SiAnthropic,
  SiGooglegemini,
  SiDocker,
} from "react-icons/si";
import "./css/Skills.css";

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */

interface Skill {
  name: string;
  usedIn?: string[]; // shipped projects (see Projects.tsx) or BBVA; certificates don't count
  core?: { icon: React.ReactNode; color: string }; // featured in the core stack
  model?: boolean; // an AI model, counted in the stats bar
}

interface SkillCategory {
  title: string;
  gradient: [string, string];
  skills: Skill[];
}

interface SoftSkillItem {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

/* ═══════════════════════════════════════════
   TECHNICAL SKILLS
   ═══════════════════════════════════════════ */

const categories: SkillCategory[] = [
  {
    title: "Languages",
    gradient: ["#f97316", "#facc15"],
    skills: [
      { name: "Rust", usedIn: ["Orion", "Flux", "Seam"], core: { icon: <SiRust />, color: "#f46623" } },
      { name: "TypeScript", usedIn: ["Flux", "Flux Learning", "Seam"], core: { icon: <SiTypescript />, color: "#3178c6" } },
      { name: "Python", usedIn: ["BBVA", "Seam"], core: { icon: <SiPython />, color: "#3776ab" } },
      { name: "JavaScript", usedIn: ["Orion for VS Code", "Portfolio"] },
      { name: "Java", usedIn: ["E-commerce"] },
      { name: "Dart", usedIn: ["SmartRemote"] },
      { name: "VBA", usedIn: ["BBVA"] },
      { name: "SQL" },
      { name: "R" },
      { name: "COBOL" },
    ],
  },
  {
    title: "Systems & Compilers",
    gradient: ["#ec4899", "#f97316"],
    skills: [
      { name: "Cranelift", usedIn: ["Orion"], core: { icon: <FaMicrochip />, color: "#fb923c" } },
      { name: "Tauri", usedIn: ["Flux"], core: { icon: <SiTauri />, color: "#ffc131" } },
      { name: "Bytecode VM", usedIn: ["Orion"] },
      { name: "Rayon", usedIn: ["Orion"] },
      { name: "Tokio", usedIn: ["Flux", "Orion Playground"] },
      { name: "gRPC", usedIn: ["Flux"] },
      { name: "WebAssembly", usedIn: ["Seam"] },
      { name: "PyO3 / napi-rs", usedIn: ["Seam"] },
      { name: "LSP / DAP", usedIn: ["Orion for VS Code"] },
    ],
  },
  {
    title: "Frontend & Mobile",
    gradient: ["#06b6d4", "#3b82f6"],
    skills: [
      { name: "React", usedIn: ["Flux", "Flux Learning", "Portfolio"], core: { icon: <FaReact />, color: "#61dafb" } },
      { name: "Flutter", usedIn: ["SmartRemote"], core: { icon: <SiFlutter />, color: "#54c5f8" } },
      { name: "Next.js", usedIn: ["Flux Learning"] },
      { name: "React Native", usedIn: ["Flux Learning"] },
      { name: "Expo", usedIn: ["Flux Learning"] },
      { name: "Tailwind CSS", usedIn: ["Flux", "Flux Learning", "Portfolio"] },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Bootstrap" },
    ],
  },
  {
    title: "Backend & Data",
    gradient: ["#22c55e", "#06b6d4"],
    skills: [
      { name: "Node.js", usedIn: ["Seam", "Portfolio"], core: { icon: <FaNodeJs />, color: "#5fa04e" } },
      { name: "PostgreSQL", usedIn: ["Orion"], core: { icon: <SiPostgresql />, color: "#6b8cff" } },
      { name: "Express", usedIn: ["Portfolio"] },
      { name: "Axum", usedIn: ["Flux", "Orion Playground"] },
      { name: "Flask", usedIn: ["BBVA"] },
      { name: "Spring Boot", usedIn: ["E-commerce"] },
      { name: "SQLite", usedIn: ["Flux", "Orion"] },
      { name: "Supabase", usedIn: ["Flux", "Flux Learning"] },
      { name: "FastAPI" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Firebase" },
      { name: "Pandas" },
      { name: "Tableau" },
    ],
  },
  {
    title: "AI Models & Tools",
    gradient: ["#a855f7", "#ec4899"],
    skills: [
      { name: "Claude", model: true, usedIn: ["Flux", "Flux Learning"], core: { icon: <SiAnthropic />, color: "#d97757" } },
      { name: "Google Gemini", model: true, usedIn: ["BBVA"], core: { icon: <SiGooglegemini />, color: "#8e75ff" } },
      { name: "OpenAI GPT", model: true },
      { name: "GitHub Copilot", model: true },
      { name: "Llama", model: true },
      { name: "Google DocumentAI", usedIn: ["BBVA"] },
      { name: "Prompt Engineering" },
      { name: "LangChain" },
      { name: "Hugging Face" },
      { name: "TensorFlow" },
    ],
  },
  {
    title: "Cloud & Tools",
    gradient: ["#f59e0b", "#ef4444"],
    skills: [
      { name: "Docker", usedIn: ["Orion Playground"], core: { icon: <SiDocker />, color: "#2496ed" } },
      { name: "Git & GitHub", usedIn: ["every project"] },
      { name: "Render", usedIn: ["Portfolio", "Orion Playground"] },
      { name: "Vercel", usedIn: ["Flux Learning"] },
      { name: "Google Cloud", usedIn: ["BBVA"] },
      { name: "VS Code API", usedIn: ["Orion for VS Code"] },
      { name: "Jest", usedIn: ["Flux Learning"] },
      { name: "Turborepo", usedIn: ["Flux Learning"] },
      { name: "Oracle Cloud" },
      { name: "Linux" },
      { name: "Postman" },
      { name: "Figma" },
    ],
  },
];

// Derived from the lists above, so the stats and the grid can't drift apart
const ALL_SKILLS = categories.flatMap((c) => c.skills);
const CORE_SKILLS = ALL_SKILLS.filter((s) => s.core);
const AI_MODEL_COUNT = ALL_SKILLS.filter((s) => s.model).length;

/* ═══════════════════════════════════════════
   SOFT SKILLS & INTERESTS
   ═══════════════════════════════════════════ */

const softSkills: SoftSkillItem[] = [
  {
    name: "Leadership",
    icon: <FaRocket />,
    color: "#a855f7",
    description: "Founder mindset: leading projects from 0 to 1 with vision and strategy",
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
    description: "Clear technical communication, bilingual (Spanish & English)",
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
   SOFT SKILL CARD
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
  const [statsVisible, setStatsVisible] = useState(false);
  const [coreVisible, setCoreVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);
  const [softVisible, setSoftVisible] = useState(false);
  const [interestsVisible, setInterestsVisible] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const softRef = useRef<HTMLDivElement>(null);
  const interestsRef = useRef<HTMLDivElement>(null);

  // Animated counters
  const coreCount = useCounter(CORE_SKILLS.length, statsVisible, 1400);
  const projectCount = useCounter(8, statsVisible, 1500);
  const aiModels = useCounter(AI_MODEL_COUNT, statsVisible, 1200);
  const yearsExp = useCounter(2, statsVisible, 1000);

  useEffect(() => {
    const options = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    // Each block flips its own flag the first time it scrolls into view
    const watch = (
      el: HTMLElement | null,
      setVisible: (v: boolean) => void,
      opts: IntersectionObserverInit = options,
    ) => {
      if (!el) return null;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setVisible(true); });
      }, opts);
      obs.observe(el);
      return obs;
    };

    const observers = [
      watch(headerRef.current, setHeaderVisible),
      watch(statsRef.current, setStatsVisible, { threshold: 0.3 }),
      watch(coreRef.current, setCoreVisible),
      watch(moreRef.current, setMoreVisible),
      watch(softRef.current, setSoftVisible),
      watch(interestsRef.current, setInterestsVisible),
    ];

    return () => observers.forEach((o) => o?.disconnect());
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
          A toolkit built over 2+ years of shipping software, from pixel-perfect
          frontends to intelligent AI systems and cloud infrastructure.
        </p>
      </div>

      {/* ═══ STATS BAR ═══ */}
      <div ref={statsRef} className={`skills-stats ${statsVisible ? 'visible' : ''}`}>
        <div className="skills-stat-item">
          <span className="stat-number">{coreCount}</span>
          <span className="stat-label">Core Technologies</span>
        </div>
        <div className="skills-stat-divider" />
        <div className="skills-stat-item">
          <span className="stat-number">{projectCount}+</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="skills-stat-divider" />
        <div className="skills-stat-item">
          <span className="stat-number">{aiModels}</span>
          <span className="stat-label">AI Models Used</span>
        </div>
        <div className="skills-stat-divider" />
        <div className="skills-stat-item">
          <span className="stat-number">{yearsExp}+</span>
          <span className="stat-label">Years Experience</span>
        </div>
      </div>

      {/* ═══ CORE STACK ═══ */}
      <div ref={coreRef} className="skills-core">
        <div className="skills-block-head">
          <h3 className="skills-block-title">Core stack</h3>
          <p className="skills-block-sub">What I build with day to day, and where it runs</p>
        </div>

        <ul className="core-grid">
          {CORE_SKILLS.map((skill, idx) => (
            <li
              key={skill.name}
              className={`core-tile ${coreVisible ? "visible" : ""}`}
              style={{
                '--skill-color': skill.core?.color,
                '--skill-index': idx,
              } as React.CSSProperties}
            >
              <span className="core-icon" aria-hidden>{skill.core?.icon}</span>
              <span className="core-text">
                <span className="core-name">{skill.name}</span>
                {skill.usedIn && (
                  <span className="core-used" title={skill.usedIn.join(" · ")}>
                    {skill.usedIn.join(" · ")}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ═══ ALSO WORKED WITH ═══ */}
      <div ref={moreRef} className={`skills-more ${moreVisible ? "visible" : ""}`}>
        <h3 className="skills-block-title">Also worked with</h3>
        <dl className="more-list">
          {categories.map((category) => {
            const rest = category.skills.filter((s) => !s.core);
            return (
              <div
                key={category.title}
                className="more-row"
                style={{
                  '--cat-color-1': category.gradient[0],
                  '--cat-color-2': category.gradient[1],
                } as React.CSSProperties}
              >
                <dt className="more-cat">{category.title}</dt>
                <dd className="more-items">
                  {rest.map((skill) => (
                    <span
                      key={skill.name}
                      className="more-item"
                      title={skill.usedIn ? `Used in ${skill.usedIn.join(", ")}` : undefined}
                    >
                      {skill.name}
                    </span>
                  ))}
                </dd>
              </div>
            );
          })}
        </dl>
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
            Technical excellence is just the beginning. These are the human skills
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

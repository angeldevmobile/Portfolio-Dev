import React, { useRef, useEffect, useState, useCallback } from "react";
import {
	FaLinkedin,
	FaGithub,
	FaArrowDown,
	FaBriefcase,
	FaRocket,
	FaCode,
	FaGraduationCap,
} from "react-icons/fa";
import { SiProducthunt } from "react-icons/si";
import profilePic from "../assets/perfil-github.png";
import "./css/HeroSection.css";

/* ═══════════════════════════════════════════
   PARTICLE CANVAS (3D starfield)
   ═══════════════════════════════════════════ */

interface Star {
	x: number;
	y: number;
	z: number;
	px: number;
	py: number;
	size: number;
	color: string;
}

const STAR_COLORS = [
	"#a855f7",
	"#3b82f6",
	"#06b6d4",
	"#22c55e",
	"#f59e0b",
	"#ec4899",
	"#ffffff",
];

const useStarfield = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animId: number;
		let stars: Star[] = [];
		let mouseX = 0;
		let mouseY = 0;
		const STAR_COUNT = 300;
		const SPEED = 1.5;
		const CENTER_OFFSET = 0.5;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		const initStars = () => {
			stars = [];
			for (let i = 0; i < STAR_COUNT; i++) {
				stars.push({
					x: (Math.random() - 0.5) * canvas.width * 2,
					y: (Math.random() - 0.5) * canvas.height * 2,
					z: Math.random() * canvas.width,
					px: 0,
					py: 0,
					size: Math.random() * 1.8 + 0.3,
					color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
				});
			}
		};

		const onMouse = (e: MouseEvent) => {
			mouseX = (e.clientX - canvas.width / 2) * 0.001;
			mouseY = (e.clientY - canvas.height / 2) * 0.001;
		};

		const animate = () => {
			ctx.fillStyle = "rgba(6, 6, 18, 0.25)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			const cx = canvas.width * CENTER_OFFSET;
			const cy = canvas.height * CENTER_OFFSET;

			for (const star of stars) {
				star.z -= SPEED;
				if (star.z <= 0) {
					star.x = (Math.random() - 0.5) * canvas.width * 2;
					star.y = (Math.random() - 0.5) * canvas.height * 2;
					star.z = canvas.width;
					star.px = 0;
					star.py = 0;
				}

				const sx =
					(star.x / star.z) * canvas.width * 0.5 + cx + mouseX * star.z * 0.3;
				const sy =
					(star.y / star.z) * canvas.height * 0.5 + cy + mouseY * star.z * 0.3;
				const r = Math.max(0.1, (1 - star.z / canvas.width) * star.size * 2.5);
				const opacity = Math.max(
					0,
					Math.min(1, (1 - star.z / canvas.width) * 0.9 + 0.1),
				);

				if (star.px !== 0 && star.py !== 0) {
					ctx.beginPath();
					ctx.strokeStyle = star.color;
					ctx.globalAlpha = opacity * 0.4;
					ctx.lineWidth = Math.max(0.1, r * 0.5);
					ctx.moveTo(star.px, star.py);
					ctx.lineTo(sx, sy);
					ctx.stroke();
				}

				ctx.beginPath();
				ctx.arc(sx, sy, r, 0, Math.PI * 2);
				ctx.fillStyle = star.color;
				ctx.globalAlpha = opacity;
				ctx.fill();
				ctx.globalAlpha = 1;

				star.px = sx;
				star.py = sy;
			}

			animId = requestAnimationFrame(animate);
		};

		resize();
		initStars();
		animate();
		window.addEventListener("resize", resize);
		window.addEventListener("mousemove", onMouse);

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener("resize", resize);
			window.removeEventListener("mousemove", onMouse);
		};
	}, [canvasRef]);
};

/* ═══════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════ */

const FluxSVG = () => (
	<svg className="hero-project-svg" viewBox="0 0 80 80" fill="none">
		<defs>
			<linearGradient id="fluxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#8b5cf6" />
				<stop offset="100%" stopColor="#6366f1" />
			</linearGradient>
		</defs>
		{/* App tile */}
		<rect x="12" y="12" width="56" height="56" rx="14" fill="url(#fluxGrad)" opacity="0.9" />
		{/* Request / response arrows */}
		<path
			d="M26 32 H50 M44 26 L50 32 L44 38"
			stroke="#fff"
			strokeWidth="3.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M54 48 H30 M36 42 L30 48 L36 54"
			stroke="#fff"
			strokeWidth="3.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			opacity="0.8"
		/>
		{/* Travelling packet */}
		<circle cx="26" cy="32" r="2.5" fill="#ddd6fe">
			<animate attributeName="cx" values="26;50;26" dur="2.4s" repeatCount="indefinite" />
		</circle>
		{/* Pulse ring */}
		<rect x="12" y="12" width="56" height="56" rx="14" fill="none" stroke="#a78bfa" strokeWidth="1">
			<animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
		</rect>
	</svg>
);

const OrionLangSVG = () => (
	<svg className="hero-project-svg" viewBox="0 0 80 80" fill="none">
		<defs>
			<linearGradient id="langGrad" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#ec4899" />
				<stop offset="100%" stopColor="#f59e0b" />
			</linearGradient>
			<filter id="langGlow" x="-50%" y="-50%" width="200%" height="200%">
				<feGaussianBlur stdDeviation="2" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>
		{/* Code window */}
		<rect
			x="12"
			y="14"
			width="56"
			height="52"
			rx="6"
			fill="none"
			stroke="url(#langGrad)"
			strokeWidth="2"
			opacity="0.7"
			filter="url(#langGlow)"
		/>
		{/* Title bar */}
		<rect
			x="12"
			y="14"
			width="56"
			height="10"
			rx="6"
			fill="url(#langGrad)"
			opacity="0.2"
		/>
		<circle cx="20" cy="19" r="2" fill="#ef4444" opacity="0.7" />
		<circle cx="27" cy="19" r="2" fill="#f59e0b" opacity="0.7" />
		<circle cx="34" cy="19" r="2" fill="#22c55e" opacity="0.7" />
		{/* Code lines */}
		<rect
			x="18"
			y="30"
			width="20"
			height="2.5"
			rx="1"
			fill="#ec4899"
			opacity="0.5">
			<animate
				attributeName="width"
				values="20;24;20"
				dur="3s"
				repeatCount="indefinite"
			/>
		</rect>
		<rect
			x="18"
			y="36"
			width="30"
			height="2.5"
			rx="1"
			fill="#f59e0b"
			opacity="0.4">
			<animate
				attributeName="width"
				values="30;26;30"
				dur="3.5s"
				repeatCount="indefinite"
			/>
		</rect>
		<rect
			x="24"
			y="42"
			width="16"
			height="2.5"
			rx="1"
			fill="#a855f7"
			opacity="0.4">
			<animate
				attributeName="width"
				values="16;20;16"
				dur="2.8s"
				repeatCount="indefinite"
			/>
		</rect>
		<rect
			x="18"
			y="48"
			width="24"
			height="2.5"
			rx="1"
			fill="#06b6d4"
			opacity="0.35"
		/>
		<rect
			x="18"
			y="54"
			width="14"
			height="2.5"
			rx="1"
			fill="#ec4899"
			opacity="0.3"
		/>
		{/* Cursor blink */}
		<rect x="32" y="54" width="2" height="3" fill="#fff" opacity="0.8">
			<animate
				attributeName="opacity"
				values="0.8;0;0.8"
				dur="1s"
				repeatCount="indefinite"
			/>
		</rect>
	</svg>
);

/* Product Hunt "Featured" badge */
const PHBadge = ({ url, postId, name }: { url: string; postId: string; name: string }) => (
	<a href={url} target="_blank" rel="noopener noreferrer" className="hero-ph-badge">
		<img
			src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${postId}&theme=dark`}
			alt={`${name} on Product Hunt`}
			width={200}
			height={43}
			loading="lazy"
		/>
	</a>
);

/* ═══════════════════════════════════════════
   JOURNEY MILESTONES
   ═══════════════════════════════════════════ */

interface Milestone {
	year: string;
	label: string;
	description: string;
	color: string;
}

const milestones: Milestone[] = [
	{
		year: "2023",
		label: "The Beginning",
		description: "Started my journey as a Full Stack Developer",
		color: "#f59e0b",
	},
	{
		year: "Dec 2023",
		label: "BBVA Internship",
		description: "Automation developer intern at BBVA until November 2024",
		color: "#22c55e",
	},
	{
		year: "Nov 2024",
		label: "Software Developer",
		description: "Joined BBVA as a software developer, working on AI projects",
		color: "#3b82f6",
	},
	{
		year: "2025",
		label: "Language Design",
		description: "Started Orion, a programming language written in Rust",
		color: "#ec4899",
	},
	{
		year: "2026",
		label: "Shipping Products",
		description: "Launched Flux and Flux Learning",
		color: "#a855f7",
	},
];

const heroStats = [
	{ value: "3+", label: "Years shipping software" },
	{ value: "2", label: "Products in public beta" },
	{ value: "58", label: "Stdlib modules in Orion" },
];

/* ═══════════════════════════════════════════
   TYPING EFFECT
   ═══════════════════════════════════════════ */

const useTypingEffect = (
	texts: string[],
	typingSpeed = 80,
	deletingSpeed = 40,
	pauseTime = 2000,
) => {
	const [displayText, setDisplayText] = useState("");
	const [textIndex, setTextIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const currentText = texts[textIndex];

		const timeout = setTimeout(
			() => {
				if (!isDeleting) {
					setDisplayText(currentText.substring(0, charIndex + 1));
					setCharIndex((prev) => prev + 1);
					if (charIndex + 1 === currentText.length) {
						setTimeout(() => setIsDeleting(true), pauseTime);
					}
				} else {
					setDisplayText(currentText.substring(0, charIndex - 1));
					setCharIndex((prev) => prev - 1);
					if (charIndex - 1 === 0) {
						setIsDeleting(false);
						setTextIndex((prev) => (prev + 1) % texts.length);
					}
				}
			},
			isDeleting ? deletingSpeed : typingSpeed,
		);

		return () => clearTimeout(timeout);
	}, [
		charIndex,
		isDeleting,
		textIndex,
		texts,
		typingSpeed,
		deletingSpeed,
		pauseTime,
	]);

	return displayText;
};

/* ═══════════════════════════════════════════
   HERO SECTION COMPONENT
   ═══════════════════════════════════════════ */

interface HeroSectionProps {
	setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setCurrentSection }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const sectionRef = useRef<HTMLDivElement>(null);
	const journeyRef = useRef<HTMLDivElement>(null);

	const [loaded, setLoaded] = useState(false);
	const [journeyVisible, setJourneyVisible] = useState(false);
	const [projectsVisible, setProjectsVisible] = useState(false);
	const [visibleMilestones, setVisibleMilestones] = useState<boolean[]>(
		new Array(milestones.length).fill(false),
	);

	const projectsRef = useRef<HTMLDivElement>(null);
	const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);

	useStarfield(canvasRef);

	const typedText = useTypingEffect([
		"Full Stack Developer",
		"Creator of Orion Language",
		"Building Flux",
		"Software Developer at BBVA",
		"Rust & TypeScript Developer",
	]);

	// Load animation
	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 200);
		return () => clearTimeout(timer);
	}, []);

	// Intersection observers
	useEffect(() => {
		const options = { threshold: 0.15 };

		const journeyObs = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) setJourneyVisible(true);
			});
		}, options);

		const projectsObs = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) setProjectsVisible(true);
			});
		}, options);

		const milestoneObs = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const idx = milestoneRefs.current.indexOf(
						entry.target as HTMLDivElement,
					);
					if (idx !== -1) {
						setTimeout(() => {
							setVisibleMilestones((prev) => {
								const next = [...prev];
								next[idx] = true;
								return next;
							});
						}, idx * 150);
					}
				}
			});
		}, options);

		if (journeyRef.current) journeyObs.observe(journeyRef.current);
		if (projectsRef.current) projectsObs.observe(projectsRef.current);
		milestoneRefs.current.forEach((m) => {
			if (m) milestoneObs.observe(m);
		});

		return () => {
			journeyObs.disconnect();
			projectsObs.disconnect();
			milestoneObs.disconnect();
		};
	}, []);

	// Parallax on scroll
	const handleScroll = useCallback(() => {
		if (!sectionRef.current) return;
		const scrollY = window.scrollY;
		const parallaxElements =
			sectionRef.current.querySelectorAll("[data-parallax]");
		parallaxElements.forEach((el) => {
			const speed = parseFloat((el as HTMLElement).dataset.parallax || "0");
			(el as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
		});
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	const handleScrollToContact = () => {
		setCurrentSection("contact");
	};

	const scrollToJourney = () => {
		journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<div ref={sectionRef} className="hero-wrapper">
			{/* ═══ PANEL 1: MAIN HERO ═══ */}
			<section className="hero-main">
				<canvas ref={canvasRef} className="hero-starfield" />

				{/* Floating geometry */}
				<div className="hero-geometry" data-parallax="-0.15">
					<div className="hero-geo geo-1" />
					<div className="hero-geo geo-2" />
					<div className="hero-geo geo-3" />
					<div className="hero-geo geo-4" />
				</div>

				{/* Content */}
				<div className={`hero-content ${loaded ? "visible" : ""}`}>
					{/* Profile */}
					<div className="hero-profile-wrapper">
						<div className="hero-profile-ring">
							<div className="hero-profile-ring-inner" />
						</div>
						<img
							src={profilePic}
							alt="Angel Zapata"
							className="hero-profile-img"
						/>
						<div className="hero-profile-status">
							<span className="hero-status-dot" />
							Available
						</div>
					</div>

					{/* Text */}
					<div className="hero-text">
						<div className="hero-name-badge">
							<span className="hero-badge-wave">👋</span>
							Hi, I'm
						</div>

						<h1 className="hero-name">
							Angel <span className="hero-name-gradient">Zapata</span>
						</h1>

						<div className="hero-typed-wrapper">
							<span className="hero-typed-prefix">&gt; </span>
							<span className="hero-typed-text">{typedText}</span>
							<span className="hero-typed-cursor">|</span>
						</div>

						<p className="hero-bio">
							Building developer tools, designing a programming language in Rust,
							and architecting scalable fintech solutions. Creator of{" "}
							<span className="hero-highlight hero-highlight-purple">Flux</span> and{" "}
							<span className="hero-highlight hero-highlight-purple">Orion</span>.
						</p>

						{/* Right now */}
						<ul className="hero-facts">
							<li className="hero-fact">
								<FaBriefcase className="hero-fact-icon" aria-hidden />
								Software Developer at <strong>BBVA Perú</strong>
							</li>
							<li className="hero-fact">
								<FaCode className="hero-fact-icon" aria-hidden />
								Creator of <strong>Orion Language</strong>
							</li>
							<li className="hero-fact">
								<FaRocket className="hero-fact-icon" aria-hidden />
								Creator of <strong>Flux</strong>
							</li>
							<li className="hero-fact">
								<FaGraduationCap className="hero-fact-icon" aria-hidden />
								Systems &amp; Computer Engineering · <strong>UTP</strong>
							</li>
						</ul>

						{/* CTAs */}
						<div className="hero-ctas">
							<button
								onClick={handleScrollToContact}
								className="hero-btn hero-btn-primary">
								<span className="hero-btn-glow" />
								<span className="hero-btn-text">Let's Connect</span>
							</button>
							<button
								onClick={scrollToJourney}
								className="hero-btn hero-btn-secondary">
								<span className="hero-btn-text">My Journey</span>
								<FaArrowDown className="hero-btn-arrow" />
							</button>
						</div>

						{/* Social */}
						<div className="hero-social">
							<a
								href="https://www.linkedin.com/in/gabriel-zapata-239501287/"
								target="_blank"
								rel="noopener noreferrer"
								className="hero-social-link"
								style={{ "--social-color": "#0A66C2" } as React.CSSProperties}>
								<FaLinkedin />
							</a>
							<a
								href="https://github.com/angeldevmobile"
								target="_blank"
								rel="noopener noreferrer"
								className="hero-social-link"
								style={{ "--social-color": "#ffffff" } as React.CSSProperties}>
								<FaGithub />
							</a>
							<a
								href="https://www.producthunt.com/products/seam-4"
								target="_blank"
								rel="noopener noreferrer"
								className="hero-social-link"
								aria-label="Product Hunt"
								style={{ "--social-color": "#DA552F" } as React.CSSProperties}>
								<SiProducthunt />
							</a>
						</div>

						{/* Numbers */}
						<div className="hero-stats">
							{heroStats.map((s) => (
								<div key={s.label} className="hero-stat">
									<span className="hero-stat-value">{s.value}</span>
									<span className="hero-stat-label">{s.label}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Scroll indicator */}
				<div
					className={`hero-scroll-indicator ${loaded ? "visible" : ""}`}
					onClick={scrollToJourney}>
					<div className="hero-scroll-mouse">
						<div className="hero-scroll-wheel" />
					</div>
					<span className="hero-scroll-text">Scroll to explore</span>
				</div>
			</section>

			{/* ═══ PANEL 2: JOURNEY TIMELINE ═══ */}
			<section
				ref={journeyRef}
				className={`hero-journey ${journeyVisible ? "visible" : ""}`}>
				<div className="hero-journey-bg" />

				<div className="hero-journey-header">
					<span className="hero-journey-badge">🚀 My Journey</span>
					<h2 className="hero-journey-title">
						From Code to <span className="hero-name-gradient">Creation</span>
					</h2>
					<p className="hero-journey-subtitle">
						A timeline of growth, innovation, and the relentless pursuit of
						building something extraordinary.
					</p>
				</div>

				{/* Milestones */}
				<div className="hero-milestones">
					<div className="hero-milestone-line" />
					{milestones.map((ms, i) => (
						<div
							key={i}
							ref={(el) => {
								milestoneRefs.current[i] = el;
							}}
							className={`hero-milestone ${
								visibleMilestones[i] ? "visible" : ""
							}`}
							style={
								{
									"--ms-color": ms.color,
									"--ms-index": i,
								} as React.CSSProperties
							}>
							<div className="hero-ms-node">
								<span className="hero-ms-year">{ms.year}</span>
								<div className="hero-ms-dot" />
							</div>
							<div className="hero-ms-content">
								<h4 className="hero-ms-label">{ms.label}</h4>
								<p className="hero-ms-desc">{ms.description}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* ═══ PANEL 3: FLAGSHIP PROJECTS ═══ */}
			<section
				ref={projectsRef}
				className={`hero-projects ${projectsVisible ? "visible" : ""}`}>
				<div className="hero-projects-header">
					<span className="hero-journey-badge">⚡ Flagship Projects</span>
					<h2 className="hero-journey-title">
						What I'm <span className="hero-name-gradient">Building</span>
					</h2>
				</div>

				<div className="hero-projects-grid">
					{/* Flux */}
					<div
						className="hero-project-card"
						style={
							{
								"--proj-color-1": "#8b5cf6",
								"--proj-color-2": "#6366f1",
							} as React.CSSProperties
						}>
						<div className="hero-proj-glow" />
						<div className="hero-proj-inner">
							<div className="hero-proj-svg-wrapper">
								<FluxSVG />
							</div>
							<div className="hero-proj-status">
								<span className="hero-proj-status-dot active" />
								Public Beta · v0.3.0
							</div>
							<h3 className="hero-proj-name">Flux</h3>
							<p className="hero-proj-role">Creator & Lead Developer</p>
							<p className="hero-proj-desc">
								Open-source desktop API client built with Tauri and Rust: HTTP, WebSocket, SSE, gRPC and GraphQL, with AI-generated tests, load testing and mock servers in under 30 MB of RAM.
							</p>
							<div className="hero-proj-tech">
								{["Rust","Tauri","React","TypeScript","gRPC","Claude API"].map((t) => (
									<span key={t} className="hero-proj-tag">
										{t}
									</span>
								))}
							</div>
							<PHBadge
								name="Flux"
								postId="1227262"
								url="https://www.producthunt.com/products/flux-modern-api-client?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-flux-modern-api-client-2"
							/>
						</div>
					</div>

					{/* Orion Language */}
					<div
						className="hero-project-card"
						style={
							{
								"--proj-color-1": "#ec4899",
								"--proj-color-2": "#f59e0b",
							} as React.CSSProperties
						}>
						<div className="hero-proj-glow" />
						<div className="hero-proj-inner">
							<div className="hero-proj-svg-wrapper">
								<OrionLangSVG />
							</div>
							<div className="hero-proj-status">
								<span className="hero-proj-status-dot building" />
								Public Beta · v0.4.0
							</div>
							<h3 className="hero-proj-name">Orion Language</h3>
							<p className="hero-proj-role">Language Designer & Core Developer</p>
							<p className="hero-proj-desc">
								Backend, automation and HPC language written in Rust: a bytecode VM, a Cranelift JIT and AOT native binaries, 58 built-in modules, plus an LSP and debugger for VS Code.
							</p>
							<div className="hero-proj-tech">
								{["Rust","Cranelift","Bytecode VM","LSP","DAP"].map((t) => (
									<span key={t} className="hero-proj-tag">
										{t}
									</span>
								))}
							</div>
							<PHBadge
								name="Orion Language"
								postId="1210278"
								url="https://www.producthunt.com/products/orion-language?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-orion-language"
							/>
						</div>
					</div>
				</div>

				{/* Code preview */}
				<div className="hero-code-preview">
					<div className="hero-code-window">
						<div className="hero-code-titlebar">
							<div className="hero-code-dots">
								<span className="hero-code-dot red" />
								<span className="hero-code-dot yellow" />
								<span className="hero-code-dot green" />
							</div>
							<span className="hero-code-filename">main.orx</span>
						</div>
						<pre className="hero-code-body">
								<code>
								<span className="code-keyword">use</span> <span className="code-module">net</span>{"\n"}
								<span className="code-keyword">use</span> <span className="code-module">json</span>{"\n"}
								{"\n"}
								<span className="code-var">PORT</span> <span className="code-op">=</span> <span className="code-bool">8080</span>{"\n"}
								{"\n"}
								<span className="code-comment">-- Router: handles every incoming request</span>{"\n"}
								<span className="code-keyword">fn</span> <span className="code-func">router</span>(<span className="code-var">req</span>) {"{"}{"\n"}
								{"    "}<span className="code-keyword">if</span> <span className="code-var">req</span>[<span className="code-string">"path"</span>] <span className="code-op">==</span> <span className="code-string">"/ping"</span> {"{"}{"\n"}
								{"        "}<span className="code-keyword">return</span> {"{ "}<span className="code-string">"status"</span>: <span className="code-bool">200</span>, <span className="code-string">"body"</span>: <span className="code-string">"pong"</span>{" }"}{"\n"}
								{"    }"}{"\n"}
								{"    "}<span className="code-keyword">return</span> {"{ "}<span className="code-string">"status"</span>: <span className="code-bool">404</span>, <span className="code-string">"body"</span>: <span className="code-string">"Not found"</span>{" }"}{"\n"}
								{"}"}{"\n"}
								{"\n"}
								<span className="code-keyword">show</span> <span className="code-string">"Listening on port "</span> <span className="code-op">+</span> <span className="code-func">str</span>(<span className="code-var">PORT</span>){"\n"}
								<span className="code-keyword">serve</span> <span className="code-var">PORT</span> <span className="code-var">router</span>
								</code>
						</pre>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HeroSection;

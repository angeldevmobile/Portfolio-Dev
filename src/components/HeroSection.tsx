import React, { useRef, useEffect, useState, useCallback } from "react";
import { FaLinkedin, FaGithub, FaArrowDown } from "react-icons/fa";
import { SiX } from "react-icons/si";
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

const OrionLogoSVG = () => (
	<svg className="hero-project-svg" viewBox="0 0 80 80" fill="none">
		<defs>
			<linearGradient id="orionHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#a855f7" />
				<stop offset="50%" stopColor="#3b82f6" />
				<stop offset="100%" stopColor="#06b6d4" />
			</linearGradient>
			<filter id="orionGlow" x="-50%" y="-50%" width="200%" height="200%">
				<feGaussianBlur stdDeviation="3" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>
		{/* Outer ring */}
		<circle
			cx="40"
			cy="40"
			r="32"
			stroke="url(#orionHeroGrad)"
			strokeWidth="2"
			fill="none"
			opacity="0.6"
			filter="url(#orionGlow)">
			<animateTransform
				attributeName="transform"
				type="rotate"
				from="0 40 40"
				to="360 40 40"
				dur="20s"
				repeatCount="indefinite"
			/>
		</circle>
		{/* Inner ring */}
		<circle
			cx="40"
			cy="40"
			r="22"
			stroke="url(#orionHeroGrad)"
			strokeWidth="1.5"
			fill="none"
			opacity="0.4"
			strokeDasharray="6 4">
			<animateTransform
				attributeName="transform"
				type="rotate"
				from="360 40 40"
				to="0 40 40"
				dur="15s"
				repeatCount="indefinite"
			/>
		</circle>
		{/* Core */}
		<circle
			cx="40"
			cy="40"
			r="10"
			fill="url(#orionHeroGrad)"
			opacity="0.8"
			filter="url(#orionGlow)">
			<animate
				attributeName="r"
				values="10;12;10"
				dur="3s"
				repeatCount="indefinite"
			/>
		</circle>
		<circle cx="40" cy="40" r="5" fill="#0a0a1a" opacity="0.6" />
		{/* Orbital dots */}
		<circle cx="40" cy="8" r="3" fill="#a855f7" opacity="0.8">
			<animateTransform
				attributeName="transform"
				type="rotate"
				from="0 40 40"
				to="360 40 40"
				dur="20s"
				repeatCount="indefinite"
			/>
		</circle>
		<circle cx="62" cy="40" r="2.5" fill="#3b82f6" opacity="0.7">
			<animateTransform
				attributeName="transform"
				type="rotate"
				from="120 40 40"
				to="480 40 40"
				dur="15s"
				repeatCount="indefinite"
			/>
		</circle>
		<circle cx="28" cy="62" r="2" fill="#06b6d4" opacity="0.6">
			<animateTransform
				attributeName="transform"
				type="rotate"
				from="240 40 40"
				to="600 40 40"
				dur="18s"
				repeatCount="indefinite"
			/>
		</circle>
		{/* Text O */}
		<text
			x="40"
			y="44"
			textAnchor="middle"
			fill="#fff"
			fontSize="14"
			fontWeight="800"
			opacity="0.9"
			fontFamily="monospace">
			O
		</text>
	</svg>
);

const JarvisSVG = () => (
	<svg className="hero-project-svg" viewBox="0 0 80 80" fill="none">
		<defs>
			<linearGradient id="jarvisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#06b6d4" />
				<stop offset="100%" stopColor="#22c55e" />
			</linearGradient>
			<filter id="jarvisGlow" x="-50%" y="-50%" width="200%" height="200%">
				<feGaussianBlur stdDeviation="2" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>
		{/* Head outline */}
		<path
			d="M25 50 L25 30 Q25 16 40 16 Q55 16 55 30 L55 50 Q55 60 40 62 Q25 60 25 50 Z"
			fill="none"
			stroke="url(#jarvisGrad)"
			strokeWidth="2"
			filter="url(#jarvisGlow)"
			opacity="0.8"
		/>
		{/* Eyes */}
		<ellipse cx="33" cy="35" rx="4" ry="3" fill="#06b6d4" opacity="0.9">
			<animate
				attributeName="opacity"
				values="0.9;0.3;0.9"
				dur="3s"
				repeatCount="indefinite"
			/>
		</ellipse>
		<ellipse cx="47" cy="35" rx="4" ry="3" fill="#22c55e" opacity="0.9">
			<animate
				attributeName="opacity"
				values="0.9;0.3;0.9"
				dur="3s"
				begin="0.3s"
				repeatCount="indefinite"
			/>
		</ellipse>
		{/* Eye details */}
		<circle cx="34" cy="35" r="1.5" fill="#fff" opacity="0.6" />
		<circle cx="48" cy="35" r="1.5" fill="#fff" opacity="0.6" />
		{/* Mouth / speaker */}
		<rect
			x="34"
			y="46"
			width="12"
			height="2"
			rx="1"
			fill="url(#jarvisGrad)"
			opacity="0.5">
			<animate
				attributeName="width"
				values="12;8;12"
				dur="1.5s"
				repeatCount="indefinite"
			/>
			<animate
				attributeName="x"
				values="34;36;34"
				dur="1.5s"
				repeatCount="indefinite"
			/>
		</rect>
		{/* Signal waves */}
		<path
			d="M58 28 Q64 32 58 36"
			fill="none"
			stroke="#22c55e"
			strokeWidth="1.5"
			opacity="0.4">
			<animate
				attributeName="opacity"
				values="0.4;0;0.4"
				dur="2s"
				repeatCount="indefinite"
			/>
		</path>
		<path
			d="M62 24 Q72 32 62 40"
			fill="none"
			stroke="#06b6d4"
			strokeWidth="1"
			opacity="0.3">
			<animate
				attributeName="opacity"
				values="0.3;0;0.3"
				dur="2s"
				begin="0.5s"
				repeatCount="indefinite"
			/>
		</path>
		{/* Antenna */}
		<line
			x1="40"
			y1="16"
			x2="40"
			y2="8"
			stroke="url(#jarvisGrad)"
			strokeWidth="1.5"
			opacity="0.5"
		/>
		<circle cx="40" cy="6" r="2.5" fill="url(#jarvisGrad)" opacity="0.7">
			<animate
				attributeName="r"
				values="2.5;3.5;2.5"
				dur="2s"
				repeatCount="indefinite"
			/>
		</circle>
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
		year: "2024",
		label: "Banking & AI",
		description: "AI Engineer at BBVA — building intelligent systems",
		color: "#3b82f6",
	},
	{
		year: "2025",
		label: "Orion AI",
		description: "Founded Orion AI — creating the future",
		color: "#a855f7",
	},
	{
		year: "2025",
		label: "Language Design",
		description: "Building the Orion programming language",
		color: "#ec4899",
	},
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
		"Founder @ Orion AI",
		"Full Stack Developer",
		"AI Engineer",
		"Language Designer",
		"Building the Future",
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
							Building AI-powered platforms, creating programming languages, and
							architecting scalable fintech solutions. Founder of{" "}
							<span className="hero-highlight hero-highlight-purple">
								Orion AI
							</span>{" "}
							— where intelligence meets innovation.
						</p>

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
								href="https://x.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="hero-social-link"
								style={{ "--social-color": "#ffffff" } as React.CSSProperties}>
								<SiX />
							</a>
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
					{/* Orion AI */}
					<div
						className="hero-project-card"
						style={
							{
								"--proj-color-1": "#a855f7",
								"--proj-color-2": "#3b82f6",
							} as React.CSSProperties
						}>
						<div className="hero-proj-glow" />
						<div className="hero-proj-inner">
							<div className="hero-proj-svg-wrapper">
								<OrionLogoSVG />
							</div>
							<div className="hero-proj-status">
								<span className="hero-proj-status-dot active" />
								Active Development
							</div>
							<h3 className="hero-proj-name">Orion AI Platform</h3>
							<p className="hero-proj-role">Founder & Lead Developer</p>
							<p className="hero-proj-desc">
								AI-powered platform integrating GPT-4, Claude & Gemini with
								automation tools and intelligent workflows for enterprise-grade
								solutions.
							</p>
							<div className="hero-proj-tech">
								{[
									"React",
									"TypeScript",
									"Node.js",
									"PostgreSQL",
									"OpenAI",
									"Claude",
								].map((t) => (
									<span key={t} className="hero-proj-tag">
										{t}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* Jarvis AI */}
					<div
						className="hero-project-card"
						style={
							{
								"--proj-color-1": "#06b6d4",
								"--proj-color-2": "#22c55e",
							} as React.CSSProperties
						}>
						<div className="hero-proj-glow" />
						<div className="hero-proj-inner">
							<div className="hero-proj-svg-wrapper">
								<JarvisSVG />
							</div>
							<div className="hero-proj-status">
								<span className="hero-proj-status-dot active" />
								In Progress
							</div>
							<h3 className="hero-proj-name">Jarvis — Autonomous AI</h3>
							<p className="hero-proj-role">AI Architect & Developer</p>
							<p className="hero-proj-desc">
								Autonomous AI assistant with voice control, task execution,
								system automation, and multi-modal intelligence powered by
								cutting-edge LLMs.
							</p>
							<div className="hero-proj-tech">
								{[
									"Python",
									"LangChain",
									"GPT-4",
									"Whisper",
									"FastAPI",
									"Docker",
								].map((t) => (
									<span key={t} className="hero-proj-tag">
										{t}
									</span>
								))}
							</div>
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
								Interpreter Phase
							</div>
							<h3 className="hero-proj-name">Orion Language</h3>
							<p className="hero-proj-role">
								Language Designer & Core Developer
							</p>
							<p className="hero-proj-desc">
								Modern interpreted programming language with clean syntax,
								built-in concurrency, powerful metaprogramming, and
								Spanish-friendly keywords.
							</p>
							<div className="hero-proj-tech">
								{[
									"Python",
									"ANTLR4",
									"Custom Parser",
									"AST",
									"Bytecode VM",
								].map((t) => (
									<span key={t} className="hero-proj-tag">
										{t}
									</span>
								))}
							</div>
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
								<span className="code-keyword">use</span>{" "}
								<span className="code-module">ai</span>
								{"\n"}
								<span className="code-keyword">use</span>{" "}
								<span className="code-module">json</span>
								{"\n"}
								{"\n"}
								<span className="code-comment">
									-- Initialize Orion AI agent
								</span>
								{"\n"}
								<span className="code-var">agent</span>{" "}
								<span className="code-op">=</span>{" "}
								<span className="code-module">ai</span>.
								<span className="code-func">create</span>(
								<span className="code-string">"orion-v1"</span>){"\n"}
								<span className="code-var">agent</span>.
								<span className="code-func">configure</span>
								{"({"}
								{"\n"}
								{"  "}
								<span className="code-prop">model</span>:{" "}
								<span className="code-string">"gpt-4"</span>,{"\n"}
								{"  "}
								<span className="code-prop">memory</span>:{" "}
								<span className="code-bool">true</span>,{"\n"}
								{"  "}
								<span className="code-prop">tools</span>: [
								<span className="code-string">"search"</span>,{" "}
								<span className="code-string">"code"</span>,{" "}
								<span className="code-string">"analyze"</span>]{"\n"}
								{"})"}
								{"\n"}
								{"\n"}
								<span className="code-comment">-- Execute autonomous task</span>
								{"\n"}
								<span className="code-var">result</span>{" "}
								<span className="code-op">=</span>{" "}
								<span className="code-var">agent</span>.
								<span className="code-func">run</span>(
								<span className="code-string">"Build me a REST API"</span>)
								{"\n"}
								<span className="code-keyword">show</span>(
								<span className="code-var">result</span>.
								<span className="code-prop">output</span>)
							</code>
						</pre>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HeroSection;

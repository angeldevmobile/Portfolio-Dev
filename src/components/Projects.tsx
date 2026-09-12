import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBook,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaCopy,
  FaDownload,
  FaExternalLinkAlt,
  FaGithub,
  FaLock,
  FaPlay,
  FaTimes,
} from "react-icons/fa";
import {
  SiAnthropic,
  SiDart,
  SiDocker,
  SiExpo,
  SiFlutter,
  SiJavascript,
  SiJest,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiProducthunt,
  SiPypi,
  SiPython,
  SiRadixui,
  SiReact,
  SiRender,
  SiRust,
  SiSpringboot,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTauri,
  SiTurborepo,
  SiTypescript,
  SiVercel,
  SiVite,
  SiWebassembly,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import "./css/Projects.css";

import fluxApp from "../assets/projects/flux-app.png";
import fluxApp2 from "../assets/projects/flux-app-2.png";
import fluxApp3 from "../assets/projects/flux-app-3.png";
import fluxSite from "../assets/projects/flux-site.png";
import fluxLearning from "../assets/projects/flux-learning.png";
import orionVscode from "../assets/projects/orion-vscode.jpeg";
import orionTerminal from "../assets/projects/orion-terminal.jpeg";
import orionExcel from "../assets/projects/orion-excel.jpeg";
import orionDocs from "../assets/projects/orion-docs.png";
import orionMarketplace from "../assets/projects/orion-marketplace.png";
import orionCli from "../assets/projects/orion-cli.png";
import orionPlayground from "../assets/projects/orion-playground.png";
import smartFeature from "../assets/projects/smartremote-feature.png";
import smartRemote from "../assets/projects/smartremote-remote.png";
import smartVoice from "../assets/projects/smartremote-voice.png";
import portfolioShot from "../assets/web.png";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

type Filter = "All" | "Products" | "Orion Ecosystem" | "Open Source" | "Mobile" | "Web";
type StatusTone = "live" | "beta" | "dev";
type PreviewKind = "desktop" | "browser" | "phone" | "code";
type LinkKind = "live" | "github" | "download" | "docs" | "play" | "marketplace" | "package";

interface ProjectLink {
  label: string;
  url: string;
  kind: LinkKind;
}

interface ProjectImage {
  src: string;
  alt: string;
}

interface Project {
  id: string;
  title: string;
  tagline: string;
  kind: string;
  period: string;
  status: string;
  tone: StatusTone;
  accent: [string, string];
  size: "md" | "lg" | "xl";
  filters: Filter[];
  summary: string;
  highlights: string[];
  metrics?: { value: string; label: string }[];
  stack: string[];
  preview: PreviewKind;
  previewUrl?: string;
  images: ProjectImage[];
  links: ProjectLink[];
  privateRepo?: boolean;
  install?: { label: string; cmd: string }[];
  productHunt?: { url: string; postId: string };
}

const FILTERS: Filter[] = ["All", "Products", "Orion Ecosystem", "Open Source", "Mobile", "Web"];

const phBadgeSrc = (postId: string) =>
  `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${postId}&theme=dark`;

const projects: Project[] = [
  {
    id: "flux",
    title: "Flux",
    tagline: "Open-source desktop API client, a lightweight Postman alternative",
    kind: "Desktop App",
    period: "May 2026 – Present",
    status: "Public Beta · v0.3.0",
    tone: "beta",
    accent: ["#8b5cf6", "#6366f1"],
    size: "lg",
    filters: ["Products", "Open Source"],
    summary:
      "Native API client built with Tauri and Rust. HTTP, WebSocket, SSE, gRPC and GraphQL in one app, with AI-generated tests, load testing and local mock servers, all in under 30 MB of RAM.",
    highlights: [
      "Test HTTP, WebSocket, Server-Sent Events, gRPC and GraphQL from a single workspace",
      "AI test generation, error debugging and failing-test fixes powered by Claude",
      "Built-in load testing with P95 / P99 latency reports",
      "Zero-config local mock server with AI-generated response bodies",
      "Collections, environments and optional Supabase cloud sync with row-level security",
      "CLI runner for GitHub Actions and Jenkins pipelines",
    ],
    metrics: [
      { value: "<30 MB", label: "RAM usage" },
      { value: "5", label: "protocols" },
      { value: "3", label: "desktop OSes" },
    ],
    stack: [
      "Rust",
      "Tauri",
      "React",
      "TypeScript",
      "Tokio",
      "gRPC",
      "Axum",
      "SQLite",
      "Supabase",
      "Monaco Editor",
      "Claude API",
      "Zustand",
      "Radix UI",
      "Tailwind CSS",
    ],
    preview: "desktop",
    previewUrl: "Flux",
    images: [
      { src: fluxApp, alt: "Flux request editor with collections and the AI test generator" },
      { src: fluxApp2, alt: "Flux desktop app" },
      { src: fluxApp3, alt: "Flux desktop app" },
      { src: fluxSite, alt: "fluxapi.dev landing page" },
    ],
    productHunt: {
      url: "https://www.producthunt.com/products/flux-modern-api-client?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-flux-modern-api-client-2",
      postId: "1227262",
    },
    links: [
      { label: "fluxapi.dev", url: "https://fluxapi.dev/", kind: "live" },
      { label: "Download", url: "https://github.com/angeldevmobile/Flux-Post/releases/latest", kind: "download" },
      { label: "Source", url: "https://github.com/angeldevmobile/Flux-Post", kind: "github" },
    ],
  },
  {
    id: "flux-learning",
    title: "Flux Learning",
    tagline: "AI flashcards with spaced repetition",
    kind: "Web & Mobile",
    period: "Apr 2026 – Present",
    status: "In Production",
    tone: "live",
    accent: ["#a855f7", "#ec4899"],
    size: "md",
    filters: ["Products", "Web", "Mobile"],
    summary:
      "Upload a PDF, paste text or drop a YouTube link and the AI builds a deck in seconds. SM-2 spaced repetition, real-time duels, weekly leagues and a deck marketplace.",
    highlights: [
      "Deck generation from PDFs, YouTube transcripts, web pages and plain text",
      "SM-2 spaced repetition with adaptive study sessions",
      "AI explanations when you miss a card, plus contextual hints",
      "Real-time 1v1 duels, XP levels, weekly leagues and global leaderboards",
      "Deck marketplace and an institutional dashboard for groups",
      "Free, Pro and Institutional plans",
    ],
    metrics: [
      { value: "SM-2", label: "spaced repetition" },
      { value: "Live", label: "on Vercel" },
      { value: "2", label: "apps, one monorepo" },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Expo",
      "React Native",
      "Supabase",
      "Claude API",
      "Zustand",
      "Tailwind CSS",
      "Turborepo",
      "Jest",
      "Vercel",
    ],
    preview: "browser",
    previewUrl: "flux-learning-7g6f.vercel.app",
    images: [{ src: fluxLearning, alt: "Flux Learning landing page with the deck generator" }],
    links: [{ label: "Open the app", url: "https://flux-learning-7g6f.vercel.app/", kind: "live" }],
    privateRepo: true,
  },
  {
    id: "orion",
    title: "Orion Language",
    tagline: "A backend and automation language, written in Rust end to end",
    kind: "Programming Language",
    period: "2025 – Present",
    status: "Public Beta · v0.4.0",
    tone: "beta",
    accent: ["#3b82f6", "#06b6d4"],
    size: "xl",
    filters: ["Orion Ecosystem", "Open Source"],
    summary:
      "Compiles to bytecode and runs on three backends that share one frontend: a bytecode VM, a Cranelift JIT and AOT native binaries. One executable, 58 built-in modules, no runtime to install.",
    highlights: [
      "Three execution backends: bytecode VM (no GIL), Cranelift JIT with VM fallback, and AOT to a native binary",
      "58 standard library modules: HTTP server and client, WebSockets, CSV / Excel, data frames, crypto, S3, SSH, Docker, LLMs and embeddings",
      "Optional typing, native OOP, async / await and structured error handling",
      "Built-in tooling: REPL, watch mode, test runner, benchmarks and project scaffolding",
      "Package manager backed by a GitHub-based registry (orion --add / --publish)",
      "Language server and debugger (LSP + DAP) shipped through the VS Code extension",
    ],
    metrics: [
      { value: "3", label: "execution backends" },
      { value: "58", label: "stdlib modules" },
      { value: "1", label: "binary, no runtime" },
    ],
    stack: ["Rust", "Cranelift", "Bytecode VM", "AOT Compilation", "Compiler Design", "LSP", "DAP", "Tokio"],
    preview: "desktop",
    previewUrl: "ORION-LANGUAGE · VS Code",
    images: [
      { src: orionVscode, alt: "Orion code generating an Excel report, running in VS Code" },
      { src: orionTerminal, alt: "Orion script output in the terminal" },
      { src: orionExcel, alt: "Excel report produced by an Orion script" },
      { src: orionDocs, alt: "Orion documentation site" },
    ],
    productHunt: {
      url: "https://www.producthunt.com/products/orion-language?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-orion-language",
      postId: "1210278",
    },
    links: [
      { label: "Documentation", url: "https://docs-orion.onrender.com/", kind: "docs" },
      { label: "Playground", url: "https://docs-orion.onrender.com/playground", kind: "play" },
      { label: "Source", url: "https://github.com/angeldevmobile/Orion", kind: "github" },
    ],
  },
  {
    id: "seam",
    title: "Seam",
    tagline: "One schema. Every language. No drift.",
    kind: "Open-source Library",
    period: "Aug 2026 – Present",
    status: "Published · v0.1.3",
    tone: "live",
    accent: ["#f97316", "#eab308"],
    size: "md",
    filters: ["Open Source"],
    summary:
      "A cross-language data contract with a Rust core. Write validation once in a .seam file, and Python, Node and the browser enforce identical rules, including dates, 64-bit integers and absent vs null.",
    highlights: [
      "Hand-written Rust core with zero dependencies; schemas are loaded and compiled at runtime",
      "Bindings: PyO3 for Python, napi-rs for Node, wasm-bindgen for the browser (55 KiB brotli)",
      "Custom JSON parser keeps 64-bit integers exact, surfaced as bigint in JavaScript",
      "Tells absent apart from null in every language",
      "Generates Python TypedDicts and TypeScript interfaces",
      "95-case conformance suite that runs identically against every binding",
    ],
    metrics: [
      { value: "3", label: "registries" },
      { value: "95", label: "conformance tests" },
      { value: "55 KiB", label: "WASM build" },
    ],
    stack: ["Rust", "PyO3", "napi-rs", "wasm-bindgen", "WebAssembly", "Python", "TypeScript", "Node.js"],
    preview: "code",
    images: [],
    install: [
      { label: "Rust", cmd: "cargo add seam-core" },
      { label: "Python", cmd: "pip install seam-schema" },
      { label: "Node", cmd: "npm install seam-schema" },
      { label: "Browser", cmd: "npm install seam-schema-wasm" },
    ],
    productHunt: {
      url: "https://www.producthunt.com/products/seam-4?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-seam-4",
      postId: "1242240",
    },
    links: [
      { label: "Source", url: "https://github.com/angeldevmobile/Seam", kind: "github" },
      { label: "crates.io", url: "https://crates.io/crates/seam-core", kind: "package" },
      { label: "PyPI", url: "https://pypi.org/project/seam-schema/", kind: "package" },
      { label: "npm", url: "https://www.npmjs.com/package/seam-schema", kind: "package" },
    ],
  },
  {
    id: "orion-vscode",
    title: "Orion for VS Code",
    tagline: "The official Orion extension on the VS Code Marketplace",
    kind: "Developer Tooling",
    period: "Jul 2026 – Present",
    status: "On Marketplace",
    tone: "live",
    accent: ["#0ea5e9", "#6366f1"],
    size: "md",
    filters: ["Orion Ecosystem", "Open Source"],
    summary:
      "Syntax highlighting, IntelliSense, real compiler diagnostics, a REPL, watch mode, a test explorer and an HTTP route explorer for Orion projects.",
    highlights: [
      "Token-level highlighting for every Orion construct, including string interpolation",
      "IntelliSense with cross-file symbol resolution, hover docs and inlay type hints",
      "Real compiler diagnostics in the Problems panel",
      "Interactive REPL, watch mode and a test explorer that discovers test_*.orx files",
      "Visual tools: UML shape diagrams, HTTP route explorer and import graphs",
      "Documentation generator and a package manager UI",
    ],
    stack: ["JavaScript", "Node.js", "VS Code API", "LSP", "DAP"],
    preview: "browser",
    previewUrl: "marketplace.visualstudio.com",
    images: [
      { src: orionMarketplace, alt: "Orion Language listing on the VS Code Marketplace" },
      { src: orionCli, alt: "Orion REPL launched from the terminal" },
    ],
    links: [
      {
        label: "Marketplace",
        url: "https://marketplace.visualstudio.com/items?itemName=AngelZapata.oriondev",
        kind: "marketplace",
      },
      { label: "Source", url: "https://github.com/angeldevmobile/Extension-lenguaje-orion", kind: "github" },
    ],
  },
  {
    id: "orion-playground",
    title: "Orion Playground API",
    tagline: "Sandboxed code execution behind the Orion web playground",
    kind: "Backend Service",
    period: "Jul 2026",
    status: "Deployed",
    tone: "live",
    accent: ["#10b981", "#06b6d4"],
    size: "md",
    filters: ["Orion Ecosystem", "Open Source"],
    summary:
      "Receives Orion code over HTTP, runs it inside an isolated distroless container and returns the output as JSON. It powers the in-browser playground in the docs.",
    highlights: [
      "POST /run executes snippets and reports execution time",
      "10-second timeout and 10 KB code limit per request",
      "Sliding-window rate limit of 10 requests per minute per IP",
      "Multi-stage Docker build on a distroless image to keep the attack surface small",
      "Health and version endpoints for monitoring",
    ],
    stack: ["Rust", "Axum", "Tokio", "Docker", "Render"],
    preview: "browser",
    previewUrl: "docs-orion.onrender.com/playground",
    images: [
      { src: orionPlayground, alt: "Orion web playground editor" },
      { src: orionDocs, alt: "Orion documentation site" },
    ],
    links: [
      { label: "Try it", url: "https://docs-orion.onrender.com/playground", kind: "play" },
      { label: "Source", url: "https://github.com/angeldevmobile/PlayGround---API", kind: "github" },
    ],
  },
  {
    id: "smartremote",
    title: "SmartRemote",
    tagline: "Your phone is your TV remote",
    kind: "Mobile App",
    period: "Jul 2026 – Present",
    status: "Beta",
    tone: "beta",
    accent: ["#06b6d4", "#22d3ee"],
    size: "lg",
    filters: ["Mobile", "Open Source"],
    summary:
      "Flutter remote control for Smart TVs over local Wi-Fi. No ads, no accounts, no cloud: the phone talks directly to the TV.",
    highlights: [
      "LG webOS (WebSocket SSAP), Roku (ECP over HTTP) and Android / Google TV (Remote v2 over TLS + protobuf)",
      "Automatic TV discovery with SSDP and mDNS, following the TV when its IP changes",
      "One-time PIN pairing that is remembered across sessions",
      "D-pad and touchpad modes, volume, channels, number pad and app shortcuts",
      "Voice dictation to type on the TV",
      "Wake-on-LAN power on for webOS TVs",
    ],
    metrics: [
      { value: "3", label: "TV platforms" },
      { value: "0", label: "servers or accounts" },
      { value: "2", label: "targets: Android, iOS" },
    ],
    stack: ["Flutter", "Dart", "Riverpod", "WebSocket", "Protobuf", "TLS", "mDNS / SSDP", "Speech-to-Text"],
    preview: "phone",
    images: [
      { src: smartRemote, alt: "SmartRemote remote screen with D-pad, volume and channel controls" },
      { src: smartVoice, alt: "SmartRemote voice dictation screen" },
      { src: smartFeature, alt: "SmartRemote feature graphic: LG webOS, Android TV and Roku" },
    ],
    links: [{ label: "Source", url: "https://github.com/angeldevmobile/SmartController", kind: "github" }],
  },
  {
    id: "portfolio",
    title: "Portfolio & E-commerce",
    tagline: "This site, plus a full-stack store",
    kind: "Web",
    period: "2025 – Present",
    status: "Active",
    tone: "live",
    accent: ["#6366f1", "#a855f7"],
    size: "md",
    filters: ["Web", "Open Source"],
    summary:
      "Full-stack eCommerce platform with admin & user portals, secure payment processing and product management, alongside the developer portfolio you are looking at.",
    highlights: [
      "Admin and customer portals",
      "Secure payment processing and product management",
      "Animated, responsive developer portfolio",
    ],
    stack: ["React", "TypeScript", "Spring Boot", "Node.js", "Tailwind CSS", "Vite"],
    preview: "browser",
    previewUrl: "portfolio-angel-dev.onrender.com",
    images: [{ src: portfolioShot, alt: "Developer portfolio home page" }],
    links: [
      { label: "Live site", url: "https://portfolio-angel-dev.onrender.com/", kind: "live" },
      { label: "Source", url: "https://github.com/angeldevmobile/Portfolio-Dev", kind: "github" },
    ],
  },
];

const TECH: Record<string, { icon: IconType; color: string }> = {
  Rust: { icon: SiRust, color: "#f46623" },
  Tauri: { icon: SiTauri, color: "#ffc131" },
  React: { icon: SiReact, color: "#61dafb" },
  "React Native": { icon: SiReact, color: "#61dafb" },
  TypeScript: { icon: SiTypescript, color: "#3178c6" },
  JavaScript: { icon: SiJavascript, color: "#f7df1e" },
  "Next.js": { icon: SiNextdotjs, color: "#ffffff" },
  Supabase: { icon: SiSupabase, color: "#3fcf8e" },
  Expo: { icon: SiExpo, color: "#ffffff" },
  Flutter: { icon: SiFlutter, color: "#54c5f8" },
  Dart: { icon: SiDart, color: "#29b6f6" },
  Docker: { icon: SiDocker, color: "#2496ed" },
  Python: { icon: SiPython, color: "#ffd43b" },
  PyO3: { icon: SiPython, color: "#ffd43b" },
  WebAssembly: { icon: SiWebassembly, color: "#8b7cf6" },
  "wasm-bindgen": { icon: SiWebassembly, color: "#8b7cf6" },
  "Node.js": { icon: SiNodedotjs, color: "#5fa04e" },
  "napi-rs": { icon: SiNodedotjs, color: "#5fa04e" },
  "Spring Boot": { icon: SiSpringboot, color: "#6db33f" },
  Render: { icon: SiRender, color: "#46e3b7" },
  Turborepo: { icon: SiTurborepo, color: "#ef4444" },
  SQLite: { icon: SiSqlite, color: "#74c3f0" },
  "Radix UI": { icon: SiRadixui, color: "#ffffff" },
  Jest: { icon: SiJest, color: "#c21325" },
  Vite: { icon: SiVite, color: "#8a8fff" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38bdf8" },
  "Claude API": { icon: SiAnthropic, color: "#d97757" },
  Vercel: { icon: SiVercel, color: "#ffffff" },
  "VS Code API": { icon: VscVscode, color: "#3ea6f0" },
  "Monaco Editor": { icon: VscVscode, color: "#3ea6f0" },
};

const SHIPPED_ON: { label: string; icon: IconType; color: string }[] = [
  { label: "GitHub Releases", icon: FaGithub, color: "#ffffff" },
  { label: "Vercel", icon: SiVercel, color: "#ffffff" },
  { label: "VS Code Marketplace", icon: VscVscode, color: "#3ea6f0" },
  { label: "crates.io", icon: SiRust, color: "#f46623" },
  { label: "PyPI", icon: SiPypi, color: "#6aa5e8" },
  { label: "npm", icon: SiNpm, color: "#cb3837" },
];

const LINK_ICON: Record<LinkKind, IconType> = {
  live: FaExternalLinkAlt,
  github: FaGithub,
  download: FaDownload,
  docs: FaBook,
  play: FaPlay,
  marketplace: VscVscode,
  package: FaExternalLinkAlt,
};

const EASE = [0.16, 1, 0.3, 1] as const;

/* ═══════════════════════════════════════════
   SMALL PIECES
   ═══════════════════════════════════════════ */

const StatusBadge: React.FC<{ status: string; tone: StatusTone }> = ({ status, tone }) => (
  <span className={`pj-status pj-status--${tone}`}>
    <span className="pj-status-dot" />
    {status}
  </span>
);

const TechChip: React.FC<{ name: string; large?: boolean }> = ({ name, large }) => {
  const tech = TECH[name];
  const Icon = tech?.icon;
  return (
    <span className={`pj-chip ${large ? "pj-chip--lg" : ""}`}>
      {Icon ? <Icon style={{ color: tech.color }} aria-hidden /> : <span className="pj-chip-dot" aria-hidden />}
      {name}
    </span>
  );
};

const CountUp: React.FC<{ to: number; suffix?: string }> = ({ to, suffix = "" }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

/* Seam no tiene capturas: se muestra un schema .seam real del README */
const SEAM_FIELDS: { name: string; type: string; note?: string; comment?: boolean }[] = [
  { name: "id", type: "u64" },
  { name: "name", type: "String", note: "@min_len(3)" },
  { name: "contact", type: "String", note: "@format(email)" },
  { name: "plan", type: "enum { free, pro }" },
  { name: "nickname", type: "String?", note: "// may be null", comment: true },
  { name: "bio", type: "optional String", note: "// may be absent", comment: true },
];

const CodePreview: React.FC<{ large?: boolean }> = ({ large }) => (
  <div className={`pj-code ${large ? "pj-code--lg" : ""}`}>
    <div className="pj-window-bar">
      <span className="pj-dots">
        <i />
        <i />
        <i />
      </span>
      <span className="pj-window-title">user.seam</span>
    </div>
    <pre className="pj-code-body">
      <motion.span
        className="pj-code-line"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <span className="tk-kw">schema</span> <span className="tk-ty">User</span> {"{"}
      </motion.span>
      {SEAM_FIELDS.map((f, i) => (
        <motion.span
          key={f.name}
          className="pj-code-line"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 * (i + 1), ease: EASE }}
        >
          {"  "}
          <span className="tk-id">{`${f.name}:`.padEnd(10)}</span>
          <span className="tk-ty">{f.type.padEnd(16)}</span>
          {f.note && <span className={f.comment ? "tk-cm" : "tk-at"}>{f.note}</span>}
        </motion.span>
      ))}
      <motion.span
        className="pj-code-line"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.08 * (SEAM_FIELDS.length + 1) }}
      >
        {"}"}
        <span className="pj-code-caret" />
      </motion.span>
    </pre>
    <div className="pj-code-registries">
      <span>
        <SiRust style={{ color: "#f46623" }} /> crates.io
      </span>
      <span>
        <SiPypi style={{ color: "#6aa5e8" }} /> PyPI
      </span>
      <span>
        <SiNpm style={{ color: "#cb3837" }} /> npm
      </span>
    </div>
  </div>
);

const Crossfade: React.FC<{ images: ProjectImage[]; index: number; className?: string }> = ({
  images,
  index,
  className = "",
}) => {
  const img = images[index % images.length];
  return (
    <AnimatePresence initial={false}>
      <motion.img
        key={img.src}
        src={img.src}
        alt={img.alt}
        className={`pj-shot ${className}`}
        loading="lazy"
        draggable={false}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      />
    </AnimatePresence>
  );
};

const Preview: React.FC<{ project: Project; frame: number }> = ({ project, frame }) => {
  if (project.preview === "code") {
    return (
      <div className="pj-preview pj-preview--code">
        <CodePreview />
      </div>
    );
  }

  if (project.preview === "phone") {
    const [main, second, feature] = project.images;
    return (
      <div className="pj-preview pj-preview--phone">
        {feature && <img src={feature.src} alt="" className="pj-phone-feature" aria-hidden draggable={false} />}
        <div className="pj-phones">
          {second && (
            <div className="pj-phone pj-phone--back">
              <img src={second.src} alt={second.alt} loading="lazy" draggable={false} />
            </div>
          )}
          <div className="pj-phone pj-phone--front">
            <img src={main.src} alt={main.alt} loading="lazy" draggable={false} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`pj-preview pj-preview--${project.preview}`}>
      <div className="pj-window">
        <div className="pj-window-bar">
          <span className="pj-dots">
            <i />
            <i />
            <i />
          </span>
          {project.preview === "browser" ? (
            <span className="pj-url">
              <FaLock aria-hidden /> {project.previewUrl}
            </span>
          ) : (
            <span className="pj-window-title">{project.previewUrl}</span>
          )}
        </div>
        <div className="pj-window-screen">
          <Crossfade images={project.images} index={frame} />
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   CARD
   ═══════════════════════════════════════════ */

interface CardProps {
  project: Project;
  size: Project["size"];
  order: number;
  onOpen: (p: Project) => void;
}

const ProjectCard = React.forwardRef<HTMLElement, CardProps>(({ project, size, order, onOpen }, ref) => {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [frame, setFrame] = useState(0);

  const px = useMotionValue(-600);
  const py = useMotionValue(-600);
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(ny, [0, 1], [5, -5]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(nx, [0, 1], [-5, 5]), { stiffness: 180, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${px}px ${py}px, var(--pj-spot), transparent 65%)`;

  // En hover, las capturas rotan solas
  useEffect(() => {
    if (!hovered || project.images.length < 2 || reduceMotion) return;
    const id = window.setInterval(() => setFrame((f) => f + 1), 1900);
    return () => window.clearInterval(id);
  }, [hovered, project.images.length, reduceMotion]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set(e.clientX - rect.left);
    py.set(e.clientY - rect.top);
    if (!reduceMotion) {
      nx.set((e.clientX - rect.left) / rect.width);
      ny.set((e.clientY - rect.top) / rect.height);
    }
  };

  const handleLeave = () => {
    setHovered(false);
    nx.set(0.5);
    ny.set(0.5);
    px.set(-600);
    py.set(-600);
  };

  const quickLinks = project.links.filter((l) => l.kind === "github" || l.kind === "live" || l.kind === "play" || l.kind === "marketplace").slice(0, 2);

  return (
    <motion.article
      ref={ref}
      layout
      className={`pj-card pj-card--${size}`}
      style={
        {
          "--pj-a1": project.accent[0],
          "--pj-a2": project.accent[1],
          "--pj-spot": `${project.accent[0]}24`,
        } as React.CSSProperties
      }
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.8, delay: (order % 3) * 0.1, ease: EASE, layout: { duration: 0.5, ease: EASE } }}
    >
      <motion.div
        className="pj-card-tilt"
        style={{ rotateX, rotateY, transformPerspective: 1400 }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={() => onOpen(project)}
      >
        <span className="pj-card-border" aria-hidden />
        <motion.span className="pj-card-spot" style={{ background: spotlight }} aria-hidden />

        <Preview project={project} frame={frame} />

        <div className="pj-card-body">
          <div className="pj-card-meta">
            <StatusBadge status={project.status} tone={project.tone} />
            <span className="pj-kind">{project.kind}</span>
          </div>

          <h3 className="pj-card-title">{project.title}</h3>
          <p className="pj-card-tagline">{project.tagline}</p>
          <p className="pj-card-summary">{project.summary}</p>

          {project.metrics && size !== "md" && (
            <div className="pj-metrics">
              {project.metrics.map((m) => (
                <div key={m.label} className="pj-metric">
                  <span className="pj-metric-value">{m.value}</span>
                  <span className="pj-metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="pj-chip-row">
            {project.stack.slice(0, size === "md" ? 4 : 6).map((t) => (
              <TechChip key={t} name={t} />
            ))}
            {project.stack.length > (size === "md" ? 4 : 6) && (
              <span className="pj-chip pj-chip--more">+{project.stack.length - (size === "md" ? 4 : 6)}</span>
            )}
          </div>

          <div className="pj-card-foot">
            <div className="pj-card-foot-left">
              <span className="pj-period">{project.period}</span>
              <div className="pj-quick-links">
                {quickLinks.map((l) => {
                  const Icon = LINK_ICON[l.kind];
                  return (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pj-quick-link"
                      aria-label={`${project.title}: ${l.label}`}
                      title={l.label}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon />
                    </a>
                  );
                })}
                {project.privateRepo && (
                  <span className="pj-quick-link pj-quick-link--muted" title="Private repository">
                    <FaLock />
                  </span>
                )}
                {project.productHunt && (
                  <a
                    href={project.productHunt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pj-quick-link pj-quick-link--ph"
                    aria-label={`${project.title} on Product Hunt`}
                    title="Featured on Product Hunt"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SiProducthunt />
                  </a>
                )}
              </div>
            </div>
            <button
              type="button"
              className="pj-open-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpen(project);
              }}
            >
              Details <FaArrowRight aria-hidden />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
});

ProjectCard.displayName = "ProjectCard";

/* ═══════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════ */

const InstallBlock: React.FC<{ items: { label: string; cmd: string }[] }> = ({ items }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(cmd);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      /* el portapapeles puede no estar disponible */
    }
  };

  return (
    <div className="pj-install">
      {items.map((it) => (
        <div key={it.cmd} className="pj-install-row">
          <span className="pj-install-label">{it.label}</span>
          <code>{it.cmd}</code>
          <button type="button" onClick={() => copy(it.cmd)} aria-label={`Copy ${it.cmd}`}>
            {copied === it.cmd ? <FaCheck /> : <FaCopy />}
          </button>
        </div>
      ))}
    </div>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = project.images.length;

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (count > 1 && e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (count > 1 && e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, onClose]);

  const current = project.images[index];

  return (
    <motion.div
      className="pj-modal-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="pj-modal-overlay" onClick={onClose} />
      <motion.div
        className="pj-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pj-modal-title"
        style={{ "--pj-a1": project.accent[0], "--pj-a2": project.accent[1] } as React.CSSProperties}
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        <button ref={closeRef} type="button" className="pj-modal-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        {/* Galería */}
        <div className={`pj-gallery ${project.preview === "phone" ? "pj-gallery--phone" : ""}`}>
          {count > 0 ? (
            <>
              <div className="pj-gallery-stage">
                <AnimatePresence initial={false} mode="wait">
                  <motion.img
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    className="pj-gallery-img"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                </AnimatePresence>
                {count > 1 && (
                  <>
                    <button
                      type="button"
                      className="pj-gallery-nav pj-gallery-nav--prev"
                      onClick={() => setIndex((i) => (i - 1 + count) % count)}
                      aria-label="Previous image"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      type="button"
                      className="pj-gallery-nav pj-gallery-nav--next"
                      onClick={() => setIndex((i) => (i + 1) % count)}
                      aria-label="Next image"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>
              {count > 1 && (
                <div className="pj-thumbs">
                  {project.images.map((img, i) => (
                    <button
                      type="button"
                      key={img.src}
                      className={`pj-thumb ${i === index ? "active" : ""}`}
                      onClick={() => setIndex(i)}
                      aria-label={`Show image ${i + 1}`}
                    >
                      <img src={img.src} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="pj-gallery-code">
              <CodePreview large />
            </div>
          )}
        </div>

        <div className="pj-modal-body">
          <div className="pj-modal-head">
            <div className="pj-card-meta">
              <StatusBadge status={project.status} tone={project.tone} />
              <span className="pj-kind">{project.kind}</span>
              <span className="pj-kind">{project.period}</span>
            </div>
            <h2 id="pj-modal-title" className="pj-modal-title">
              {project.title}
            </h2>
            <p className="pj-modal-tagline">{project.tagline}</p>
          </div>

          <div className="pj-modal-links">
            {project.links.map((l, i) => {
              const Icon = LINK_ICON[l.kind];
              return (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`pj-btn ${i === 0 ? "pj-btn--primary" : ""}`}
                >
                  <Icon aria-hidden /> {l.label}
                </a>
              );
            })}
            {project.privateRepo && (
              <span className="pj-btn pj-btn--ghost" title="The source code is in a private repository">
                <FaLock aria-hidden /> Private repository
              </span>
            )}
            {project.productHunt && (
              <a
                href={project.productHunt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-ph-badge"
              >
                <img
                  src={phBadgeSrc(project.productHunt.postId)}
                  alt={`${project.title} on Product Hunt`}
                  width={200}
                  height={43}
                  loading="lazy"
                />
              </a>
            )}
          </div>

          <div className="pj-modal-grid">
            <div>
              <p className="pj-modal-summary">{project.summary}</p>
              <h4 className="pj-modal-section">What it does</h4>
              <ul className="pj-highlights">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: EASE }}
                  >
                    <span className="pj-highlight-icon">
                      <FaCheck />
                    </span>
                    {h}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              {project.metrics && (
                <div className="pj-metrics pj-metrics--modal">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="pj-metric">
                      <span className="pj-metric-value">{m.value}</span>
                      <span className="pj-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <h4 className="pj-modal-section">Built with</h4>
              <div className="pj-chip-row">
                {project.stack.map((t) => (
                  <TechChip key={t} name={t} large />
                ))}
              </div>

              {project.install && (
                <>
                  <h4 className="pj-modal-section">Install</h4>
                  <InstallBlock items={project.install} />
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   SECTION
   ═══════════════════════════════════════════ */

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.filters.includes(filter))),
    [filter],
  );

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selected]);

  const countFor = (f: Filter) => (f === "All" ? projects.length : projects.filter((p) => p.filters.includes(f)).length);

  return (
    <section className="pj-section" id="projects">
      <div className="pj-bg" aria-hidden>
        <div className="pj-bg-grid" />
        <div className="pj-orb pj-orb--1" />
        <div className="pj-orb pj-orb--2" />
        <div className="pj-orb pj-orb--3" />
      </div>

      <div className="pj-container">
        <motion.header
          className="pj-header"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="pj-eyebrow">
            <span className="pj-eyebrow-dot" />
            Selected work
          </span>
          <h2 className="pj-title">
            Things I've <span className="pj-title-gradient">shipped</span>
          </h2>
          <p className="pj-subtitle">
            Developer tools, a programming language and products running in production. Every project here has a
            live link, published package or public source behind it.
          </p>
        </motion.header>

        <motion.div
          className="pj-stats"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <div className="pj-stat">
            <span className="pj-stat-value">
              <CountUp to={projects.length} />
            </span>
            <span className="pj-stat-label">projects</span>
          </div>
          <div className="pj-stat">
            <span className="pj-stat-value">
              <CountUp to={2} />
            </span>
            <span className="pj-stat-label">products live</span>
          </div>
          <div className="pj-stat">
            <span className="pj-stat-value">
              <CountUp to={4} />
            </span>
            <span className="pj-stat-label">packages published</span>
          </div>
          <div className="pj-stat">
            <span className="pj-stat-value">
              <CountUp to={58} />
            </span>
            <span className="pj-stat-label">Orion stdlib modules</span>
          </div>
        </motion.div>

        <motion.div
          className="pj-shipped"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="pj-shipped-label">Shipped on</span>
          {SHIPPED_ON.map(({ label, icon: Icon, color }) => (
            <span key={label} className="pj-shipped-item">
              <Icon style={{ color }} aria-hidden /> {label}
            </span>
          ))}
        </motion.div>

        <LayoutGroup>
          <div className="pj-filters" role="tablist" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                className={`pj-filter ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {filter === f && (
                  <motion.span
                    layoutId="pj-filter-pill"
                    className="pj-filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="pj-filter-label">{f}</span>
                <span className="pj-filter-count">{countFor(f)}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="pj-grid">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  size={filter === "All" ? p.size : "md"}
                  order={i}
                  onOpen={setSelected}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

// Header.tsx
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaGithub } from "react-icons/fa";
import "./css/header.css";

interface HeaderProps {
  setCurrentSection: (section: string) => void;
}

const navItems = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const Header: React.FC<HeaderProps> = ({ setCurrentSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const handleNavClick = (section: string) => {
    setCurrentSection(section);
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="header-inner">
          {/* Logo */}
          <button className="header-logo" onClick={() => handleNavClick("hero")}>
            <span className="logo-bracket">{"<"}</span>
            <span className="logo-text">Angel</span>
            <span className="logo-dot">.</span>
            <span className="logo-text-accent">dev</span>
            <span className="logo-bracket">{"/>"}</span>
          </button>

          {/* Desktop Nav */}
          <nav className="header-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? "nav-link-active" : ""}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
                {activeSection === item.id && <span className="nav-indicator" />}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="header-right">
            <a
              href="https://github.com/angeldevmobile"
              target="_blank"
              rel="noopener noreferrer"
              className="header-github-btn"
            >
              <FaGithub />
              <span className="github-btn-text">GitHub</span>
            </a>

            {/* Mobile toggle */}
            <button
              className={`header-mobile-toggle ${menuOpen ? "toggle-active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? "mobile-overlay-visible" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <nav className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        <div className="mobile-menu-header">
          <button className="header-logo" onClick={() => handleNavClick("hero")}>
            <span className="logo-bracket">{"<"}</span>
            <span className="logo-text">Angel</span>
            <span className="logo-dot">.</span>
            <span className="logo-text-accent">dev</span>
            <span className="logo-bracket">{"/>"}</span>
          </button>
          <button
            className="mobile-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mobile-menu-links">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              className={`mobile-link ${activeSection === item.id ? "mobile-link-active" : ""}`}
              onClick={() => handleNavClick(item.id)}
              style={{ "--link-index": index } as React.CSSProperties}
            >
              <span className="mobile-link-number">0{index + 1}</span>
              <span className="mobile-link-label">{item.label}</span>
              {activeSection === item.id && <span className="mobile-link-indicator" />}
            </button>
          ))}
        </div>

        <div className="mobile-menu-footer">
          <a
            href="https://github.com/angeldevmobile"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-github-btn"
          >
            <FaGithub />
            View GitHub Profile
          </a>
          <p className="mobile-footer-text">© 2026 Angel Zapata</p>
        </div>
      </nav>
    </>
  );
};

export default Header;

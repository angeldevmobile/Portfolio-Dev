import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import "./css/Footer.css";

interface FooterProps {
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
}

const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const PROJECT_LINKS = [
  { label: "Orion Language", url: "https://docs-orion.onrender.com/" },
  { label: "Orion Playground", url: "https://docs-orion.onrender.com/playground" },
  { label: "Flux", url: "https://fluxapi.dev/" },
  { label: "Flux Learning", url: "https://www.flux-learning.org/" },
  {
    label: "Orion for VS Code",
    url: "https://marketplace.visualstudio.com/items?itemName=AngelZapata.oriondev",
  },
];

const Footer: React.FC<FooterProps> = ({ setCurrentSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goTo = (section: string) => {
    setCurrentSection(section);
    scrollToTop();
  };

  return (
    <footer className="footer">
      <div className="footer-glow" />

      <div className="footer-inner">
        {/* Top divider */}
        <div className="footer-divider" />

        <div className="footer-content">
          {/* Brand */}
          <div className="footer-brand">
            <span className="footer-logo">
              <span className="footer-bracket">{"<"}</span>
              <span className="footer-logo-text">Angel</span>
              <span className="footer-dot">.</span>
              <span className="footer-logo-accent">dev</span>
              <span className="footer-bracket">{"/>"}</span>
            </span>
            <p className="footer-tagline">
              Building the future, one line of code at a time.
            </p>
            <div className="footer-meta">
              <span className="footer-status">
                <span className="footer-status-dot" />
                Open to new opportunities
              </span>
              <span className="footer-location">
                <FaMapMarkerAlt aria-hidden /> Perú
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="footer-col" aria-label="Footer navigation">
            <h4 className="footer-col-title">Navigate</h4>
            <ul className="footer-list">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button className="footer-link" onClick={() => goTo(link.id)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Projects */}
          <div className="footer-col">
            <h4 className="footer-col-title">Projects</h4>
            <ul className="footer-list">
              {PROJECT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link">
                    {link.label}
                    <FaExternalLinkAlt className="footer-link-ext" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">© 2024 Angel Zapata. All rights reserved.</p>

          <div className="footer-bottom-actions">
            <div className="footer-socials">
              <a
                href="https://github.com/angeldevmobile"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="GitHub">
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/gabriel-zapata-239501287/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              {/* Goes to the contact form: the address never ships in the bundle */}
              <button
                className="footer-social-link"
                onClick={() => goTo("contact")}
                aria-label="Contact">
                <FaEnvelope />
              </button>
            </div>

            <button className="footer-top-btn" onClick={scrollToTop} aria-label="Back to top">
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

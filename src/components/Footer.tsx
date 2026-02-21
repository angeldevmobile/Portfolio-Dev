import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from "react-icons/fa";
import "./css/Footer.css";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-glow" />

      <div className="footer-inner">
        {/* Top divider */}
        <div className="footer-divider" />

        <div className="footer-content">
          {/* Logo */}
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
          </div>

          {/* Social links */}
          <div className="footer-socials">
            <a
              href="https://github.com/angeldevmobile"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/gabriel-zapata-239501287/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:angel@example.com"
              className="footer-social-link"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>

          {/* Back to top */}
          <button className="footer-top-btn" onClick={scrollToTop} aria-label="Back to top">
            <FaArrowUp />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 Angel Zapata. All rights reserved.
          </p>
          <p className="footer-made">
            Made with <FaHeart className="footer-heart" /> and lots of coffee
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

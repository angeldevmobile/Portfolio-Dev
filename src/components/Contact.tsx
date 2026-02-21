import "./css/contact.css";
import React, { useState } from "react";
import {
  FaPaperPlane,
  FaEnvelope,
  FaUser,
  FaCommentDots,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
} from "react-icons/fa";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusType("success");
        setStatusMessage("Message sent successfully! I'll get back to you soon.");
        setFormData({ email: "", name: "", message: "" });
      } else {
        setStatusType("error");
        setStatusMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusType("error");
      setStatusMessage("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      {/* Background effects */}
      <div className="contact-bg">
        <div className="contact-glow contact-glow-1" />
        <div className="contact-glow contact-glow-2" />
      </div>

      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <span className="contact-badge">
            <FaEnvelope className="contact-badge-icon" />
            Get In Touch
          </span>
          <h2 className="contact-title">
            Let's Work{" "}
            <span className="contact-title-accent">Together</span>
          </h2>
          <p className="contact-subtitle">
            Have a project in mind or just want to say hello? I'd love to hear
            from you. Drop me a message and I'll respond as soon as possible.
          </p>
        </div>

        {/* Form Card */}
        <div className="contact-card">
          <div className="contact-card-glow" />

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                <FaUser className="form-label-icon" />
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="form-input"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email field */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                <FaEnvelope className="form-label-icon" />
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Message field */}
            <div className="form-group form-group-full">
              <label className="form-label" htmlFor="message">
                <FaCommentDots className="form-label-icon" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                className="form-textarea"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="form-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="form-spinner" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Status message FUERA del form */}
          {statusMessage && (
            <div className={`form-status form-status-${statusType}`}>
              {statusType === "success" ? (
                <FaCheckCircle />
              ) : (
                <FaExclamationCircle />
              )}
              <span>{statusMessage}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;

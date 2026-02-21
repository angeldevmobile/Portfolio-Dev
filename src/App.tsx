// App.tsx

import React, { useState, useRef } from 'react';
import Header from '../src/components/Header';
import HeroSection from '../src/components/HeroSection';
import Footer from '../src/components/Footer';
import Skills from '../src/components/Habilities';
import Experience from './components/Experience';
import Project from './components/Projects';
import Study from './components/Study';
import Contact from './components/Contact';
import { CSSTransition } from 'react-transition-group';
import './App.css'; 

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('hero'); 

  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen overflow-hidden text-white bg-dark">
      <Header setCurrentSection={setCurrentSection} />

      <CSSTransition
        nodeRef={heroRef}
        in={currentSection === 'hero'}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div ref={heroRef}>
          <HeroSection setCurrentSection={setCurrentSection} />
        </div>
      </CSSTransition>

      <CSSTransition
        nodeRef={skillsRef}
        in={currentSection === 'skills'}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div ref={skillsRef}>
          <Skills />
        </div>
      </CSSTransition>

      <CSSTransition
        nodeRef={experienceRef}
        in={currentSection === 'experience'}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div ref={experienceRef}>
          <Experience />
        </div>
      </CSSTransition>

      <CSSTransition
        nodeRef={projectsRef}
        in={currentSection === 'projects'}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div ref={projectsRef}>
          <Project />
        </div>
      </CSSTransition>

      <CSSTransition
        nodeRef={educationRef}
        in={currentSection === 'education'}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div ref={educationRef}>
          <Study />
        </div>
      </CSSTransition>

      <CSSTransition
        nodeRef={contactRef}
        in={currentSection === 'contact'}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div ref={contactRef}>
          <Contact />
        </div>
      </CSSTransition>
      
      <Footer />
    </div>
  );
};

export default App;

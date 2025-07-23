import React, { useEffect } from 'react';
import './App.css';
import heroBackground from './assets/images/hero-background.jpg';
import Portfolio from './components/Portfolio/Portfolio';

function App() {
  // Add scroll effect to navigation
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.navigation');
      if (nav) {
        if (window.scrollY > 100) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      {/* Hero section with navigation */}
      <div className="hero" style={{'--hero-bg': `url(${heroBackground})`} as React.CSSProperties}>
        {/* Navigation Bar */}
        <nav className="navigation">
          <ul className="nav-items">
            <li>About Me</li>
            <li><a href="#portfolio" className="nav-link">Projects</a></li>
            <li className="nav-center">Snigdha Tiwari</li>
            <li>Experience</li>
            <li>Contact Me</li>
          </ul>
        </nav>
        
        {/* Hero Content */}
        <div className="hero-content">
          {/* LEFT SIDE - Description and Interests */}
          <div className="hero-left">
            <div className="hero-description">
              <p>I AM A DEVELOPER BASED<br />IN LONDON. I have a passion for</p>
              <ul className="hero-interests">
                <li>+ global politics,</li>
                <li>+ technology,</li>
                <li>+ ethics,</li>
                <li>+ photography<span className="photo-credit">(I took this picture)</span></li>
              </ul>
            </div>
          </div>
          
          {/* RIGHT SIDE - Main Title */}
          <div className="hero-right">
            <h1 className="hero-title">
              Hi there, I'm<br />
              <span className="hero-name">Snigdha!</span>
            </h1>
          </div>
        </div>
        <div className="hero-timestamp">01/02/2013 12:02 PM</div>
      </div>
      
      {/* Portfolio Section */}
      <Portfolio />
    </div>
  );
}

export default App;

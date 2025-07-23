import React from 'react';
import './App.css';

function App() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Hi there, I'm<br />
          <span className="hero-name">Snigdha!</span>
        </h1>
        <div className="hero-description">
          <p>I AM A DEVELOPER BASED<br />IN LONDON. I have a passion for</p>
          <ul className="hero-interests">
            <li>+ global politics,</li>
            <li>+ technology,</li>
            <li>+ ethics,</li>
            <li>+ photography</li>
          </ul>
        </div>
      </div>
      <div className="hero-timestamp">01/02/2013 04:00 PM</div>
    </div>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import './HeulisticHomePage.css';

function HeulisticNavBar() {
  return (
    <nav className="heulistic-nav">
      <Link to="/pricing">Pricing</Link>
      <Link to="/about">About</Link>
      <button className="heulistic-apps-button">Login</button>
      <img
        className="heulistic-logo"
        src="https://dummyimage.com/100x40/000/fff"
        alt="Heulistic"
      />
      <button className="heulistic-account-button">Sign up</button>
    </nav>
  );
}

export default HeulisticNavBar;

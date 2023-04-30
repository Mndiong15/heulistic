import React from 'react';
import './HeulisticHomePage.css';
import { Link } from 'react-router-dom';
import SocialMediaSelector from './Checkbox'

function HeulisticHomePage() {
  return (
    <div className="heulistic-home-page">
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
      <form className="heulistic-search-form">
        <input
          className="heulistic-search-input"
          type="text"
          name="q"
          placeholder="Search our products"
        />
        <SocialMediaSelector />
        <button className="heulistic-search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default HeulisticHomePage;

import React from 'react';
import './App.css';

function App() {
  return (
    <div className="heulistic-home-page">
      <nav className="heulistic-nav">
        <a href="#">Pricing</a>
        <button className="heulistic-apps-button">Login</button>
        <img
          className="heulistic-logo"
          src=""
          alt="Heulistic"
        />
        <button className="heulistic-account-button">Sign up</button>
      </nav>
      <form className="heulistic-search-form">
        <input
          className="heulistic-search-input"
          type="text"
          name="q"
          placeholder="Men's Fashion"
        />
        <button className="heulistic-search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default App;

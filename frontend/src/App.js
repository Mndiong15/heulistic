import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './components/About';
import HeulisticHomePage from './components/HeulisticHomePage';
import Pricing from './components/Pricing';

function App() {
  return (
    <Router>
        <Route exact path="/">
          <HeulisticHomePage />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/pricing">
          <Pricing />
        </Route>
    </Router>
  );
}

export default App;
import logo from "./logo.svg";
import "./App.css";

import React from 'react'

function App() {
  return (
    <body>
      <nav>
        <div id="navdiv">
          <a href="#" class="c">
            About
          </a>
          <a href="#" class="c">
            Contact
          </a>
          <div>
            <button type="submit" name="button">
              Sign In
            </button>
          </div>
        </div>
      </nav>
      <main>
        <center>
          <img
            src="logo.svg"
            alt="logo"
            width="20%"
            height="5%"
            id="heulisticlogo"
          ></img>
          <h1>Heulistic AI</h1>
          <div>
            <div id="maindiv">
              <span>
                <input id="inputspan" type="text" name="search"></input>
              </span>
            </div>
          </div>
          <section>
            <div>
              <button type="submit">Submit</button>
            </div>
          </section>
          <div>
            <p>Learn your audience in minutes</p>
          </div>
          <div id="Bottomdiv"></div>
        </center>
      </main>
    </body>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import SocialMediaSelector from "./Checkbox";

import React from "react";

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
            src="{require('logo-no-background.png')}"
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
          <div>
            <SocialMediaSelector />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
          <div>
            <p>Learn your audience in minutes</p>
          </div>
          <div id="Bottomdiv"></div>
        </center>
      </main>
    </body>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

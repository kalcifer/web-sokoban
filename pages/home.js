import { h, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
import { Header } from "../components/header.js";

import Goto from "../components/goto.js";
import About from "./about.js";
import { useLocalStorage } from "../hooks.js";
const html = htm.bind(h);

const Home = ({ setLevel }) => {
  const handleEvent = (event) => {
    if (event.target.value === "Start") {
      setLevel(1);
    }
  };
  return html`<div>
    <${Header} />
    <div class="homecontent">
      <p class="abouttext hometext">
        <a href="">Sokoban</a> is japanese for 'warehouse keeper'. This puzzle
        game was originally invented in Japan in the early 80's.
      </p>
      <div class="buttonContainer">
        <div>
          <button class="wideButton start" value="Start" onClick=${handleEvent}>
            Start Game
          </button>
        </div>
        <${Goto} />
      </div>
    </div>
  </div>`;
};

export default Home;

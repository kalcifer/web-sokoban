import { h, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
import { Header } from "../components/header.js";
import About from "./about.js";
import { useLocalStorage } from "../hooks.js";
const html = htm.bind(h);

const Home = ({ setLevel }) => {
  const handleEvent = (event) => {
    setLevel(1);
  };
  return html`<div>
    <${Header} />
    <div class="homecontent">
      <${About} />
      <div class="buttonContainer">
        <button class="startButton" value="Start" onClick=${handleEvent}>
          Start Game
        </button>
      </div>
    </div>
  </div>`;
};

export default Home;

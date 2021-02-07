import { h, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
const html = htm.bind(h);

const About = () => {
  return html`<div>
    <div class="center">Here's how to play this game</div>
  </div>`;
};

export default About;

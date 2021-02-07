import { h, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
const html = htm.bind(h);

const About = () => {
  return html`<section>
    <p class="abouttext">
      <div>Use the arrow keys on your keyboard or click on the buttons representing
      arrow keys to move the cat.</div><div> The objective of the game is to push the boxes
      onto their storage locations.</div><div> Once all the boxes are in a storage
      location, you can proceed to the next level. </div><div>I have implemented 7 levels
      in this game.</div>
    </p>
  </section>`;
};

export default About;

import { h, render } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
import { Header } from "../components/header.js";
const html = htm.bind(h);

const Home = () => {
  const [value, setValue] = useState(0);
  return html`<div>
    <${Header} />
    ${value}
    <div class="center">
      <a href="/about">About</a>
      <a href="/levels">Level</a>
      <a href="/level/2">Level2</a>
    </div>
  </div>`;
};

export default Home;

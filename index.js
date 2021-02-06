// https://github.com/preactjs/preact/issues/1961#issuecomment-546605976

import { h, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
import { Router } from "https://unpkg.com/preact-router@latest?module";
import Home from "./pages/home.js";
import About from "./pages/about.js";
import Levels from "./pages/levels.js";
import Level from "./pages/level.js";

const html = htm.bind(h);

const Main = () => {
  return html`<${Router}>
    <${Level} path="/" />
    <${About} path="/about" />
    <${Levels} path="/levels"/>
    <${Level} path="/level/:levelNo"/>
  </${Router}>`;
};

render(h(Main), document.body);

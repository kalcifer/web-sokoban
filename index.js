// https://github.com/preactjs/preact/issues/1961#issuecomment-546605976

import { h, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
import Home from "./pages/home.js";
import About from "./pages/about.js";
import Levels from "./pages/levels.js";
import Level from "./pages/level.js";
import { useLocalStorage } from "./hooks.js";

const html = htm.bind(h);

const Main = () => {
  const [level, setLevel] = useLocalStorage("level", 0);
  if (level === 0) {
    return html`<${Home} setLevel=${setLevel} />`;
  } else {
    return html`<${Level} levelNo=${level} />`;
  }
};

render(h(Main), document.getElementById("main"));

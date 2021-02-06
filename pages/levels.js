import { h, render } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
import { Header } from "../components/header.js";
const html = htm.bind(h);

const Levels = () => {
  return html`<div>
    <${Header} />
    <div class="center">
      <a href="/level/1">level 1</a>
      <a href="/level/2">level 2</a>
    </div>
  </div>`;
};

export default Levels;

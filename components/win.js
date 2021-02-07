import { h, render } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
import { useLocalStorage } from "../hooks.js";
const html = htm.bind(h);

const Win = () => {
  const [level, setLevel] = useLocalStorage("level");
  const handleEvent = (event) => {
    if (level < 7) {
      setLevel(level + 1);
      window.location.reload();
    }
  };
  const handleRestart = (event) => {
    setLevel(0);
    window.location.reload();
  };
  return html`<div class="modal">
    <div class="wincenter">
      <div><img src="../happycat.png" class="winImage" /></div>
      <div class="winmsg">
        ${level < 7 ? "Level completed!" : "Game finished!"}
      </div>
      <div>
        ${level < 7
          ? html`<button
              class="wideButton"
              style="margin-top:1em"
              onClick="${handleEvent}"
            >
              Next Level
            </button>`
          : html`<button
              class="wideButton"
              style="margin-top:1em"
              onClick="${handleRestart}"
            >
              Restart
            </button>`}
      </div>
    </div>
  </div>`;
};

export default Win;

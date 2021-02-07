import { h, render } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";

const html = htm.bind(h);

const Square = ({ elem }) => {
  if (elem.fill?.type === "hero") {
    return html`<img src="../happycat.png" />`;
  } else if (elem.type === "wall") {
    return html`<img src="../GroundGravel_Grass.png" />`;
  } else if (elem.fill?.type === "box") {
    return html`<img
      src="../CrateDark_Red.png"
      class=${elem.position ? "glow" : ""}
    />`;
  } else if (elem.position && elem.fill?.type === "none") {
    return html`<img src="../EndPoint_Red.png" class="xs" />`;
  }
  return html`<div
    class="${elem.type} ${elem.position
      ? elem.fill?.type === "box"
        ? "box"
        : "position"
      : ""}"
  ></div>`;
};

export default Square;

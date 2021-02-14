import { h, render } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
import HappyCat from "../imgs/happycat.png";
import GrassTile from "../imgs/GroundGravel_Grass.png";
import Box from "../imgs/CrateDark_Red.png";
import Position from "../imgs/EndPoint_Red.png";

const html = htm.bind(h);

const Square = ({ elem }) => {
  if (elem.fill?.type === "hero") {
    return html`<img src=${HappyCat} />`;
  } else if (elem.type === "wall") {
    return html`<img src=${GrassTile} />`;
  } else if (elem.fill?.type === "box") {
    return html`<img src=${Box} class=${elem.position ? "glow" : ""} />`;
  } else if (elem.position && elem.fill?.type === "none") {
    return html`<img src=${Position} class="xs" />`;
  } else if (elem.type === "blank") {
    return html`<div />`;
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

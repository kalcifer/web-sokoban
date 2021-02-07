import { h, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
import { useLocalStorage } from "../hooks.js";

const html = htm.bind(h);

const Goto = () => {
  const [level, setLevel] = useLocalStorage("level");
  const handleEvent = (event) => {
    const level = parseInt(event.target.value);
    if (level > 0 && level < 8) {
      setLevel(level);
      window.location.reload();
    }
  };
  return html`<div class="goto">
    <label>Go to</label>
    <select name="level" id="level-select" onChange=${handleEvent}>
      <option value="0">Level</option>
      <option value="1">Level 1</option>
      <option value="2">Level 2</option>
      <option value="3">Level 3</option>
      <option value="4">Level 4</option>
      <option value="5">Level 5</option>
      <option value="6">Level 6</option>
      <option value="7">Level 7</option>
    </select>
  </div>`;
};

export default Goto;

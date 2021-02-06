const w = "x";
const o = "o";
const p = "p";
const h = "h";
const b = "b";
const levels = [
  [
    [w, w, w, w, w],
    [w, o, p, o, w],
    [w, h, b, o, w],
    [w, o, o, o, w],
    [w, w, w, w, w],
  ],
  [
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w],
    [w, p, p, o, o, w, o, o, o, o, o, w, w, w],
    [w, p, p, o, o, w, o, b, o, o, b, o, o, w],
    [w, p, p, o, o, w, b, w, w, w, w, o, o, w],
    [w, p, p, o, o, o, o, h, o, w, w, o, o, w],
    [w, p, p, o, o, w, o, w, o, o, b, o, w, w],
    [w, w, w, w, w, w, o, w, w, b, o, b, o, w],
    [w, w, w, o, b, o, o, b, o, b, o, b, o, w],
    [w, w, w, o, o, o, o, w, o, o, o, o, o, w],
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w],
  ],
];
const getDimension = (level) => {
  return { x: level.length, y: level[0].length };
};

const getLevel = (levelId) => {
  const level = levels[levelId - 1];
  return { level, dimension: getDimension(level) };
};

export default levels;
export { getLevel, getDimension };

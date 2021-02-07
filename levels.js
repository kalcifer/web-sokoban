const w = "x";
const o = "o";
const p = "p";
const h = "h";
const b = "b";
const bl = "blank";
const bp = "bp";
const levels = [
  [
    [w, w, w, w, w],
    [w, o, p, o, w],
    [w, h, b, o, w],
    [w, o, o, o, w],
    [w, w, w, w, w],
  ],
  [
    [bl, w, w, w, w, w, bl, bl, bl],
    [bl, w, o, o, o, w, w, w, w],
    [bl, w, o, o, o, w, o, o, w],
    [bl, w, w, o, o, o, o, p, w],
    [w, w, w, o, w, w, w, p, w],
    [w, o, b, o, w, bl, w, p, w],
    [w, o, b, b, w, bl, w, w, w],
    [w, h, o, o, w, bl, bl, bl, bl],
    [w, w, w, w, w, bl, bl, bl, bl],
  ],
  [
    [bl, bl, w, w, w, w, w, w, w, bl],
    [bl, bl, w, o, o, o, o, o, w, bl],
    [bl, bl, w, o, b, o, h, o, w, bl],
    [w, w, w, w, w, o, w, o, w, bl],
    [w, o, b, o, o, o, o, o, w, bl],
    [w, o, o, w, b, w, w, o, w, w],
    [w, p, p, b, o, o, w, o, o, w],
    [w, p, p, o, o, o, o, o, o, w],
    [w, w, w, w, w, w, w, w, w, w],
  ],
  [
    [w, w, w, w, w, w],
    [w, p, p, bp, p, w],
    [w, p, b, o, o, w],
    [w, w, o, b, o, w],
    [w, w, b, o, w, w],
    [w, h, b, o, w, bl],
    [w, w, o, o, w, bl],
    [bl, w, w, w, w, bl],
  ],
  [
    [w, w, w, w, w, w, w, w],
    [w, p, o, o, o, b, o, w],
    [w, p, b, o, o, w, o, w],
    [w, p, w, o, w, o, o, w],
    [w, w, w, o, w, o, w, w],
    [bl, w, o, b, o, o, w, bl],
    [bl, w, h, o, w, w, w, bl],
    [bl, w, w, w, w, w, bl, bl],
  ],
  [
    [bl, w, w, w, w, w, w, w, w, bl],
    [w, w, p, p, w, o, o, o, w, bl],
    [w, o, p, p, w, o, b, o, w, w],
    [w, o, h, o, b, o, o, b, o, w],
    [w, w, b, w, w, w, o, o, o, w],
    [bl, w, o, o, o, o, o, w, w, w],
    [bl, w, w, w, w, w, w, w, bl, bl],
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

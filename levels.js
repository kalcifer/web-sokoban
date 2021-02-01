const levels = [
  [
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "o",
    "p",
    "o",
    "x",
    "x",
    "h",
    "b",
    "o",
    "x",
    "x",
    "o",
    "o",
    "o",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
  ],
  [],
];
const getDimension = (level) => Math.sqrt(level.length);

const getHero = (level) => {
  const heroIndex = level.indexOf("h");
  const dimension = getDimension(level);
  return { x: Math.abs(heroIndex / dimension), y: heroIndex % dimension };
};

const getLevel = (levelId) => {
  const level = levels[levelId - 1];
  return {
    level,
    heroPosition: getHero(level),
  };
};

export default levels;
export { getLevel, getDimension };

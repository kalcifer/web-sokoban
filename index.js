import { parseBoard, createBoardHTML } from "./board.js";
import { getLevel, getDimension } from "./levels.js";

const allMoves = [];
const getNextObj = (mainObj, direction, boardObj) => {
  let next = { x: mainObj.x, y: mainObj.y };
  if (direction === "ArrowRight") {
    next.x = next.x + 1;
  } else if (direction === "ArrowLeft") {
    next.x = next.x - 1;
  } else if (direction === "ArrowUp") {
    next.y = next.y - 1;
  } else if (direction === "ArrowDown") {
    next.y = next.y + 1;
  }
  const nextObj = boardObj.filter(
    (obj) => obj.x === next.x && obj.y === next.y
  );
  return nextObj[0];
};

const move = (boardObj, key) => {
  const prevBoardObj = [...boardObj];
  const hero = boardObj.filter(
    (obj) => obj.type === "square" && obj.fill.type === "hero"
  )[0];
  const nextObj = getNextObj(hero, key, boardObj);
  if (nextObj && nextObj.type === "wall") {
    return { boardObj, changed: false };
  } else {
    if (nextObj.fill?.type === "none") {
      return {
        boardObj: boardObj.map((obj) => {
          if (obj.x === hero.x && obj.y === hero.y) {
            return {
              ...obj,
              fill: { type: obj.prevFillType || "none" },
            };
          }
          if (obj.x === nextObj.x && obj.y === nextObj.y) {
            return {
              ...obj,
              fill: { type: "hero" },
              prevFillType:
                obj.fill?.type === "box" ? obj.prevfillType : obj.fill?.type,
            };
          }
          return obj;
        }),
        changed: true,
      };
    }
    if (nextObj.fill?.type === "box") {
      const nextObj2 = getNextObj(nextObj, key, boardObj);
      if (nextObj2.fill?.type === "none") {
        return {
          boardObj: boardObj.map((obj) => {
            if (obj.x === hero.x && obj.y === hero.y) {
              return {
                ...obj,
                fill: { type: obj.prevFillType || "none" },
              };
            }
            if (obj.x === nextObj.x && obj.y === nextObj.y) {
              return {
                ...obj,
                fill: { type: "hero" },
                prevFillType:
                  obj.fill?.type === "box" ? obj.prevFillType : "none",
              };
            }
            if (obj.x === nextObj2.x && obj.y === nextObj2.y) {
              return {
                ...obj,
                fill: { type: "box" },
                prevFillType: obj.fill.type,
              };
            }
            return obj;
          }),
          changed: true,
        };
      }
      if (nextObj2.fill.type === "box" || nextObj2.type === "wall") {
        return { boardObj, changed: false };
      }
    }
  }
};

const listenToUser = (gameSection, boardObj) => (event) => {
  let key = event.key;

  if (event.target?.tagName === "BUTTON") {
    key = event.target.value;
  }

  let gameBoard;

  let changed = false;
  const length = allMoves.length;
  if (key === "Enter" || key === "Start") {
    changed = true;
    const boardObjCopy = [...boardObj];
    allMoves.push(boardObjCopy);
  } else if (
    ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].indexOf(key) >= 0
  ) {
    changed = false;
    const result = move(boardObj, key);
    changed = result.changed;
    boardObj = result.boardObj;
    const boardObjCopy = [...boardObj];
    allMoves.push(boardObjCopy);
  } else if (
    (key === "Undo" ||
      (event.metaKey === true && (key === "z" || key === "Z"))) &&
    length > 1
  ) {
    changed = true;
    allMoves.pop();
    boardObj = allMoves[allMoves.length - 1];
  }
  if (changed) {
    console.log(`No of moves - ${allMoves.length}`);
    const gameBoard = createBoardHTML(boardObj);
    gameSection.innerHTML = gameBoard;
  }
};

const main = (gameSection) => {
  gameSection.innerHTML = "Press enter to start";
  const { level, heroPosition } = getLevel(2);
  const dimension = getDimension(level);
  let boardObj = parseBoard(level, dimension);
  document.addEventListener("keydown", listenToUser(gameSection, boardObj));
  document.addEventListener("click", listenToUser(gameSection, boardObj));
};

document.addEventListener("DOMContentLoaded", () => {
  const gameSection = document.getElementById("gameScreen");
  main(gameSection);
});

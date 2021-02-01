import { parseBoard, createBoardHTML } from "./board.js";
import { getLevel, getDimension } from "./levels.js";

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
  const hero = boardObj.filter((obj) => obj.type === "hero")[0];
  const nextObj = getNextObj(hero, key, boardObj);
  if (nextObj && nextObj.type === "wall") {
    return { boardObj, changed: false };
  } else {
    if (nextObj.type === "blank" || nextObj.type === "position") {
      return {
        boardObj: boardObj.map((obj) => {
          if (obj.x === hero.x && obj.y === hero.y) {
            return {
              ...obj,
              type: obj.prevType || "blank",
              prevType: "",
            };
          }
          if (obj.x === nextObj.x && obj.y === nextObj.y) {
            return {
              ...obj,
              type: "hero",
              prevType: obj.type === "box" ? obj.prevType : obj.type,
            };
          }
          return obj;
        }),
        changed: true,
      };
    }
    if (nextObj.type === "box") {
      const nextObj2 = getNextObj(nextObj, key, boardObj);
      if (nextObj2.type === "blank" || nextObj2.type === "position") {
        return {
          boardObj: boardObj.map((obj) => {
            if (obj.x === hero.x && obj.y === hero.y) {
              return {
                ...obj,
                type: obj.prevType || "blank",
                prevType: "",
              };
            }
            if (obj.x === nextObj.x && obj.y === nextObj.y) {
              if (obj.type === "position") {
                return {
                  ...obj,
                  type: "hero",
                  prevType: "",
                  state: false,
                };
              }
              return {
                ...obj,
                type: "hero",
                prevType: obj.type === "box" ? obj.prevType : "blank",
              };
            }
            if (obj.x === nextObj2.x && obj.y === nextObj2.y) {
              if (obj.type === "position") {
                return {
                  ...obj,
                  type: "box",
                  prevType: obj.type,
                  state: true,
                };
              }
              return {
                ...obj,
                type: "box",
                prevType: obj.type,
              };
            }
            return obj;
          }),
          changed: true,
        };
      }
      if (nextObj2.type === "box" || nextObj2.type === "wall") {
        return { boardObj, changed: false };
      }
    }
  }
};

const listenToUser = (gameSection, boardObj) => (event) => {
  const key = event.key;
  let gameBoard;

  let changed = false;

  if (key === "Enter") {
    changed = true;
  } else if (
    ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].indexOf(key) >= 0
  ) {
    changed = false;
    const result = move(boardObj, key);
    changed = result.changed;
    boardObj = result.boardObj;
  }

  if (changed) {
    const gameBoard = createBoardHTML(boardObj);
    gameSection.innerHTML = gameBoard;
  }
};

const main = (gameSection) => {
  gameSection.innerHTML = "Press enter to start";
  const { level, heroPosition } = getLevel(1);
  const dimension = getDimension(level);
  let boardObj = parseBoard(level, dimension);
  document.addEventListener("keydown", listenToUser(gameSection, boardObj));
};

document.addEventListener("DOMContentLoaded", () => {
  const gameSection = document.getElementById("gameScreen");
  main(gameSection);
});

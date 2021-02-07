import { h, render } from "https://unpkg.com/preact@latest?module";
import {
  useState,
  useRef,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
import { Header } from "../components/header.js";
import About from "./about.js";
import Square from "../components/square.js";
import Win from "../components/win.js";
import Goto from "../components/goto.js";
import { parseBoard } from "../board.js";
import { getLevel, getDimension } from "../levels.js";
import { useEventListener, useLocalStorage } from "../hooks.js";

const html = htm.bind(h);

const getNextObj = (mainObj, direction, boardObj) => {
  let next = { x: mainObj.x, y: mainObj.y };
  if (direction === "ArrowRight") {
    next.y = next.y + 1;
  } else if (direction === "ArrowLeft") {
    next.y = next.y - 1;
  } else if (direction === "ArrowUp") {
    next.x = next.x - 1;
  } else if (direction === "ArrowDown") {
    next.x = next.x + 1;
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

const listenToUser = (event, boardObj, noOfMoves) => {
  let key = event.key;

  if (event.target?.tagName === "BUTTON") {
    key = event.target.value;
  }

  let changed = false;
  if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].indexOf(key) >= 0) {
    changed = false;
    const result = move(boardObj, key);
    changed = result.changed;
    boardObj = result.boardObj;
    const positionsLeft = boardObj.filter((elem) => {
      return (
        elem.type === "square" &&
        elem.position === true &&
        elem.fill?.type !== "box"
      );
    });
    const win = positionsLeft.length === 0;
    const boardObjCopy = [...boardObj];
    return { changed, newState: boardObjCopy, undo: false, win };
  } else if (
    (key === "Undo" ||
      (event.metaKey === true && (key === "z" || key === "Z"))) &&
    noOfMoves > 0
  ) {
    return { changed: true, undo: true, win: false };
  }
  return { changed: false, undo: false, win: false };
};

const Level = ({ levelNo = 1, setLevel }) => {
  const { level, dimension } = getLevel(levelNo);
  const boardObj = parseBoard(level, dimension);
  const [boardState, setState] = useState(boardObj);
  const allMoves = useRef([boardState]);
  const [win, setWinState] = useState(false);
  const handleEvent = (event) => {
    event.preventDefault();
    if (event.target.value === "Restart") {
      window.location.reload();
    }
    if (!win) {
      let actionObject = listenToUser(
        event,
        boardState,
        allMoves.current.length
      );
      let newState = actionObject.newState;
      setWinState(actionObject.win);

      if (actionObject.changed) {
        if (actionObject.undo) {
          if (allMoves.current.length > 1) {
            allMoves.current.pop();
            newState = allMoves.current[allMoves.current.length - 1];
          }
        } else {
          allMoves.current.push(newState);
        }
        console.log({ length: allMoves.current.length, allMoves });
        setState(newState);
      }
    }
  };

  useEventListener("keydown", handleEvent);
  return html`<div>
    <${Header} />
    <div class="moves">
      <span>Moves</span>
      <span>${allMoves.current.length - 1}</span>
    </div>
    <div
      id="gameScreen"
      style="grid-template-columns: repeat(${dimension.y}, 4em);
    grid-template-rows: repeat(${dimension.x}, 4em);"
    >
      ${boardState.map((elem) => {
        const type = elem.fill ? elem.fill.type : elem.type;
        const position = elem.position;
        return html`<${Square} elem=${elem} />`;
      })}
    </div>
    <div class="actionSection">
      <div class="buttons">
        <div>
          <button class="undo" onClick=${handleEvent} value="Undo">Undo</button>
          <button class="restart" onClick=${handleEvent} value="Restart">
            Restart
          </button>
        </div>
        <div class="directionSet">
          <div>
            <button class="up" onClick=${handleEvent} value="ArrowUp">
              Up
            </button>
          </div>
          <div>
            <button class="left" onClick=${handleEvent} value="ArrowLeft">
              Left
            </button>
            <button class="down" onClick=${handleEvent} value="ArrowDown">
              Down
            </button>
            <button class="right" onClick=${handleEvent} value="ArrowRight">
              Right
            </button>
          </div>
        </div>
      </div>
      <${Goto} />
    </div>
    ${win ? html`<${Win} />` : ""}
    <div class="separator" />
    <${About} />
  </div>`;
};

export default Level;

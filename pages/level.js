import { h, render } from "https://unpkg.com/preact@latest?module";
import {
  useState,
  useRef,
  useEffect,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
import { Header } from "../components/header.js";
import { parseBoard } from "../board.js";
import { getLevel, getDimension } from "../levels.js";
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
    const boardObjCopy = [...boardObj];
    return { changed, newState: boardObjCopy, undo: false };
  } else if (
    (key === "Undo" ||
      (event.metaKey === true && (key === "z" || key === "Z"))) &&
    noOfMoves > 0
  ) {
    return { changed: true, undo: true };
  }
  return { changed: false, undo: false };
};

// https://usehooks.com/useEventListener/
function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}

const Level = ({ levelNo = 2 }) => {
  const { level, dimension } = getLevel(levelNo);
  const boardObj = parseBoard(level, dimension);
  const [boardState, setState] = useState(boardObj);
  const allMoves = useRef([boardState]);
  const handleEvent = (event) => {
    let { changed, newState, undo } = listenToUser(
      event,
      boardState,
      allMoves.current.length
    );
    if (changed) {
      if (undo) {
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
  };

  useEventListener("keydown", handleEvent);
  return html`<div>
    <${Header} />
    <div
      id="gameScreen"
      style="grid-template-columns: repeat(${dimension.y}, 4em);
    grid-template-rows: repeat(${dimension.x}, 4em);"
    >
      ${boardState.map((elem) => {
        const type = elem.fill ? elem.fill.type : elem.type;
        const position = elem.position;
        if (elem.fill?.type === "hero") {
          return html`<img src="./happycat.png" />`;
        } else if (elem.type === "wall") {
          return html`<img src="./GroundGravel_Grass.png" />`;
        } else if (elem.fill?.type === "box") {
          return html`<img
            src="./CrateDark_Red.png"
            class=${position ? "glow" : ""}
          />`;
        } else if (elem.position && elem.fill?.type === "none") {
          return html`<img src="./EndPoint_Red.png" class="xs" />`;
        }
        return html`<div
          class="${type} ${position
            ? elem.fill?.type === "box"
              ? "box"
              : "position"
            : ""}"
        ></div>`;
      })}
    </div>
  </div>`;
};

export default Level;

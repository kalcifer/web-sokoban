export const parseBoard = (board, dimension) => {
  let index = 0;
  const boardObj = [];
  for (let x = 0; x < dimension; x++) {
    for (let y = 0; y < dimension; y++) {
      const elem = board[index];
      boardObj[index] = getElem(elem, y, x);
      index++;
    }
  }
  return boardObj;
};

const getElem = (elem, x, y) => {
  switch (elem) {
    case "x":
      return {
        type: "wall",
        x,
        y,
      };
    case "o":
      return {
        type: "square",
        x,
        y,
        fill: { type: "none" },
        position: false,
      };
    case "h":
      return {
        type: "square",
        x,
        y,
        fill: { type: "hero" },
        position: false,
      };
    case "b":
      return {
        type: "square",
        x,
        y,
        fill: { type: "box" },
        position: false,
      };
    case "p":
      return {
        type: "square",
        x,
        y,
        fill: { type: "none" },
        position: true,
      };
    case "hp":
      return {
        type: "square",
        x,
        y,
        fill: { type: "hero" },
        position: true,
      };
    case "bp":
      return {
        type: "square",
        x,
        y,
        fill: { type: "box" },
        position: true,
      };
  }
};

export const createBoardHTML = (boardObj) => {
  const board = boardObj.map((elem) => {
    const type = elem.fill ? elem.fill.type : elem.type;
    const position = elem.position;
    if (elem.fill?.type === "hero") {
      return `<img src="./happycat.png" />`;
    } else if (elem.type === "wall") {
      return `<img src="./GroundGravel_Grass.png" />`;
    } else if (elem.fill?.type === "box") {
      return `<img src="./CrateDark_Red.png" class=${
        position ? "glow" : ""
      } />`;
    } else if (elem.position && elem.fill?.type === "none") {
      return `<img src='./EndPoint_Red.png' class='xs' />`;
    }
    return `<div class="${type} ${
      position ? (elem.fill?.type === "box" ? "box" : "position") : ""
    }"></div>`;
  });
  // if (hasWon(boardObj)) {
  // }
  return board.join(" ");
};

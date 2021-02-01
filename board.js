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
        type: "blank",
        x,
        y,
      };
    case "h":
      return {
        type: "hero",
        x,
        y,
      };
    case "b":
      return {
        type: "box",
        x,
        y,
      };
    case "p":
      return {
        type: "position",
        x,
        y,
        state: 0,
      };
  }
};

export const createBoardHTML = (boardObj) => {
  const board = boardObj.map((elem) => {
    return `<div class="${elem.type}">${elem.type}</div>`;
  });
  return board.join(" ");
};

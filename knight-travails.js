class GameBoard {
  constructor() {
    this.board = [...Array(8)].map((e) => Array(8));
  }
}

class Knight {
  constructor() {
    this.moves = [
      [1, 2],
      [1, -2],
      [2, 1],
      [2, -1],
      [-1, 2],
      [-1, -2],
      [-2, 1],
      [-2, -1],
    ];
  }
}

class Position {
  constructor(x, y) {
    let newKnight = new Knight();
    this.pos = [x, y];
    this.connections = this.createConnections(newKnight);
  }

  createConnections(knight) {
    let arr = [];
    for (let x = 0; x < 8; x++) {
      let [down, right] = knight.moves[x];
      let newX = this.pos[0] + down;
      let newY = this.pos[1] + right;
      let legal = [0, 1, 2, 3, 4, 5, 6, 7];
      if (legal.includes(newX) && legal.includes(newY)) {
        arr.push([newX, newY]);
      }
    }
    return arr;
  }
}

function knightMoves(start, end) {
  let [startX, startY] = start;
  let [endX, endY] = end;
  let legal = [0, 1, 2, 3, 4, 5, 6, 7];
  let path = [];
  if (
    !(
      legal.includes(startX) &&
      legal.includes(startY) &&
      legal.includes(endX) &&
      legal.includes(endY)
    )
  ) {
    return null;
  }
  let testBoard = new GameBoard();
  //   let testKnight = new Knight();
  for (let i = 0; i < 8; i++) {
    for (let p = 0; p < 8; p++) {
      testBoard.board[i][p] = new Position(i, p);
    }
  }

  let current = testBoard.board[startX][startY];

  function traversal(
    pathRec = path,
    startRec = start,
    endRec = end,
    currentRec = current
  ) {
    pathRec.push(currentRec.pos);
    if (currentRec.pos === endRec) {
      return pathRec;
    }
    if (currentRec.connections.includes(endRec)) {
      pathRec.push(endRec);
      return pathRec;
    }

    // for (let i = 0; i < currentRec.connections.length; i++) {
    //   console.log("Entered for loop");
    //   if (pathRec[pathRec.length - 1] === currentRec.connections[i]) {
    //     continue;
    //   }

    //   let [a,b] = currentRec.connections[i]
    //   pathRec = traversal(
    //     pathRec,
    //     currentRec,
    //     endRec,
    //     testBoard.board[a][b]
    //   );
    //   if (pathRec.includes(endRec)) {
    //     return pathRec;
    //   }
    // }

    return pathRec;
  }

//   path = traversal();
//   return path;
}

// let board = new GameBoard();
// let knight = new Knight();

// let testPos = new Position(0, 0);

// console.log(testPos.connections);

console.log(knightMoves([0, 0], [1, 2]));

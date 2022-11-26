class GameBoard {
  //GameBoard class constructor with an eight by eight two dimensional array 
  constructor() {
    this.board = [...Array(8)].map((e) => Array(8));
  }

  //method to compare two locations in the form of an array
  compare(pos1, pos2) {
    let [pos1X, pos1Y] = pos1;
    let [pos2X, pos2Y] = pos2;
    if (this.board[pos1X][pos1Y] === this.board[pos2X][pos2Y]) {
      return true;
    }

    return false;
  }

  //method to see if a position is already in the path the knight has taken
  inPath(path, pos) {
    let flag = false;
    for (let l = 0; l < path.length; l++) {
      flag = this.compare(path[l], pos);
      if (flag) {
        return flag;
      }
    }

    return flag;
  }
}

//Knight class which contains the legal moves a knight can make 
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

//Position class to hold all the positions on the board and the places the knight can legally move from each position
class Position {
  constructor(x, y) {
    let newKnight = new Knight();
    this.pos = [x, y];
    this.connections = this.createConnections(newKnight);
    this.previous = null;
  }

  //Creates an array of legal positions a knight can move from current position
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

//function to calculate the shortest path a knight can take from the start position to the end position
function knightMoves(start, end) {
  let [startX, startY] = start;
  let [endX, endY] = end;
  let legal = [0, 1, 2, 3, 4, 5, 6, 7];
  let path = [];

  //checking to see if the start and end positions are on the board
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

  //creating new board and filling the board array with positions
  let testBoard = new GameBoard();
  for (let i = 0; i < 8; i++) {
    for (let p = 0; p < 8; p++) {
      testBoard.board[i][p] = new Position(i, p);
    }
  }

  let current = testBoard.board[startX][startY];

  //function using BFT to find shortest path from start to end position
  function bfTraversal(currentRec = current) {
    //Queue start position
    let queue = [currentRec.pos];
    let result = [];
    let visited = {};
    visited[currentRec.pos] = true;
    let currentVertex;
    let tempPath = [];

    //loop while there are still items in the cue
    while (queue.length) {
      let temp = queue.shift();
      let [a, b] = temp;
      //set the current location to first item in queue and push it to result array
      currentVertex = testBoard.board[a][b];
      result.push(currentVertex.pos);
      //tests to see if the current vertex is the end position and breaks out of loop if true
      if (testBoard.compare(currentVertex.pos, end)) {
        break;
      }
      //loops through the neighbors of the current vertex and sets their previous attribute to the current vertex position
      currentVertex.connections.forEach((neighbor) => {
        if (!visited[neighbor]) {
          //sets visited object to true for each position visited
          visited[neighbor] = true;
          let [b, c] = neighbor;
          testBoard.board[b][c].previous = currentVertex.pos;
          //queues all the neighbors of the current vertex
          queue.push(neighbor);
        }
      });
    }

    //takes the resulting path and the previous attribute of each position to construct the path the knight took
    let [tempX, tempY] = end;
    let tempCurrent = testBoard.board[tempX][tempY];
    while (tempCurrent) {
      tempPath.push(tempCurrent.pos);
      if (tempCurrent.previous) {
        [tempX, tempY] = tempCurrent.previous;
        tempCurrent = testBoard.board[tempX][tempY];
      } else {
        break;
      }
    }

    //return the reverse of the temporary path
    return tempPath.reverse();
  }

  path = bfTraversal();
  return path;
}

//inputs the the starting and ending coordinates and outputs the shortest path the knight takes
let finalPath = knightMoves([0, 3], [7, 7]);
console.log(`=>You made it in ${finalPath.length - 1} moves. Here's your path`);
finalPath.forEach(spot => {
  console.log(spot)
})

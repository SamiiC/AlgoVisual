import { NodeInterface } from "../interfaces/interfaces";
import { Random } from "random-js";

let Width = 65;
let Height = 27;

export const primsAlgo = (grid: NodeInterface[][]) => {
     console.log("seeding stuff");
     const random = new Random();

     const randX = random.integer(1, Width - 10);
     console.log(randX);
     let randY = random.integer(1, Height - 10);

     let mazeSet = new Set();
     let startNode = grid[randY][randX];

     startNode.Wall = false;

     let fs: Set<NodeInterface> = getFrontiers(startNode, grid);

     for (let f of fs) {
          mazeSet.add(f);
     }

     while (mazeSet.size > 0) {
          let iter: any = [...mazeSet.values()];
          let randNode = iter[random.integer(0, iter.length - 1)];

          mazeSet.delete(randNode);

          let ns = getNeighbours(randNode, grid);

          if (ns.size > 0) {
               iter = [...ns.values()];

               let randNeighbour = iter[random.integer(0, iter.length - 1)];
               connector(
                    grid,
                    randNode.row,
                    randNode.column,
                    randNeighbour.row,
                    randNeighbour.column
               );
          }
          fs = getFrontiers(randNode, grid);
          for (let f of fs) {
               mazeSet.add(f);
          }
     }
};

const getFrontiers = (node: NodeInterface, grid: NodeInterface[][]) => {
     /*Return the nodes frontier nodes
     frontiers being the WALLS that are exactly 2 distance away */
     /*note its grid[row][column] so row first, i.e y value then x*/
     let x = node.column;
     let y = node.row;

     let f: any = new Set();

     if (x >= 0 && x <= Width + 1 && y >= 0 && y <= Height + 1) {
          if (x > 2 && grid[y][x - 2].Wall) {
               f.add(grid[y][x - 2]);
          }

          if (x + 2 < Width && grid[y][x + 2].Wall) {
               f.add(grid[y][x + 2]);
          }

          if (y > 2 && grid[y - 2][x].Wall) {
               f.add(grid[y - 2][x]);
          }
          if (y + 2 < Height && grid[y + 2][x].Wall) {
               f.add(grid[y + 2][x]);
          }
     }

     return f;
};

const getNeighbours = (node: NodeInterface, grid: NodeInterface[][]) => {
     let n = new Set();

     let x = node.column;
     let y = node.row;

     if (x >= 0 && x <= Width + 1 && y >= 0 && y <= Height + 1) {
          if (x > 2 && !grid[y][x - 2].Wall) {
               n.add(grid[y][x - 2]);
          }

          if (x + 2 < Width && !grid[y][x + 2].Wall) {
               n.add(grid[y][x + 2]);
          }

          if (y > 2 && !grid[y - 2][x].Wall) {
               n.add(grid[y - 2][x]);
          }
          if (y + 2 < Height && !grid[y + 2][x].Wall) {
               n.add(grid[y + 2][x]);
          }
     }

     return n;
};

const connector = (
     grid: NodeInterface[][],
     row1: number,
     col1: number,
     row2: number,
     col2: number
) => {
     let x = Math.trunc((row1 + row2) / 2);
     let y = Math.trunc((col1 + col2) / 2);

     grid[row1][col1].Wall = false;

     grid[x][y].Wall = false;
};

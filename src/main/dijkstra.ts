import { NodeInterface } from "../interfaces/interfaces";
import { convertGrid } from "../utility/utils";

const get_neighbours = (
     currentNode: NodeInterface,
     grid: NodeInterface[][]
) => {
     let neighbours: NodeInterface[] = [];
     const colLen = grid[0].length - 1;
     const rowLen = grid.length - 1;
     if (currentNode.column > 0) {
          neighbours.push(grid[currentNode.row][currentNode.column - 1]);
     }
     if (currentNode.column < colLen) {
          neighbours.push(grid[currentNode.row][currentNode.column + 1]);
     }

     if (currentNode.row > 0) {
          neighbours.push(grid[currentNode.row - 1][currentNode.column]);
     }

     if (currentNode.row < rowLen) {
          neighbours.push(grid[currentNode.row + 1][currentNode.column]);
     }

     return neighbours.filter((node) => !node.Visited);
};

const Dijkstra = (
     startNode: NodeInterface,
     endNode: NodeInterface,
     grid: NodeInterface[][]
) => {
     startNode.distFS = 0;
     let Graphnodes: NodeInterface[] = convertGrid(grid);
     let visitedNodes: NodeInterface[] = [];

     while (Graphnodes) {
          //sorts nodes based on distance from start i.e lowest distance always first node.
          Graphnodes.sort((a, b) => a.distFS - b.distFS);

          let curNode = Graphnodes.shift();

          if (!curNode) {
               return [visitedNodes];
          }

          if (curNode.Wall) continue;
          if (curNode.distFS === Infinity) {
               return [visitedNodes];
          }

          curNode.Visited = true;
          visitedNodes.push(curNode);

          if (curNode.ID === endNode.ID) {
               curNode.isDest = true;
               return [visitedNodes];
          }

          let neighbours = get_neighbours(curNode, grid);

          for (let neighbour of neighbours) {
               neighbour.distFS = curNode.distFS + 1;
               neighbour.previousCell = curNode;
          }
     }
};

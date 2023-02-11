import { NodeInterface } from "../interfaces/interfaces";

export const DepthFirstSearch = (
     grid: NodeInterface[][],
     start: NodeInterface,
     end: NodeInterface
) => {
     let unvisited_stack = [start];
     let visitedNodes: NodeInterface[] = [];

     while (unvisited_stack.length > 0) {
          let currNode = unvisited_stack.shift();

          if (!currNode) {
               return visitedNodes;
          }

          const { row, column, ID, Visited } = currNode;

          if (ID !== start.ID && Visited) continue;

          visitedNodes.push(currNode);

          if (ID === end.ID) {
               currNode.isDest = true;
               return visitedNodes;
          }

          // Neighbours

          if (
               column + 1 < grid[0].length &&
               checkNodes(row, column + 1, grid)
          ) {
               grid[row][column + 1].previousCell = currNode;
               unvisited_stack.unshift(grid[row][column + 1]);
               currNode.Visited = true;
          }
          if (row - 1 >= 0 && checkNodes(row - 1, column, grid)) {
               grid[row - 1][column].previousCell = currNode;
               unvisited_stack.unshift(grid[row - 1][column]);
               currNode.Visited = true;
          }
          if (row + 1 < grid.length && checkNodes(row + 1, column, grid)) {
               grid[row + 1][column].previousCell = currNode;
               unvisited_stack.unshift(grid[row + 1][column]);
               currNode.Visited = true;
          }

          if (column - 1 >= 0 && checkNodes(row, column - 1, grid)) {
               grid[row][column - 1].previousCell = currNode;
               unvisited_stack.unshift(grid[row][column - 1]);
               currNode.Visited = true;
          }
     }
     return visitedNodes;
};

const checkNodes = (row: number, column: number, grid: NodeInterface[][]) => {
     return !(grid[row][column].Wall || grid[row][column].Visited);
};

import { NodeInterface } from "../interfaces/interfaces";


export const blindsearch = (
  algorithm: string,
  grid: NodeInterface[][],
  start: NodeInterface,
  end: NodeInterface
): NodeInterface[] => {
  const stack: NodeInterface[] = [start];
  const visitedNodes: NodeInterface[] = [];

  while (stack.length > 0) {
    const node = stack.shift() 
    if (!node) {
      return visitedNodes;
    }

    visitedNodes.push(node);
    const { row, column, ID, Visited } = node;

    if (ID !== start.ID && Visited) continue;

    if (grid[row][column].Wall) {
      continue;
    }

    if (ID === end.ID) {
      node.isDest = true;
      return visitedNodes;
    }

    const children: NodeInterface[] = get_neighbours(node, grid);
    if (algorithm === "BFS") {
      stack.push(...children);
    } else {
      stack.unshift(...children);
    }

    node.Visited = true;
  }

  return visitedNodes;
};

const get_neighbours = (
  currentNode: NodeInterface,
  grid: NodeInterface[][]
): NodeInterface[] => {
  const { row, column } = currentNode;
  const neighbours: NodeInterface[] = [];

  const addToNeighbours = (r: number, c: number) => {
    if (checkNodes(r, c, grid)) {
      grid[r][c].previousCell = currentNode;
      neighbours.push(grid[r][c]);
    }
  };

  if (column > 0) addToNeighbours(row, column - 1);
  if (column < grid[0].length - 1) addToNeighbours(row, column + 1);
  if (row > 0) addToNeighbours(row - 1, column);
  if (row < grid.length - 1) addToNeighbours(row + 1, column);

  return neighbours.filter((node) => !node.Visited);
};

const checkNodes = (row: number, column: number, grid: NodeInterface[][]) => {
  return !(grid[row][column].Wall || grid[row][column].Visited);
};

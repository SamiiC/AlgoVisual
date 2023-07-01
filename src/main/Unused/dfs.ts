// import { NodeInterface } from "../interfaces/interfaces";

// export const DepthFirstSearch = (
//      grid: NodeInterface[][],
//      start: NodeInterface,
//      end: NodeInterface
// ) => {
//      let nodes : NodeInterface[] = [start]
//      let visitedNodes : NodeInterface[] = []

//      while (nodes.length > 0) {   

//           let node = nodes.shift();
//           if (!node) {
//                return visitedNodes;
//           }
          
//           visitedNodes.push(node)
//           const { row, column, ID, Visited } = node;

//           if (ID !== start.ID && Visited) continue;

//           if (grid[row][column].Wall === true) {
//                continue;
//           }

//           if (ID === end.ID){
//                node.isDest = true;
//                return visitedNodes;
//           }

//           let children : NodeInterface[] = get_neighbours(node,grid)
//           nodes.unshift(...children)
//           node.Visited = true;

//      }
//      // Failure / End node not found
//      return visitedNodes;
// }

// const get_neighbours = (
//      currentNode: NodeInterface,
//      grid: NodeInterface[][]
//    ): NodeInterface[] => {
     
//      const { row, column } = currentNode;
//      const neighbours: NodeInterface[] = [];
   
//      const addToNeighbours = (r: number, c: number) => {
//        if (checkNodes(r, c, grid)) {
//          grid[r][c].previousCell = currentNode;
//          neighbours.push(grid[r][c]);
//        }
//      };
   
//      if (column > 0) addToNeighbours(row, column - 1);
//      if (column < grid[0].length - 1) addToNeighbours(row, column + 1);
//      if (row > 0) addToNeighbours(row - 1, column);
//      if (row < grid.length - 1) addToNeighbours(row + 1, column);
   
//      return neighbours.filter((node) => !node.Visited);
// };

// const checkNodes = (row: number, column: number, grid: NodeInterface[][]) => {
//      return !(grid[row][column].Wall || grid[row][column].Visited);
// };
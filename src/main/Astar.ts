import { NodeInterface } from "../interfaces/interfaces";
import { convertGrid } from "../utility/utils";

const get_neighbours = (childNode: NodeInterface, grid: NodeInterface[][]) => {
     let neighbours: NodeInterface[] = [];
     const colLen = grid[0].length - 1;
     const rowLen = grid.length - 1;
     if (childNode.column > 0) {
          neighbours.push(grid[childNode.row][childNode.column - 1]);
     }
     if (childNode.column < colLen) {
          neighbours.push(grid[childNode.row][childNode.column + 1]);
     }

     if (childNode.row > 0) {
          neighbours.push(grid[childNode.row - 1][childNode.column]);
     }

     if (childNode.row < rowLen) {
          neighbours.push(grid[childNode.row + 1][childNode.column]);
     }

     return neighbours;
};

const calc_heuristic = (current: NodeInterface, end: NodeInterface) => {
     const dx = Math.abs(current.column - end.column);
     const dy = Math.abs(current.row - end.row);

     var heuristic = dx + dy;

     // need to multiply by 1.001 as there are multiple 'shortest' paths avaliable
     // 1.001 breaks the ties in nodes with the same f value
     heuristic = heuristic * 1.001;

     return heuristic;
};

const setFind = (node: NodeInterface, set: NodeInterface[]) => {
     for (let i = 0; i < set.length - 1; i++) {
          if (node.ID === set[i].ID) {
               return true;
          }
     }
     return false;
};

export const Astar = (
     startNode: NodeInterface,
     endNode: NodeInterface,
     grid: NodeInterface[][]
) => {
     let openList: NodeInterface[] = [];
     let visitedNodesInOrder: NodeInterface[] = [];

     startNode.g = 0;
     startNode.h = calc_heuristic(startNode, endNode);
     startNode.f = startNode.h;

     openList.push(startNode);

     while (openList.length > 0) {
          openList.sort((a, b) => a.f - b.f);

          let currNode = openList.shift();

          visitedNodesInOrder.push(currNode);

          if (currNode.ID === endNode.ID) {
               currNode.isDest = true;
               return visitedNodesInOrder;
          }

          currNode.Visited = true;

          let children = get_neighbours(currNode, grid);

          for (let child of children) {
               if (child.Wall || child.Visited) continue;
               if (child.ID === startNode.ID) continue;

               let trialg = currNode.g + 1;

               if (trialg < child.g) {
                    child.g = trialg;
                    child.h = calc_heuristic(child, endNode);
                    child.f = child.g + child.h;
                    child.previousCell = currNode;

                    if (!setFind(child, openList)) {
                         openList.push(child);
                    }
               }
          }
     }
     return visitedNodesInOrder;
};

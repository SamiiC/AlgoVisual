import { NodeInterface } from "../interfaces/interfaces";

const ROW_NUM = 26;
const COL_NUM = 65;

export const defaultCell: NodeInterface = {
     row: 0,
     column: 0,
     ID: 0,
     Wall: false,
     Visited: false,
     Startpt: false,
     Endpt: false,
     distFS: Infinity,
     previousCell: null,
     isDest: false,
     f: 0,
     g: Infinity,
     h: 0,
};

// need to add to this in future...
export const initNodeObj = (): NodeInterface[][] => {
     let ID = 0;
     let grid: NodeInterface[][] = [];

     for (let rowNum = 0; rowNum < ROW_NUM; rowNum++) {
          let Row: NodeInterface[] = [];
          for (let colNum = 0; colNum < COL_NUM; colNum++) {
               Row.push({
                    ...defaultCell,
                    row: rowNum,
                    column: colNum,
                    ID: ID,
               });
               ID += 1;
          }
          grid.push(Row);
     }

     return grid;
};

export const convertGrid = (grid: NodeInterface[][]): NodeInterface[] => {
     let reducedArr: NodeInterface[] = [];

     grid.map((row) => {
          row.map((node) => {
               reducedArr.push(node);
          });
     });

     return reducedArr;
};

export const getPath = (endNode: NodeInterface) => {
     let curNode = endNode;
     let pathNodes: NodeInterface[] = [];
     while (curNode) {
          pathNodes.push(curNode);

          console.log(curNode);
          curNode = curNode.previousCell;
     }

     return pathNodes;
};

export const setGridToWalls = (grid: NodeInterface[][]) => {
     grid.forEach((row) => {
          row.forEach((node) => {
               node.Wall = true;
          });
     });
};

// These could be merged with the initNodeObj but I prefer the redundancy
export const clearPath = (grid: NodeInterface[][], clearwalls: boolean) => {
     grid.forEach((row) => {
          row.forEach((node) => {
               if (node.Visited) {
                    node.Visited = false;
                    node.isDest = false;
                    node.distFS = Infinity;
                    node.previousCell = null;
               }

               if (clearwalls) {
                    node.Wall = false;
               }
          });
     });

     return grid;
};

import { NodeInterface } from "../interfaces/interfaces";

const ROW_NUM = 40;
const COL_NUM = 40;

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
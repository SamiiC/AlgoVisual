import { initNodeObj } from "../utility/utils"

import { NodeInterface } from "../interfaces/interfaces"
import React, { useRef } from "react"
import Node from "./Node"

const Grid = () => {
  // Dont want to reset value of grid after re-render
  let GridNodes = useRef(initNodeObj())
  return (
    <div className="grid grid-cols-50Col overflow-auto w-full px-4 justify-start md:justify-center items-center my-3">
     
      {
      GridNodes.current.map((ROW,rowNum : number) =>{
        return (
          <React.Fragment key = {rowNum}>
          
            {ROW.map((COL,colNum)=> {
              return (
                  <Node key = {colNum} id ={`node-${COL.row}-${COL.column}`} {...COL}/>
              )
            })
            }
          </React.Fragment>
        )
      })
    }
    </div>
  )
}

export default Grid
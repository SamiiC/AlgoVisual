import { initNodeObj } from "../utility/utils"

import { NodeInterface } from "../interfaces/interfaces"
import React, { useRef,useState } from "react"
import Node from "./Node"

const Grid = () => {
  // Dont want to reset value of grid after re-render
  let GridNodes = useRef(initNodeObj())
  const [start,setStart] = useState< NodeInterface | null >(null)
  const [end,setEnd] = useState< NodeInterface | null >(null)
  

  const NodeClicked = (node: NodeInterface, rowNum: number, colNum: number) => {
    let ClickedNode = GridNodes.current[rowNum][colNum]

    if(start && end)
    {
      console.log('already two points choosen')
      return;
    }

    if(!start && !end)
    {
      setStart({
        ...ClickedNode,
        Startpt: true,
        distFS: 0,
      })
      ClickedNode.Startpt = true;
      ClickedNode.distFS = 0;

    } else if(start)
    {
      setEnd({
        ...ClickedNode,
        Endpt: true,
      })
      ClickedNode.Endpt = true;
    }
  }
 
  return (
    <div className="grid grid-cols-50Col overflow-auto w-full px-4 justify-start md:justify-center items-center my-3">
     
      {
      GridNodes.current.map((ROW,rowNum : number) =>{
        return (
          <React.Fragment key = {rowNum}>
          
            {ROW.map((COL,colNum)=> {
              return (
                  <Node key = {colNum} id ={`node-${COL.row}-${COL.column}`} 
                  onClick = {() => {
                    NodeClicked(COL,rowNum,colNum);

                  }}
                  
                  {...COL}/>
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
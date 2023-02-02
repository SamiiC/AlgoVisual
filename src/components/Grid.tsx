import { initNodeObj,convertGrid } from "../utility/utils"

import { NodeInterface } from "../interfaces/interfaces"
import React, { useRef,useState } from "react"
import { Dijkstra } from "../main/dijkstra"
import Node from "./Node"

const Grid = () => {
  // Dont want to reset value of grid after re-render
  let GridNodes = useRef(initNodeObj())
  const [start,setStart] = useState< NodeInterface | null >(null)
  const [end,setEnd] = useState< NodeInterface | null >(null)
  const [wallnum,setWallnum] = useState<number>(0)
  


  const NodeClicked = (node: NodeInterface, rowNum: number, colNum: number) => {
    let ClickedNode = GridNodes.current[rowNum][colNum]

    if(ClickedNode.Wall)
    {
      ClickedNode.Wall = false;
      setWallnum(wallnum - 1)
      return;
    } 
    if(node.ID === start?.ID)
    {
      setStart(null)
      ClickedNode.Startpt = false;
      ClickedNode.distFS = Infinity;
      return;

    }if(node.ID === end?.ID)
    {
      setEnd(null)
      ClickedNode.Endpt = false;
      ClickedNode.distFS = Infinity;
      return;
    }

    //may need to change state in future... just a placeholder for now
    if(start && end)
    {
      console.log("hi sds")
      ClickedNode.Wall = true;
      setWallnum(wallnum + 1)
      return;
    }

    //Start and end points choosen so anything after is wall


    if(!start)
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
    <div>
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
      <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
      onClick = {()=>{Dijkstra(start,end,GridNodes.current)}} >Visualise</button>
    </div>


    
  )
}

export default Grid
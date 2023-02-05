import { initNodeObj,convertGrid,getPath } from "../utility/utils"

import { NodeInterface } from "../interfaces/interfaces"
import React, { useRef,useState,useEffect } from "react"
import { Dijkstra } from "../main/dijkstra"
import { Astar } from "../main/Astar"
import Node from "./Node"


const Grid = () => {
  // Dont want to reset value of grid after re-render
  let GridNodes = useRef(initNodeObj())
  const [start,setStart] = useState< NodeInterface | null >(null)
  const [end,setEnd] = useState< NodeInterface | null >(null)
  const [wallnum,setWallnum] = useState<number>(0)
  const [foundPath,setFoundPath] = useState<boolean>(false)
  const [visualising,setVisualising] = useState<boolean>(false)
  


  const NodeClicked = (node: NodeInterface, rowNum: number, colNum: number) => {

    if(visualising)
    {
      return;
    }
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

  const visualise = () => {
    console.log("------------------VISUALISING ------------------")
    let startNode = GridNodes.current[start.row][start.column]
    let endNode = GridNodes.current[end.row][end.column]
    let visitedNodes : NodeInterface[] = []
    let shortestPath : NodeInterface[] = []


    visitedNodes = Astar(startNode,endNode,GridNodes.current)
    
    setFoundPath(true)
    shortestPath = getPath(endNode)
    setVisualising(true)


    algorithmVisual(shortestPath,visitedNodes)
  }

  const pathVisual = ( shortestPath: NodeInterface[] ) => {

    for(let currNode = 1; currNode < shortestPath.length - 1; currNode++)
    {
      setTimeout(()=> {
        let node = shortestPath[currNode]
        let nodeToChange = document.getElementById(`node-${node.row}-${node.column}`)
        nodeToChange.className += " bg-violet-600"
          
      },30 * currNode)
    }
  }

  const algorithmVisual = (shortestPath: NodeInterface[], NodesInOrder: NodeInterface[]) => {
    for(let currNode = 1; currNode < NodesInOrder.length - 1; currNode++)
    {
      setTimeout(()=> {
        let node = NodesInOrder[currNode]
        let nodeToChange = document.getElementById(`node-${node.row}-${node.column}`)



        nodeToChange.className += " NodeChange"

        if(NodesInOrder[currNode + 1].isDest)
        {
          pathVisual(shortestPath)
          setVisualising(false)

        }

          
      },40 * currNode)
    }

    
  }

  // useEffect(()=> {

  //   getPath(GridNodes.current[end.row][end.column])
  // },[foundPath])
 
  return (
    <div>
      <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
      onClick = {()=>{visualise()}} >Visualise</button>
      <div className="border grid griddy w-full justify-start place-content-between my-3">
      
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
    </div>


    
  )
}

export default Grid
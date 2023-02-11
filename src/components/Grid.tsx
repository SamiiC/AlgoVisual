import { initNodeObj,getPath,setGridToWalls } from "../utility/utils"

import { NodeInterface } from "../interfaces/interfaces"
import React, { useRef,useState,useEffect, MouseEvent } from "react"
import { Dijkstra } from "../main/dijkstra"
import { primsAlgo } from "../main/prims"
import { DepthFirstSearch } from "../main/dfs"
import { Astar } from "../main/Astar"
import Node from "./Node"
import Divider from "./Divider"
import MenuButton from "./MenuButton"


const Grid = () => {
  // Dont want to reset value of grid after re-render
  let GridNodes = useRef(initNodeObj())
  const [start,setStart] = useState< NodeInterface | null >(null)
  const [end,setEnd] = useState< NodeInterface | null >(null)
  const [render,setRender] = useState<boolean>(false)
  const [visualising,setVisualising] = useState<boolean>(false)
  const  [isLeftClicked,setIsLeftClicked] = useState<boolean>(false)
  const [algo,setAlgo] = useState<string>("A*")
  const [AlgoOption,setAlgoOption] = useState<boolean>(true)



  const handle_mouse_enter = (rowNum: number, colNum: number) => {
    setRender(!render)

    let node = GridNodes.current[rowNum][colNum]
    if(!isLeftClicked) return;
    if(node.Startpt || node.Endpt) return;
    node.Wall = true
  }

  const NodeClicked = (node: NodeInterface, rowNum: number, colNum: number) => {

    if(visualising){return;}
    let ClickedNode = GridNodes.current[rowNum][colNum]

    if(ClickedNode.Wall)
    {
      ClickedNode.Wall = false;
      setRender(!render)
      return;
    } 
    if(node.ID === start?.ID)
    {
      setStart(null)
      ClickedNode.Startpt = false;
      ClickedNode.distFS = Infinity;
      return;

    }
    if(node.ID === end?.ID)
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
      setRender(!render)
      return;
    }

    if(!start)
    {
      setStart({
        ...ClickedNode,
        Startpt: true,
        distFS: 0,
      })
      ClickedNode.Startpt = true;
      ClickedNode.distFS = 0;

    } 
    else if(start)
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

    switch (algo) {
      case "A*":
        visitedNodes = Astar(startNode,endNode, GridNodes.current)
        shortestPath = getPath(endNode)
        alert("NOOOOOOO")
        break;
      case "DFS":
        visitedNodes = DepthFirstSearch(GridNodes.current,startNode,endNode)
        shortestPath = getPath(endNode)
        break;
      case "Dijkstra":
        visitedNodes = Dijkstra(startNode,endNode, GridNodes.current)
        shortestPath = getPath(endNode)
        break;
    
      case "":
        alert("No Algorithm Was Selected")
        return;
    }


    setVisualising(true)
    algorithmVisual(shortestPath,visitedNodes)
  }

  const pathVisual = ( shortestPath: NodeInterface[] ) => {

    for(let currNode = 1; currNode < shortestPath.length - 1; currNode++)
    {
      setTimeout(()=> {
        let node = shortestPath[currNode]
        let nodeToChange = document.getElementById(`node-${node.row}-${node.column}`)
        nodeToChange.className += " PathNode"
          
      },currNode)
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

  const prim = (grid: NodeInterface[][]) => {
    setGridToWalls(grid)
    primsAlgo(GridNodes.current)
    setRender(!render)
  }

  return (
    <div>

      <div className="flex justify-start min-w-0 min-h-0 bg-[#CBD0BF] rounded-[10px] h-12 mb-8 w-min truncate container mx-auto mt-12 font-rmono">

        <MenuButton onClick={() => {visualise()}} btnText="Vizualise"/>
        <MenuButton onClick={() => {prim(GridNodes.current)}} btnText="Generate Maze" />

        <Divider/>  

        <MenuButton btnText="Clear Grid"/> 
        <MenuButton btnText="Clear Path"/> 

        <Divider/> 

            { AlgoOption ?
            <React.Fragment>
                <MenuButton onClick={() => {setAlgo("A*")}} btnText="A*"  />
                <MenuButton onClick={() => {setAlgo("Dijkstra")}} btnText="Dijkstra" />
                <MenuButton onClick={() => {setAlgo("DFS")}} btnText="Depth First Search" />
                <MenuButton btnText="Breadth First Search" />
            </React.Fragment>
            : 
            <React.Fragment>
                <MenuButton btnText="Randomised Prim" />
                <MenuButton btnText="Recursive" />
            </React.Fragment>
            } 
          
        
          
           


      </div>


      <div className="grid griddy w-full justify-start sticky">
      
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
                    onMouseDown = {() => {
                      setIsLeftClicked(true)
                    }}

                    onMouseEnter = {(e) => {
                      handle_mouse_enter(rowNum,colNum)
                    }}

                    onMouseUp = {() => {
                      setIsLeftClicked(false)
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
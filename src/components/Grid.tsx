import { initNodeObj,getPath,setGridToWalls,clearPath } from "../utility/utils"
import { Astar, Dijkstra, primsAlgo,blindsearch} from "../main/index"
import { NodeInterface } from "../interfaces/interfaces"
import React, { useRef,useState} from "react"
import Node from "./Node"
import Divider from "./Divider"
import MenuButton from "./MenuButton"
import AlgoOptions from "./AlgoOptions"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const Grid = () => {
  // Dont want to reset value of grid after re-render
  let GridNodes = useRef(initNodeObj())
  const [start,setStart] = useState< NodeInterface | null >(null)
  const [end,setEnd] = useState< NodeInterface | null >(null)
  const [render,setRender] = useState<boolean>(false)
  const [visualising,setVisualising] = useState<boolean>(false)
  const  [isLeftClicked,setIsLeftClicked] = useState<boolean>(false)
  const [algo,setAlgo] = useState<string>("")
  const [mazeAlgo,setMazeAlgo] = useState<string>("")
  let speed : any = useRef(40)



  const handle_mouse_enter = (rowNum: number, colNum: number) => {
    setRender(!render)

    let node = GridNodes.current[rowNum][colNum]
    if(!isLeftClicked) return;
    if(node.Startpt || node.Endpt)  return;
    node.Wall = true
  }

  const clearNodeCSS = () => {
    document.querySelectorAll('.node').forEach((node) => {
      if(node.classList.contains("NodeChange")) { node.classList.remove("NodeChange") } 
      if(node.classList.contains("PathNode")) { node.classList.remove("PathNode") }
    })
    
  }

  const clearPathNodes = () => {
    GridNodes.current = clearPath(GridNodes.current,false)
    clearNodeCSS()
  }

  const clearGrid = () => {
    GridNodes.current = clearPath(GridNodes.current,true)
    setRender(!render)
    clearNodeCSS()
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
    clearPathNodes()

    console.log("------------------VISUALISING ------------------")
    let startNode = GridNodes.current[start.row][start.column]
    let endNode = GridNodes.current[end.row][end.column]
    let visitedNodes : NodeInterface[] = []
    let shortestPath : NodeInterface[] = []

    switch (algo) {
      case "A*":
        visitedNodes = Astar(startNode,endNode, GridNodes.current)
        shortestPath = getPath(endNode)
        break;
      case "DFS":
        visitedNodes = blindsearch("DFS", GridNodes.current,startNode,endNode)
        shortestPath = getPath(endNode)
        break;
      case "Dijkstra":
        visitedNodes = Dijkstra(startNode,endNode, GridNodes.current)
        shortestPath = getPath(endNode)
        break;
      
      case "BFS":
        visitedNodes = blindsearch("BFS", GridNodes.current,startNode,endNode)
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
      },speed.current * currNode)
    }
  }

  const MazeGeneration = (grid: NodeInterface[][]) => {
    clearPathNodes()
    setGridToWalls(grid)
    primsAlgo(GridNodes.current)
    setRender(!render)
  }

  return (
    
    <div>

      <div className="flex justify-start min-w-0 min-h-0 bg-[#ECECEC] rounded-[10px] h-12 mb-2 text-sm w-min truncate container mx-auto mt-12 font-o2 items-center">

        <MenuButton disable={visualising} onClick={() => {visualise()}} btnText="Visualise"/>
        <MenuButton disable={visualising} onClick={() => {MazeGeneration(GridNodes.current)}} btnText="Generate Maze" />

        <Divider/>  

        <MenuButton disable={visualising} btnText="Clear Grid" onClick={() => {clearGrid()}}/> 
        <MenuButton disable ={visualising} btnText="Clear Path" onClick={() => {clearPathNodes()}} /> 

        <Divider/> 

            
          <React.Fragment>
            <AlgoOptions id="A*" name ="A*" group="opt" onClick={() => {setAlgo("A*")}}/>
            <AlgoOptions id="Dijkstra" name ="Dijkstra" group="opt" onClick={() => {setAlgo("Dijkstra")}}/>
            <AlgoOptions id="DFS" name ="Depth First Search" group="opt" onClick={() => {setAlgo("DFS")}}/>
            <AlgoOptions id="BFS" name ="Breadth First Search" group="opt" onClick={() => {setAlgo("BFS")}}/>
          </React.Fragment>

        <Divider/> 
            
          <React.Fragment>
              <AlgoOptions id="prim" name ="Randomized Prim" group="mazeopt" onClick={() => {setMazeAlgo("prim")}}/>
              <AlgoOptions id="recursive" name ="Recursive" group="mazeopt" onClick={() => {setMazeAlgo("recursive")}}/>

          </React.Fragment>
        <Divider/> 


        <div className="  font-rmono text-[#B7B7B7] mx-auto pr-5 pl-5 w-48  ">
          <p className="font-semibold text-black pl-14">Speed</p>
          <Slider onChange={(nextValues) => {speed.current = (nextValues);console.log('Change:', speed.current) ;}}
                  defaultValue = {40}
                  railStyle={{ backgroundColor: 'red' }}  
                  reverse = {true}  />

        </div>

            
      </div>


      <div className="grid griddy w-full justify-start">
      
        {
        GridNodes.current.map((ROW,rowNum : number) =>{
          return (
            
            
            <React.Fragment key = {rowNum}>
            
              {ROW.map((node,colNum)=> {
                return (
                    <Node key = {colNum} id ={`node-${node.row}-${node.column}`} 
                    onClick = {() => {
                      NodeClicked(node,rowNum,colNum);
                    
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
                    
                    {...node}/>
                    
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
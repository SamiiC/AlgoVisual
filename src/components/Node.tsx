import { HTMLAttributes } from "react"
import { NodeInterface } from "../interfaces/interfaces"

const Node = ({ row,
    column,
    ID,
    Wall,
    Visited,
    Startpt,
    Endpt,
    distFS,
    previousCell,
    isDest,
    ...props } : NodeInterface & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="border border-[#2D3136] w-8 h-8" {...props}></div>
  )
}

export default Node

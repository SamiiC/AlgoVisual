import { HTMLAttributes } from "react";
import { NodeInterface } from "../interfaces/interfaces";

const Node = ({
     row,
     column,
     ID,
     Wall,
     Visited,
     Startpt,
     Endpt,
     distFS,
     previousCell,
     isDest,
     ...props
}: NodeInterface & HTMLAttributes<HTMLDivElement>) => {
     return (
          <div
               className={
                    "border border-[#B5D8FD] w-8 h-8 " +
                    (Startpt ? "bg-green-400" : "") +
                    (Endpt ? "bg-rose-900" : "") +
                    (Wall ? "bg-slate-800" : "")
               }
               {...props}
          ></div>
     );
};

export default Node;

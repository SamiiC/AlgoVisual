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
                    "border border-[#94a3b8] h-[34px] " +
                    (Startpt ? "bg-green-400 " : "") +
                    (Endpt ? "bg-rose-900 " : "") +
                    (Wall ? "bg-[#1f2937] " : "")
               }
               {...props}
          ></div>
     );
};

export default Node;

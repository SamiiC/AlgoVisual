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
                    "node border border-[#BED8F6] h-[30px] " +
                    (Startpt ? "bg-[#83D934] " : "") +
                    (Endpt ? "bg-[#CB4B0E] " : "") +
                    (Wall ? "bg-[#1f2937] " : "")
               }
               {...props}
          ></div>
     );
};

export default Node;

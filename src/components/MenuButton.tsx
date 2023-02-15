import { HTMLAttributes } from "react";

const MenuButton = ({btnText, ...props} : {btnText: string} & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className = "bg-transparent text-[#B7B7B7] hover:text-[#FF360D] font-semibold py-2 px-4 rounded " {...props} >{btnText}</button>
  )
}

export default MenuButton

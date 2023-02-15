import { HTMLAttributes } from "react";

const MenuButton = ({btnText,disable, ...props} : {btnText: string, disable: boolean} & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button disabled={disable ? true : false} className = "bg-transparent text-black hover:text-[#FF360D] font-semibold py-2 px-4 rounded " {...props} >{btnText}</button>
  )
}

export default MenuButton

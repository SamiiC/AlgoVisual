import { HTMLAttributes } from "react";



const MenuButton = ({btnText, ...props} : {btnText: string} & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className = "bg-transparent text-[#8A9B69] hover:text-[#555A56] font-semibold py-2 px-4 rounded " {...props} >{btnText}</button>
  )
}

export default MenuButton
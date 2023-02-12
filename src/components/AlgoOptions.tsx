import React from 'react'
import { InputHTMLAttributes } from 'react'


const AlgoOptions = ({id, name, ...props} : {id: string, name: string} &  InputHTMLAttributes<HTMLInputElement>)  => {
  const css = 'bg-transparent text-[#8A9B69] hover:text-[#555A56] font-semibold py-2 px-4 rounded '
  return (
    <React.Fragment>
        <input type="radio" name="opt" id={id} value="small" {...props}/>
        <label className={css} htmlFor={id}>{name}</label>
        
    </React.Fragment>
  )
}



export default AlgoOptions



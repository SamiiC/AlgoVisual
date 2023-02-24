import React from 'react'
import { InputHTMLAttributes } from 'react'


const AlgoOptions = ({id, name,group, ...props} : {id: string, name: string, group:string} &  InputHTMLAttributes<HTMLInputElement>)  => {
  const css = 'bg-transparent text-black hover:text-[#FF360D] font-semibold py-2 px-4 rounded '
  return (
    <React.Fragment>
        <input type="radio" name={group} id={id} value="small" {...props}/>
        <label className={css} htmlFor={id}>{name}</label>
        
    </React.Fragment>
  )
}



export default AlgoOptions



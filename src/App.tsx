import { useState } from 'react'
import Grid  from './components/Grid'
import { initNodeObj } from './utility/utils'
import { NodeInterface } from './interfaces/interfaces'

function App() {
  const [count, setCount] = useState(0)
  let testGrid : NodeInterface[][] = initNodeObj()

  console.log(testGrid);
  return (
    <>
      <h1 className="text-1xl font-bold underline">
        Hello world!
      </h1>
      <Grid/>
    </>
  )
}

export default App

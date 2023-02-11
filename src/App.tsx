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
      <Grid/>
    </>
  )
}

export default App

import { useState } from 'react'
import Navbar from './navbar'


import './App.css'
import Catch_disease from './sympton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div class="text">
      <Navbar/>
  
    <h1>DR.Kumar </h1>
      
      <Catch_disease/>

    </div>
      
    </>
  )
}

export default App

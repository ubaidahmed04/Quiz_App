import React from 'react'
import {Quiz} from './Components/Quiz'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <>
    
      <Quiz/>
    </>
  )
}

export default App
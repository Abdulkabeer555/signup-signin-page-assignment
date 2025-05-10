import React from "react"
import Signin from "../pages/Signin"
import './App.css'
import Signup from "../pages/Signup"
import {BrowserRouter, Routes, Route  } from "react-router-dom"
import Profilepage from "../pages/Profilepage"

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signup />} />
        <Route path="/profilepage" element={<Profilepage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

import React from 'react'
import { useState, useEffect } from 'react'
import {Provider as StyletronProvider, DebugEngine} from "styletron-react"
import {Client as Styletron} from "styletron-engine-atomic"
import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom"
import ShopProvider from '../context/ShopContext'

import HomePage from '../pages/HomePage'
import ProductPage from '../pages/ProductPage'
import "../index.css"
import  Navbar  from '../components/Navbar'
import Cart from '../components/Cart'



const debug = process.env.NODE_ENV ==="production" ? void 0 : new DebugEngine()
const engine = new Styletron()

function App() {
  return (
    <ShopProvider>
      <StyletronProvider value={engine} debug={debug} debugAfterHydration>
        <Router>
          <Navbar />
          <Cart />
        <div style={{height:"2rem"}}/>
        <CurrentPage/>
        </Router>
      </StyletronProvider>
    </ShopProvider>
  );
}
function CurrentPage(){
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  useEffect(()=>{
    if(location !== displayLocation){
      setTransitionStage("fadeOut")
    } 
  }, [location, displayLocation])
  return (
    <div
      className={`${transitionStage}`}
      onAnimationEnd={()=>{
        if(transitionStage === "fadeOut"){ 
          setTransitionStage("fadeIn")
          setDisplayLocation(location)
        }
      }}
    >
    <Routes location={displayLocation}>
          <Route path="product/:id" element={<ProductPage />}/> 
          <Route path="/" element={<HomePage /> }/> 
    </Routes>
  </div>
  )
}

export default App;


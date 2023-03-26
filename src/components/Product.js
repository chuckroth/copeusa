import React from "react"
import { useState } from "react"
import { Div, Text, Image } from "atomize"

const Product =(props) =>{

   const [showAnimation, setShowAnimation] = useState(false)
   const handleMouseEnter=()=>{
        setShowAnimation(true)
    }
   const handleMouseLeave= ()=>{setShowAnimation(false)}

   const textStyle = {
    fontFamily: "Light", 
    fontSize: "5px",
    color: showAnimation? 'white' : 'black',
    backgroundImage: "linear-gradient(to right, black 50%, white 50%)",
    backgroundSize: "200%",
    transition:  "background-position 0.5s",
    backgroundPosition: showAnimation? '0%' : '100%'
   }
   return(
      <Div textAlign="center" onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} style={{paddingRight: "calc(0px)",paddingLeft: "calc(0px)"}}>
            <Image
                h="130%"
                w="100%"
                src={props.imig}
                style={{filter: showAnimation? 'invert(100%)': 'invert(0%)' }}
                
            />
             <Text style={textStyle} >{props.name}</Text>
      </Div>
   )

}

export default Product
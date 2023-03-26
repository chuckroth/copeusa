import React, {useEffect, useState,useContext} from "react"
import { useParams } from "react-router-dom"
import  { ShopContext } from "../context/ShopContext"
import { Text, Div, Row, Button, Col, Container, ThemeProvider } from "atomize"

const ProductPage = () =>{
    let { id }  = useParams()
    const { fetchProductWithId, addItemToCheckout, product } = useContext(ShopContext)
    const [showMessage, setShowMessage] = useState(false)

    //style stuff

    const theme = {
        grid: {
          containerWidth: {
              xs: "540px",
              sm: "720px",
              md: "960px",
              lg: "1156px",
              xl: "1156px"
          },
          gutterWidth: "12px",
        }
    }
    const itemStyle = { 
        fontFamily: "Helvetica Neue LT,Helvetica Neue,Helvetica,-apple-system,BlinkMacSystemFont,sans-serif", 
        fontWeight: "700", 
        textTransform: "uppercase" 
    }
    const handleMouseEnter=()=>{
         setShowMessage(true)
     }
    const handleMouseLeave= ()=>{setShowMessage(false)}

    useEffect(()=>{
        
        let newId = "gid://shopify/Product/" +id
        fetchProductWithId(newId)
        return()=>{

        }
    }, [fetchProductWithId, id])


   
    if(!product.title) return <div>loading</div>

    return(
        <ThemeProvider theme={theme}>
        <Container>
           <Row m={{ b: "2rem" }} p="2rem">
                <Col size={1}></Col>
                <Col size={8}>
                    <Div bgImg={product.images[0].src} shadow="3" bgSize="cover" w="30rem" bgPos="center center" h="40rem"/>
                </Col>
                
                <Col size={2}>
                    <Container pos="fixed" bottom="30%" >
                    <Text  style={itemStyle}tag="p" textWeight="200"textSize="tiny">
                        "{product.title}"
                    </Text>
                    <Text  style={{ fontFamily:  "Helvetica Neue LT,Helvetica Neue,Helvetica,-apple-system,BlinkMacSystemFont,sans-serif", textTransform: "uppercase", }}tag="p" textWeight="200" textSize="tiny">${product.variants[0].price.amount}</Text>
                   
                    <Button h=".7rem"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave} rounded="0" shadow="3" bg={showMessage? "red" : "black"} m={{ y: '1rem' }} 
                            onClick={() => addItemToCheckout(product.variants[0].id, 1, "gid://shopify/Product/" +id)}>PURCHASE</Button>
                    </Container>
                </Col>
                <Col size={1}></Col>
            </Row>
        </Container>
        </ThemeProvider>
    )
}

export default ProductPage
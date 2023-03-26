import React, { useContext, useEffect}  from "react"
import { ShopContext } from "../context/ShopContext"
import {Container, Div, Row, Col} from 'atomize'
import {Link} from 'react-router-dom'
import Product from "../components/Product"

const HomePage = () => {
    const { fetchAllProducts, products} = useContext(ShopContext)
   
    useEffect(()=>{
       fetchAllProducts()
        return()=>{}
    }, [fetchAllProducts])


    if(!products) return <div>loading</div>
     return(
        <Container style={{position: "relative", height: "auto", display: "grid", paddingTop: 20, paddingRight: 40, paddingBottom: 200, paddingLeft: 40 }}p>
            <Row align="center">
                {products.map(product =>(
                    <Col key={product.id} size="3">
                        <Link to={`product/${product.id.substring(22)}`} 
                            style={{textDecoration: "none", 
                                    justifyContent: "center", 
                                    textTransform: "uppercase" }}
                        >
                            <Div p="5">
                                <Product name={product.title} imig={product.images[0].src}/>
                            </Div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default HomePage
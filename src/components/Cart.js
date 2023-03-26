import React, { useContext } from 'react'
import { Div, SideDrawer, Text, Row, Col, Anchor, Button, Container, Icon } from "atomize";
import {ShopContext} from '../context/ShopContext'

const Cart = () => {

    const { isCartOpen, closeCart, checkout } = useContext(ShopContext)

    if (checkout.lineItems) {
        return (
            <SideDrawer isOpen={isCartOpen} onClose={closeCart}>
                <Container d="flex" flexDir="column" h="100%">
                    <Row justify="space-between" border={{ b: '1px solid' }} p="0.7rem" borderColor="gray300">
                        <Text tag="h1" textColor="black500" textSize="paragraph" hoverTextColor="black700" transition="0.3s" style={{ fontFamily: "Light" }}>Bag</Text>
                        <Anchor onClick={() => closeCart()} ><Icon name="Cross" color="black500"/></Anchor>
                    </Row>
                    <Row flexGrow="4" p="0.7rem" overflow="auto" flexWrap="nowrap" flexDir="column">
                        {checkout.lineItems.length < 1 ?
                            <Row>
                                <Col>
                                <Text 
                                tag="h1" textColor="black500" 
                                textSize="paragraph" hoverTextColor="black700" 
                                transition="0.3s" style={{ fontFamily: "Light" }}>Cart Is Empty</Text></Col>
                            </Row>
                            :
                            <>
                                {checkout.lineItems && checkout.lineItems.map(item => (
                                    <Row key={item.id} p={{ t:"5px" }}>
                                       
                                        <Col>
                                            <Div bgImg={item.variant.image.src} bgSize="cover" bgPos="center" h="5rem" w="4rem"/>
                                        </Col>
                                        
                                        <Col>
                                            <Text>{item.title}</Text>
                                            <Text>{item.variant.title}</Text>
                                            <Text>{item.quantity}</Text>
                                        </Col>
                                        
                                        <Col>
                                            <Text>{item.variant.price.amount}</Text>
                                        </Col>
                                    </Row>
                                ))}
                            </>
                        }
                    </Row>
                    <Row border={{ t: '1px solid' }} p="0.7rem" borderColor="gray300">
                        <Anchor w="100%" href={checkout.webUrl} target="_blank" rel="noopener noreferrer">
                            <Button w="100%" rounded="0" bg="black" shadow="2" hoverShadow="3" m={{t: '1rem'}} style={{ fontFamily: "Light", textTransform: "uppercase" }}>
                                CHECKOUT
                            </Button>
                        </Anchor>
                    </Row>
                </Container>
            </SideDrawer>
        )
    }

    return null

}

export default Cart
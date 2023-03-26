import React, {useContext} from 'react'
import { Container, Anchor, Icon } from 'atomize'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import imogen from '../components/cope_images.png'



const Navbar = () =>{
    const { openCart } = useContext(ShopContext)

    return (
        <>
            <Container d="flex" flexDir="row" p="1rem" justify="space-between" pos="fixed" top="0px" style={{zIndex: "100"}} bg="white">
            <Link to="/"><Icon name="Store" size="10px" color="black" /></Link>
            <img src={imogen} alt="i am sad today" height="15rem"></img>
            <Anchor onClick={() => openCart()}><Icon name="Bag" size="10px" color="black" /></Anchor>
            </Container>
        </>
    )
    
}

export default Navbar
import React, { Component } from "react"
import  Client  from "shopify-buy"

const ShopContext = React.createContext()

const client = Client.buildClient({
    storefrontAccessToken: "137dfec88bb2a9aa8e7462106ce3d7ba",
    domain: 'chucks-development-store.myshopify.com/'
  // domain: 'graphql.myshopify.com/'
})

class ShopProvider extends Component{
    state = {
        products: [],
        product: {},
        checkout: {},
        isCartOpen: false,
        test: 'test'
    }

    componentDidMount(){
       this.createCheckout()
      // console.log(checkout.id)
       /*
       if (localStorage.checkout) {
        this.fetchCheckout(localStorage.checkout)
        console.log("checkoutfound")
        console.log(localStorage.checkout.id)
      } else {
        this.createCheckout()
        console.log("checkoutmade")
      }*/
    }

    createCheckout = async () =>{
        const checkout = await client.checkout.create()
        localStorage.setItem("checkout", checkout.id)
        await this.setState({ checkout: checkout })
    }
    fetchCheckout = async (checkoutId) => {
        client.checkout
          .fetch(checkoutId)
          .then((checkout) => {
            this.setState({ checkout: checkout })
          })
          .catch((err) => console.log(err))
    }

    addItemToCheckout = async (variantId, quantity) =>{
        const lineItemsToAdd = [
            {
            variantId,
            quantity: parseInt(quantity, 10),
            },
        ]
        console.log("this is checkout")
        
    
        const checkout = await client.checkout.addLineItems(
            this.state.checkout.id,
            lineItemsToAdd
        )
        this.setState({ checkout: checkout})
        console.log(checkout)
       // console.log(checkout.id)
      
      //  this.openCart();
    };
    fetchAllProducts = async () =>{
        const products = await client.product.fetchAll();
        this.setState({ products: products});
    };
    fetchProductWithId = async (id) =>{
        const product = await client.product.fetch(id);
        this.setState({ product: product});

        return product
    };
    closeCart = () =>{ 
        this.setState({ isCartOpen: false}); 
    };
    openCart = () =>{ 
        this.setState({isCartOpen: true});
    };

    render(){
        return(
            <ShopContext.Provider 
            value={{
                ...this.state,
                fetchAllProducts: this.fetchAllProducts,
                fetchProductWithId: this.fetchProductWithId,
                closeCart: this.closeCart,
                openCart: this.openCart,
                addItemToCheckout: this.addItemToCheckout,
                }}>
                {this.props.children}
            </ShopContext.Provider>
        )
    }
}
const ShopConsumer = ShopContext.Consumer

export {ShopConsumer, ShopContext}
export default ShopProvider


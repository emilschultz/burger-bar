import firebase from '../config/firebase';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';


import GlobalStyle from '../components/GlobalStyle';
import NavBar from '../components/NavBar';

function Drinks() {

  const [drinks, setDrinks] = useState([]);
  const cart = useCart();

  useEffect(()=>{
    firebase.firestore().collection('drinks')
    .onSnapshot((querySnapshot) => {
      setDrinks(querySnapshot.docs.map(drink => drink.data()));
    });
  }, [])

  const drinksList = drinks.map(drink => {
    return(
        <div key={drink.id}>
          <h1>{drink.name}</h1>
          <p>{drink.description}</p>
          <p>{drink.price} kr</p>

          <button onClick={() => {
            cart.addProductToCart({
              title: drink.name,
              price: drink.price,
              quantity:drink.quantity
            })
          }}>+</button>
        </div> 
    );
  });

  const checkout = async () => {
    console.log(cart)
    try {
      await firebase.database().ref('orders').push({
        neworder: cart.productsInCart
      })
    } catch(error) {
      setError(error.message)
      console.log("Noget gik galt med bestillilngen")
    }
  }

  return(
    <>
      <GlobalStyle />
      <NavBar/>
      <main>
        <h1>Drinks</h1>
        {drinksList}
        <h1>Cart</h1>
        <ul>
          {cart.productsInCart.map((item) => {
            return (
              <li>
                {item.quantity} x {item.title} = {item.price} kr
              </li>
            )
          })}
        </ul>
        <p>Total: {cart.total} kr</p>
        <p>Items in cart: {cart.quantity}</p>
        <button onClick={checkout}>Checkout</button>
      </main>
    </>
  )
}

export default Drinks;
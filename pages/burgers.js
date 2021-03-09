import React, { useEffect, useState } from 'react';
import firebase from '../config/firebase';
import { useCart } from '../context/CartContext';

import NavBar from '../components/NavBar';
import GlobalStyle from '../components/GlobalStyle';

function Burgers() {

  const [burgers, setBurgers] = useState([]); 
  const cart = useCart();
  console.log('The cart:', cart);

  

  useEffect(()=>{
    firebase.firestore().collection('burgers')
    .onSnapshot((querySnapshot) => {
      setBurgers(querySnapshot.docs.map(burger => burger.data()));
    });
  }, [])

  const burgerList = burgers.map(burger => {
    return(
      <div key={burger.id}>
        <h1>{burger.name}</h1>
        <p>{burger.description}</p>
        <p>{burger.price} kr</p>
        <button onClick={() => {
          cart.addProductToCart({
            title: `${burger.name}`,
            price: `${burger.price}`
          })
        }}>
          +</button>
      </div> 
    );
  });

  return(
    <>
      <GlobalStyle />
      <NavBar />
      <main>
        <h1>Burgers</h1>
          {burgerList}
        <h1>Cart</h1>
        <ul>
          {cart.productsInCart.map((item) => {
            return (
              <li>
                {item.title} - {item.price}
              </li>
            )
          })}
        </ul>
        <p>Total: {cart.total}</p>
      </main>
    </>
  )
}
export default Burgers;
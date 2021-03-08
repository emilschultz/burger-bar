import React, { useState, useEffect } from 'react';
import firebaseInstance from '../config/firebase';
import NavBar from '../components/NavBar';
import GlobalStyle from '../components/GlobalStyle';

function Burgers({ burgers, error }) {
  console.log(burgers)


  // const [cart, setCart] = useState([]);
  let cart = [];


  function addItem(event) {
    // Bruger .find() til at finde frem til id'et på det objekt jeg klikker på og pusher dette til cart
    const burgerFound = burgers.find(newBurger => newBurger.id === event.target.id)
    let name = burgerFound.name
    let price = burgerFound.price
    let id = burgerFound.id

    let item = {
      name,
      price,
      qty: 1,
      id 
  }
  cart.push(item);
  console.log(cart)
  }


  const burgerList = burgers.map(item => {
    return(
      <div key={item.id}>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>{item.price}</p>
        <button onClick={addItem}>+</button>
      </div> 
    )
  })



  return(
    <>
      <GlobalStyle />
      <NavBar />
      <main>
        <h1>Burgers</h1>
          {burgerList}
        <h1>Cart</h1>
      </main>
    </>
  )
}

Burgers.getInitialProps = async () => {
  try {
    const burgersCollection = await firebaseInstance.firestore().collection('burgers');
    const burgersData = await burgersCollection.get();
 
    let burgers = [];
    burgersData.forEach(burger => {
      burgers.push({
        id: burger.id,
        ...burger.data()
      });
    });

    return { burgers }
  } catch (error) {
    return {
      error: error.message
    };
  }
}

export default Burgers;
import React, { useEffect, useState } from 'react';
import firebase from '../config/firebase';
import NavBar from '../components/NavBar';
import GlobalStyle from '../components/GlobalStyle';

function Burgers() {

  let [burgers, setBurgers] = useState([]); 

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
        <p>{burger.price}</p>
        <button>+</button>
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
      </main>
    </>
  )
}
export default Burgers;
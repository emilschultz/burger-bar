import firebase from '../config/firebase';
import { useEffect, useState } from 'react';

import GlobalStyle from '../components/GlobalStyle';
import NavBar from '../components/NavBar';

function Drinks() {

  const [drinks, setDrinks] = useState([]);

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
        <button>+</button>
      </div> 
    );
  });

  return(
    <>
      <GlobalStyle />
      <NavBar/>
      <main>
        <h1>Drinks</h1>
        {drinksList}
      </main>
    </>

  )
}

export default Drinks;
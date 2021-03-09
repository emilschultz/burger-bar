import firebase from '../config/firebase';
import { useEffect, useState } from 'react';

import GlobalStyle from '../components/GlobalStyle';
import NavBar from '../components/NavBar';

function AddOns() {
  
  let [addOns, setAddOns] = useState([]); 

  useEffect(()=>{
    firebase.firestore().collection('add-ons')
    .onSnapshot((querySnapshot) => {
      setAddOns(querySnapshot.docs.map(addon => addon.data()));
    });
  }, [])

  const addOnsList = addOns.map(addon => {
    return(
      <div key={addon.id}>
        <h1>{addon.name}</h1>
        <p>{addon.description}</p>
        <p>{addon.price} kr</p>
        <button>+</button>
      </div> 
    );
  });

  return(
    <>
      <GlobalStyle />
      <NavBar />
      <main>
        <h1>Add Ons</h1>
          {addOnsList}
        <h1>Cart</h1>
      </main>
    </>
  )
}

export default AddOns;
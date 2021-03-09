import firebase from '../config/firebase';
import { useEffect, useState } from 'react';

function Drinks() {


  // const drinksList = drinks.map(item => {
  //   return(
  //     <div key={item.id}>
  //       <h1>{item.name}</h1>
  //       <p>{item.description}</p>
  //       <p>{item.price}</p>
  //       <button onClick={addItem}>+</button>
  //     </div> 
  //   )
  // })

  const [drinks, setDrinks] = useState([]);

  // useEffect(()=>{
  //   return firebase.firestore().collection('drinks')
  //   .onSnapshot((querySnapshot) => {
  //     querySnapshot.forEach((drink) => {
  //       drinks.push(drink.data())
  //     })
  //   })
  // }, [])

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
        <p>{drink.price}</p>
        <button>+</button>
      </div> 
    );
  });

  return(
    <main>
      <h1>Drinks</h1>
      {drinksList}
    </main>
  )
}

// Drinks.getInitialProps = async () => {
//   try {
//     const drinksCollection = await firebase.firestore().collection('drinks');
//     const drinksData = await drinksCollection.get();


//     let drinks = [];
//     drinksData.forEach(drink => {
//       drinks.push({
//         id: drink.id,
//         ...drink.data()
//       });
//     });

//     return { drinks }


//   } catch (error) {
//     return {
//       error: error.message
//     };
//   }
// }

export default Drinks;
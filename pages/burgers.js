import React, { useEffect } from 'react';
import firebase from '../config/firebase';
import NavBar from '../components/NavBar';
import GlobalStyle from '../components/GlobalStyle';

function Burgers() {

  const comments = [
  // const fetchBurgers = async () => {
  //   try {
  //     const burgersCollection = await firebase.firestore().collection('burgers');
  //     const burgersData = await burgersCollection.get();
   
  //     let burgers = [];
  //     burgersData.forEach(burger => {
  //       burgers.push({
  //         id: burger.id,
  //         ...burger.data()
  //       });
  //     });
  
  //     return { burgers }
  //   } catch (error) {
  //     return {
  //       error: error.message
  //     };



  // Burgers.getInitialProps = async () => {
//   try {
//     const burgersCollection = await firebase.firestore().collection('burgers');
//     const burgersData = await burgersCollection.get();
 
//     let burgers = [];
//     burgersData.forEach(burger => {
//       burgers.push({
//         id: burger.id,
//         ...burger.data()
//       });
//     });

//     return { burgers }
//   } catch (error) {
//     return {
//       error: error.message
//     };
//   }
// }
  // 

  ]

  // DENNE VIRKER! DATA BLIVER HENTET MEN KUN I KONSOLLEN!
  let burgers = []; 

  useEffect(() => {
  firebase.firestore().collection('burgers')
  .onSnapshot((querySnapshot) => {
    querySnapshot.forEach((burger) => {
      burgers.push({
        id: burger.id,
        ...burger.data()
      })
      // return { burgers }
    });
  })
  }, [])

  console.log(burgers);

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
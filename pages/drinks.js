import firebaseInstance from '../config/firebase';

function Drinks({ drinks, error }) {
  return(
    <main>
      <h1>Drinks</h1>
      <ul>
        {drinks.map(item => {
          return(
            <li key={item.id}>
              {JSON.stringify(item)}
            </li>
          )
        })}
      </ul>
    </main>
  )
}

Drinks.getInitialProps = async () => {
  try {
    const drinksCollection = await firebaseInstance.firestore().collection('drinks');
    const drinksData = await drinksCollection.get();


    let drinks = [];
    drinksData.forEach(drink => {
      drinks.push({
        id: drink.id,
        ...drink.data()
      });
    });

    return { drinks }


  } catch (error) {
    return {
      error: error.message
    };
  }
}

export default Drinks;
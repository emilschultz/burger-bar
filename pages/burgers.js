import firebaseInstance from '../config/firebase';

function Burgers({ burgers, error }) {
  return(
    <main>
      <h1>Burgers</h1>
      <ul>
        {burgers.map(item => {
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
import firebaseInstance from '../config/firebase';

function Burgers({ burgers, error }) {
  return(
    <main>
      <h1>Burgers</h1>
      <div>
        {burgers.map(item => {
          return(
            <div key={item.id}>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
              <p>{item.price}</p>
              <button>+</button>
            </div>
          )
        })}
      </div>
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
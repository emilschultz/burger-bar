import firebaseInstance from '../../config/firebase';

function MenuItem({ burgers, error }) {
  return(
    <div>
      {/* <img></img>
      <h1>Bacon burger</h1>
      <p>en burger med...</p>
      <p>120kr</p>
      <button>+</button> */}

<ul>
        {burgers.map(item => {
          return(
            <li key={item.id}>
              {JSON.stringify(item)}
            </li>
          )
        })}
        </ul>


    </div>
  )
}

MenuItem.getInitialProps = async () => {
  try {
    const burgersCollection = await firebaseInstance.firestore().collection('burgers');
    const burgersData = await burgersCollection.get();

    let burgers = [];

    burgersData.forEach(burger => {
    burgers.push({
        id: burger.id,
        ...burger.data()
      });
    });

    return { burgers }


  }catch(error){
    return {
      error: error.message
    };
  }
};

export default MenuItem;
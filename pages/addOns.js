import firebaseInstance from '../config/firebase';

function AddOns({ addOns, error }) {
  return(
    <main>
      <h1>Add Ons</h1>
      <ul>
        {addOns.map(item => {
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

AddOns.getInitialProps = async () => {
  try {
    const addOnsCollection = await firebaseInstance.firestore().collection('add-ons');
    const addOnsData = await addOnsCollection.get();


    let addOns = [];
    addOnsData.forEach(addOn => {
      addOns.push({
        id: addOn.id,
        ...addOn.data()
      });
    });

    return { addOns }

  } catch (error) {
    return {
      error: error.message
    };
  }
}



export default AddOns;
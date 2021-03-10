import React, { useState, useEffect } from 'react';
import firebase from '../config/firebase';

export default function Orders() {

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {  
    const newOrder = snapshot => {    
    setOrderList(snapshot.val());  
    }
    firebase.database().ref('orders').on('value', newOrder);  
    setOrderList(orderList)
    console.log(orderList)
  }, [orderList]); 

  // const allOrders = orderList.forEach((order) => {
  //  console.log(order)
  //  RENDER HVER ENKELT ORDRE MED TITLE OG QUANTITY
  //  LAV DESUDEN EN KNAP FOR HVER ORDRE, DER INDEHOLDER EN FUNKTION
  //  DER PUSHER TIL EN NY DATA LIST I REALTIME DATABASE
  // })

  // const allOrders = orderList.forEach(order => {
  //   return(
  //     <div key={order.id}>
  //       <p>{order.id}</p>
  //       <h1>{order.id.neworder.title}</h1>
  //       <p>{order.quantity}</p>
  //     </div> 
  //   );
  // });

    return(
      <>
      <h1>Orders:</h1>
      {/* {allOrders} */}
      <button>Order Ready</button>
      </>
    )
  
}
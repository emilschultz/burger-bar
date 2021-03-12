import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";

export default function Orders() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    let ordersFromDatabase = firebase.database().ref("orders");
    ordersFromDatabase.on("value", (snapshot) => {
      const newOrder = snapshot.val();
      setOrderList(newOrder);
      console.log("AKTUELLE ORDRE:", newOrder);
    });
  }, []);

  return (
    <>
      <h1>Orders:</h1>
      {/* {allOrders} */}
      <button>Order Ready</button>
    </>
  );
}

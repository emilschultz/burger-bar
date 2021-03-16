import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";

export default function Orders() {
  const [orderList, setOrderList] = useState([]);
  const [error, setError] = useState();
  const [readyOrder, setReadyOrder] = useState([]);

  const array = [];

  useEffect(() => {
    firebase
      .database()
      .ref("orders")
      .on("value", (snapshot) => {
        let newOrderList = [];
        snapshot.forEach((snap) => {
          newOrderList.push(snap.val());
        });
        setOrderList(newOrderList);
      });
  }, []);

  const ready = (e) => array.push(e.target.value);

  // const ready = async (e) => {
  //   try {
  //     await firebase.firestore().collection("orders").set({
  //       name: e.target.value,
  //     });
  //   } catch (error) {
  //     setError(error.message);
  //     console.log("Virker ikke");
  //   }
  // };

  const currentOrders = orderList.map((array) => {
    return array.map((order) => {
      return (
        <div
          key={Math.random() * (100 - 1)}
          style={{ border: "1px solid black" }}
        >
          <p>
            {order.quantity} x {order.title}
          </p>

          <button onClick={ready}>Order ready</button>
        </div>
      );
    });
  });

  console.log("CURRENT ORDERS:", currentOrders);

  return (
    <>
      <p>Kitchen screen</p>
      <h1>Orders:</h1>
      {currentOrders}
    </>
  );
}

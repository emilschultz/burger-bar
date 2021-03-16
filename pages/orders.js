import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";

export default function Orders() {
  const [orderList, setOrderList] = useState([]);
  const [readyOrder, setReadyOrder] = useState([]);
  const [error, setError] = useState();

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
  console.log("ORDERLIST:", orderList);

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
      console.log(order);

      const delivery = async () => {
        try {
          await firebase.database().ref("delivery").push(readyOrder);
        } catch (error) {
          setError(error.message);
          console.log("Noget gik galt med afsendingen");
        }
      };

      return (
        <div
          key={Math.random() * (100 - 1)}
          style={{ border: "1px solid black" }}
        >
          <p>
            {order.quantity} x {order.title}
          </p>

          <button
            onClick={() => {
              setReadyOrder({
                ...readyOrder,
                key: order.id,
                title: order.title,
              });
            }}
          >
            Preparing order
          </button>
          <button onClick={delivery}>Order ready</button>
        </div>
      );
    });
  });
  console.log("READY:", readyOrder);

  return (
    <>
      <p>Kitchen screen</p>
      <h1>Orders:</h1>
      {currentOrders}
    </>
  );
}

import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";

export default function Orders() {
  const [orderList, setOrderList] = useState([]);
  const [error, setError] = useState();
  const [readyOrder, setReadyOrder] = useState();
  console.log("readyOrder:", readyOrder);

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

  //HERHERHERHERHER________VIRKER DENNHER G
  const delivery = async () => {
    try {
      await firebase.database().ref("delivery").push(readyOrder);
    } catch (error) {
      setError(error.message);
      console.log("Noget gik galt med afsendingen");
    }
  };

  // const delivery = async () => {
  //   try {
  //     await firebase
  //       .firestore()
  //       .collection("orders")
  //       .doc()
  //       .set({ title: readyOrder.order.title });
  //   } catch (error) {
  //     setError(error.message);
  //     console.log("Noget gik galt med afsendingen");
  //   }
  // };

  // useEffect(()=>{
  //   firebase.database().ref("orders/child")
  // },[])

  // const addOrderToDelivery = (product) => {
  //   setReadyOrder([readyOrder, product]);
  // };

  const currentOrders = orderList.map((array) => {
    return (
      <div
        key={Math.random() * (100 - 1)}
        style={{
          border: "1px solid black",
          margin: "1rem",
          padding: "1rem",
        }}
      >
        <p>
          <strong>Order number:</strong>
        </p>
        {array.map((order) => {
          return (
            <div key={Math.random() * (100 - 1)}>
              <p>
                {order.quantity} x {order.title}
              </p>
            </div>
          );
        })}
        <button> Preparing order </button>
        <button onClick={delivery}>Order ready</button>
      </div>
    );
  });

  return (
    <>
      <p>Kitchen screen</p>
      <h1>Orders:</h1>
      {currentOrders}
    </>
  );
}

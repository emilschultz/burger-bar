import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";

export default function Orders() {
  const [orderList, setOrderList] = useState([]);

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

  const currentOrders = orderList.map((array) => {
    return array.map((order) => {
      return (
        <div style={{ border: "1px solid black" }}>
          <p>{order.title}</p>
          <p>{order.price} kr</p>
        </div>
      );
    });
  });

  return (
    <>
      <p>Kitchen screen</p>
      <h1>Orders:</h1>
      {currentOrders}
    </>
  );
}

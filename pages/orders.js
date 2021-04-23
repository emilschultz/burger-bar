import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";

// STYLED COMPONENTS
import GlobalStyle from "../components/GlobalStyle";
import SectionGrid from "../components/SectionGrid";
import OrderCard from "../components/OrderCard";
import OrderPageStyle from "../components/OrderPageStyle";
import OrderHeading from "../components/OrderHeading";

export default function Orders() {
  const [orderList, setOrderList] = useState([]);
  const [error, setError] = useState();

  // GET DATA FROM REALTIME DATABASE ("orders")
  useEffect(() => {
    firebase
      .database()
      .ref("orders")
      .on("value", (snapshot) => {
        let newOrderList = [];
        snapshot.forEach((snap) => {
          newOrderList.push({
            list: snap.val(),
            key: snap.key,
          });
        });
        setOrderList(newOrderList);
      });
  }, []);
  console.log("ORDERLIST:", orderList);

  // PUSH ORDER KEY/ID TO "deleveries" IN REALTIME DATABASE
  const delivery = async (key, list) => {
    try {
      await firebase.database().ref("delivery").push({ key, list });
    } catch (error) {
      setError(error.message);
      console.log("Noget gik galt med afsendingen");
    }
  };

  const preparing = async (key) => {
    try {
      await firebase.database().ref("preparing").push({ key });
    } catch (error) {
      setError(error.message);
      console.log("Noget gik galt med afsendingen");
    }
  };

  const currentOrders = orderList.map((array) => {
    return (
      <OrderCard id={array.key} key={array.key}>
        <p style={{ borderBottom: ".1rem solid #1731f5" }}>
          <strong>Order number{array.key}</strong>
        </p>

        {array.list.map((order) => {
          return (
            <div
              style={{
                borderBottom: ".1rem solid #1731f5",
              }}
              key={Math.random() * (100 - 1)}
            >
              <p>
                {order.quantity} x {order.title}
              </p>
            </div>
          );
        })}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => {
              preparing(array.key, array.list);
            }}
          >
            Preparing order
          </button>
          <button
            onClick={() => {
              delivery(array.key);
            }}
          >
            Order ready
          </button>
        </div>
      </OrderCard>
    );
  });
  return (
    <>
      <GlobalStyle />
      <OrderPageStyle>
        <OrderHeading>Orders:</OrderHeading>
        <SectionGrid>{currentOrders}</SectionGrid>
      </OrderPageStyle>
    </>
  );
}

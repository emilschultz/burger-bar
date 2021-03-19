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
  const [readyOrder, setReadyOrder] = useState();
  console.log("readyOrder:", readyOrder);

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

  const delivery = async (key) => {
    try {
      await firebase.database().ref("delivery").push({ key });
    } catch (error) {
      setError(error.message);
      console.log("Noget gik galt med afsendingen");
    }
  };

  // const addOrderToDelivery = (product) => {
  //   setReadyOrder([readyOrder, product]);
  // };

  const currentOrders = orderList.map((array) => {
    return (
      <OrderCard id={array.key} key={Math.random() * (100 + 1)}>
        <p style={{ borderBottom: ".1rem solid #1731f5" }}>
          <strong>Order number: {array.key}</strong>
        </p>

        {array.list.map((order) => {
          return (
            <div
              style={{
                // borderTop: ".1rem solid #1731f5",
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
        {/* <button> Preparing order </button> */}
        <button
          onClick={() => {
            delivery(array.key);
          }}
        >
          Order ready
        </button>
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

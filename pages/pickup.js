import Link from "next/link";
import firebase from "../config/firebase";
import { useState, useEffect } from "react";

// STYLED COMPONENTS
import GlobalStyle from "../components/GlobalStyle";
import SectionGrid from "../components/SectionGrid";
import OrderCard from "../components/RedCard";

export default function pickup() {
  const [orderReady, setOrderReady] = useState([]);
  const [preparingOrder, setPreparingOrder] = useState([]);

  // GET DATA FROM "delivery" IN REALTIME DATABASE
  useEffect(() => {
    firebase
      .database()
      .ref("delivery")
      .on("value", (snapshot) => {
        let newOrderReady = [];
        snapshot.forEach((snap) => {
          newOrderReady.push({
            list: snap.val(),
            key: snap.key,
          });
        });
        setOrderReady(newOrderReady);
      });
  }, []);
  console.log("READY:", orderReady);

  // GET DATA FROM "preparing" IN REALTIME DATABASE
  useEffect(() => {
    firebase
      .database()
      .ref("preparing")
      .on("value", (snapshot) => {
        let preparingNewOrder = [];
        snapshot.forEach((snap) => {
          preparingNewOrder.push({
            list: snap.val(),
            key: snap.key,
          });
        });
        setPreparingOrder(preparingNewOrder);
      });
  }, []);

  console.log("PREPARING:", preparingOrder);

  // MAP THROUGH ORDERS READY FOR PICKUP
  const readyForPickUp = orderReady.map((array) => {
    return (
      <OrderCard key={array.key}>
        <p>
          <strong>{array.list.key}</strong>
        </p>
        );
      </OrderCard>
    );
  });

  // MAP THROUGH ORDERS BEING PREPARED
  const prepareing = preparingOrder.map((array) => {
    return (
      <OrderCard key={array.key}>
        <p>
          <strong>{array.list.key}</strong>
        </p>
        );
      </OrderCard>
    );
  });

  return (
    <>
      <GlobalStyle />

      <h1>Ready for pick up:</h1>
      <SectionGrid>{readyForPickUp}</SectionGrid>

      <h1>Preparing:</h1>
      <SectionGrid>{prepareing}</SectionGrid>

      <Link href="/">
        <button>Return to home page</button>
      </Link>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Link from "next/link";
import firebase from "../config/firebase";
import { useCart } from "../context/CartContext";

import NavBar from "../components/NavBar";
import GlobalStyle from "../components/GlobalStyle";
import Heading from "../components/Heading";
import RedCard from "../components/RedCard";
import SectionGrid from "../components/SectionGrid";
import AddToCartButton from "../components/AddToCartButton";

function Burgers() {
  const [burgers, setBurgers] = useState([]);
  const cart = useCart();

  useEffect(() => {
    firebase
      .firestore()
      .collection("burgers")
      .onSnapshot((querySnapshot) => {
        setBurgers(querySnapshot.docs.map((burger) => burger.data()));
      });
  }, []);

  const burgerList = burgers.map((burger) => {
    return (
      <RedCard key={Math.random() * (500 - 1)}>
        <h1>{burger.name}</h1>
        <p>{burger.description}</p>
        <p>{burger.price} kr</p>
        <AddToCartButton
          onClick={() => {
            cart.addProductToCart({
              title: burger.name,
              price: burger.price,
              quantity: burger.quantity,
            });
          }}
        >
          Add to cart ⬇
        </AddToCartButton>
      </RedCard>
    );
  });

  return (
    <>
      <GlobalStyle />
      <NavBar />
      <main>
        <Heading>Burgers</Heading>

        <SectionGrid>{burgerList}</SectionGrid>

        <Heading>Cart</Heading>
        <ul>
          {cart.productsInCart.map((item) => {
            return (
              <div key={Math.random() * (100 - 1)}>
                <li>
                  {item.quantity} x {item.title} = {item.price} kr
                </li>
              </div>
            );
          })}
        </ul>
        <p>Total: {cart.total} kr</p>
        <p>Items in cart: {cart.quantity}</p>

        {/* <button onClick={clearCart}>Clear cart</button> */}
        <Link href="/cart">
          <button>Go to cart</button>
        </Link>
      </main>
    </>
  );
}
export default Burgers;

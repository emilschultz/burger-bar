import firebase from "../config/firebase";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

import GlobalStyle from "../components/GlobalStyle";
import NavBar from "../components/NavBar";
import Heading from "../components/Heading";
import MenuCard from "../components/MenuCard";
import SectionGrid from "../components/SectionGrid";
import AddToCartButton from "../components/AddToCartButton";

function AddOns() {
  let [addOns, setAddOns] = useState([]);
  const cart = useCart();

  useEffect(() => {
    firebase
      .firestore()
      .collection("add-ons")
      .onSnapshot((querySnapshot) => {
        setAddOns(querySnapshot.docs.map((addon) => addon.data()));
      });
  }, []);

  const addOnsList = addOns.map((addon) => {
    return (
      <MenuCard key={Math.random() * (100 - 1)}>
        <h1>{addon.name}</h1>
        <p>{addon.description}</p>
        <p>{addon.price} kr</p>
        <AddToCartButton
          onClick={() => {
            cart.addProductToCart({
              title: addon.name,
              price: addon.price,
              quantity: addon.quantity,
            });
          }}
        >
          +
        </AddToCartButton>
      </MenuCard>
    );
  });

  return (
    <>
      <GlobalStyle />
      <NavBar />
      <main>
        <Heading>Add Ons</Heading>
        <SectionGrid>{addOnsList}</SectionGrid>
        <Heading>Cart</Heading>
        <ul>
          {cart.productsInCart.map((item) => {
            return (
              <li key={Math.random() * (100 - 1)}>
                {item.quantity} x {item.title} = {item.price} kr
              </li>
            );
          })}
        </ul>
        <p>Total: {cart.total} kr</p>
        <p>Items in cart: {cart.quantity}</p>
        <Link href="/cart">
          <button>Go to cart</button>
        </Link>
      </main>
    </>
  );
}

export default AddOns;

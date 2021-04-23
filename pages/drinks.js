import firebase from "../config/firebase";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

import GlobalStyle from "../components/GlobalStyle";
import NavBar from "../components/NavBar";
import Heading from "../components/Heading";
import RedCard from "../components/RedCard";
import SectionGrid from "../components/SectionGrid";
import AddToCartButton from "../components/AddToCartButton";
import Button from "../components/Button";

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const cart = useCart();

  useEffect(() => {
    firebase
      .firestore()
      .collection("drinks")
      .onSnapshot((querySnapshot) => {
        setDrinks(querySnapshot.docs.map((drink) => drink.data()));
      });
  }, []);

  const drinksList = drinks.map((drink) => {
    return (
      <RedCard key={Math.random() * (100 - 1)}>
        <h1>{drink.name}</h1>
        <p>{drink.description}</p>
        <p>{drink.price} kr</p>

        <AddToCartButton
          onClick={() => {
            cart.addProductToCart({
              title: drink.name,
              price: drink.price,
              quantity: drink.quantity,
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
        <Heading>Drinks</Heading>

        <SectionGrid>{drinksList}</SectionGrid>

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
        <p style={{ marginLeft: "1rem" }}>Total: {cart.total} kr</p>
        <p style={{ marginLeft: "1rem" }}>Items in cart: {cart.quantity}</p>
        <Link href="/cart">
          <Button style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
            Go to cart
          </Button>
        </Link>
      </main>
    </>
  );
}

export default Drinks;

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
      <MenuCard key={Math.random() * (100 - 1)}>
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
      </MenuCard>
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
        <p>Total: {cart.total} kr</p>
        <p>Items in cart: {cart.quantity}</p>
        <Link href="/cart">
          <button>Go to cart</button>
        </Link>
      </main>
    </>
  );
}

export default Drinks;

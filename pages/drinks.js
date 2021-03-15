import firebase from "../config/firebase";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

import GlobalStyle from "../components/GlobalStyle";
import NavBar from "../components/NavBar";

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
      <div key={drink.id}>
        <h1>{drink.name}</h1>
        <p>{drink.description}</p>
        <p>{drink.price} kr</p>

        <button
          onClick={() => {
            cart.addProductToCart({
              title: drink.name,
              price: drink.price,
              quantity: drink.quantity,
            });
          }}
        >
          +
        </button>
      </div>
    );
  });

  return (
    <>
      <GlobalStyle />
      <NavBar />
      <main>
        <h1>Drinks</h1>
        {drinksList}
        <h1>Cart</h1>
        <ul>
          {cart.productsInCart.map((item) => {
            return (
              <li>
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

import firebase from "../config/firebase";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

import GlobalStyle from "../components/GlobalStyle";
import NavBar from "../components/NavBar";

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
      <div key={Math.random() * (100 - 1)}>
        <h1>{addon.name}</h1>
        <p>{addon.description}</p>
        <p>{addon.price} kr</p>
        <button
          onClick={() => {
            cart.addProductToCart({
              title: addon.name,
              price: addon.price,
              quantity: addon.quantity,
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
        <h1>Add Ons</h1>
        {addOnsList}
        <h1>Cart</h1>
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

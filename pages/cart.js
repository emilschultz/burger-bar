import firebase from "../config/firebase";
import { useCart } from "../context/CartContext";
import Link from "next/link";

import NavBar from "../components/NavBar";
import GlobalStyle from "../components/GlobalStyle";

function Cart() {
  const cart = useCart();

  const checkout = async () => {
    try {
      await firebase.database().ref("orders").push(cart.productsInCart);
    } catch (error) {
      setError(error.message);
      console.log("Noget gik galt med bestillilngen");
    }
  };

  const removeItem = (event) => {
    const newCart = [...cart.productsInCart];
    newCart.splice(event.target.value, 1);
    cart.setProductsInCart(newCart);
  };

  const emptyCart = () => {
    let empty = [];
    cart.setProductsInCart(empty);
  };

  return (
    <>
      <GlobalStyle />
      <NavBar />
      <h1>Cart</h1>
      <ul>
        {cart.productsInCart.map((item) => {
          return (
            <div key={Math.random() * (100 - 1)}>
              <li>
                {item.quantity} x {item.title} = {item.price} kr
                <button onClick={removeItem}>Remove</button>
              </li>
            </div>
          );
        })}
      </ul>
      <p>Total: {cart.total} kr</p>
      <p>Items in cart: {cart.quantity}</p>
      <button onClick={emptyCart}>Empty cart</button>

      <Link href="/pickup">
        <button onClick={checkout}>Checkout</button>
      </Link>
    </>
  );
}

export default Cart;

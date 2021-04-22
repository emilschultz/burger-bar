import firebase from "../config/firebase";
import { useCart } from "../context/CartContext";
import Link from "next/link";

import NavBar from "../components/NavBar";
import GlobalStyle from "../components/GlobalStyle";

function Cart() {
  const cart = useCart();

  const checkout = async () => {
    try {
      await firebase.database().ref("orders").add(cart.productsInCart);
    } catch (error) {
      console.log("Noget gik galt med bestillilngen");
    }
  };

  const removeItem = (index) => {
    const newCart = [...cart.productsInCart];
    newCart.splice(index, 1);
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
        {cart.productsInCart.map((item, index) => {
          return (
            <div key={Math.random() * (100 - 1)}>
              <li>
                {item.quantity} x {item.title} = {item.price} kr
                <button onClick={() => removeItem(index)}>Remove</button>
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

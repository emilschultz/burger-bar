import firebase from "../config/firebase";
import { useCart } from "../context/CartContext";

import NavBar from "../components/NavBar";
import GlobalStyle from "../components/GlobalStyle";

function Cart() {
  const cart = useCart();

  const checkout = async () => {
    console.log(cart);
    try {
      await firebase.database().ref("orders").push(cart.productsInCart);
    } catch (error) {
      setError(error.message);
      console.log("Noget gik galt med bestillilngen");
    }
  };
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <h1>Cart</h1>
      <ul>
        {cart.productsInCart.map((item) => {
          return (
            <>
              <li>
                {item.quantity} x {item.title} = {item.price} kr
              </li>
            </>
          );
        })}
      </ul>
      <p>Total: {cart.total} kr</p>
      <p>Items in cart: {cart.quantity}</p>
      <button onClick={checkout}>Checkout</button>
    </>
  );
}

export default Cart;

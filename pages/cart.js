import firebase from "../config/firebase";
import { useCart } from "../context/CartContext";

import NavBar from "../components/NavBar";
import GlobalStyle from "../components/GlobalStyle";

function Cart() {
  const cart = useCart();
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
              {/* <button onClick={clearCart}>Remove</button> */}
            </>
          );
        })}
      </ul>
      <p>Total: {cart.total} kr</p>
      <p>Items in cart: {cart.quantity}</p>

      {/* <button onClick={checkout}>Checkout</button> */}
    </>
  );
}

export default Cart;

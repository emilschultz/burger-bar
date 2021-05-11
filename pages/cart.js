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
      <Heading>Cart</Heading>
      <ul style={{ marginLeft: "1rem" }}>
        {cart.productsInCart.map((item, index) => {
          return (
            <div key={Math.random() * (100 - 1)}>
              <li>
                {item.quantity} x {item.title} = {item.price} kr
                <Button
                  onClick={() => removeItem(index)}
                  style={{ margin: ".5rem", height: "1.25rem", width: "6%" }}
                >
                  Remove
                </Button>
              </li>
            </div>
          );
        })}
      </ul>
      <p style={{ marginLeft: "1rem" }}>Total: {cart.total} kr</p>
      <p style={{ marginLeft: "1rem" }}>Items in cart: {cart.quantity}</p>
      <Button style={{ marginLeft: "1rem" }} onClick={emptyCart}>
        Empty cart
      </Button>

      <Link href="/pickup">
        <Button onClick={checkout}>Checkout</Button>
      </Link>
    </>
  );
}

export default Cart;

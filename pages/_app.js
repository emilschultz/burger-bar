import AuthProvider from "../config/auth";
import { Cart } from "../context/CartContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Cart>
        <Component {...pageProps} />
      </Cart>
    </AuthProvider>
  );
}

export default MyApp;

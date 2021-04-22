import Link from "next/link";
import NavBarStyle from "../NavBarStyle";

export default function NavBar() {
  return (
    <NavBarStyle>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>

      <li>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </li>

      <li>
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </li>
      <li
        style={{
          fontWeight: "bold",
          fontStyle: "italic",
          textDecoration: "underline",
          color: "red",
        }}
      >
        Menu:
      </li>
      <li>
        <Link href="/burgers">
          <a>Burgers</a>
        </Link>
      </li>

      <li>
        <Link href="/drinks">
          <a>Drinks</a>
        </Link>
      </li>

      <li>
        <Link href="/addons">
          <a>Add Ons</a>
        </Link>

        <Link href="/cart">
          <a
            style={{
              marginLeft: "1.5rem",
              fontWeight: "bold",
              fontStyle: "italic",
              textDecoration: "underline",
              color: "red",
            }}
          >
            Cart
          </a>
        </Link>
      </li>
    </NavBarStyle>
  );
}

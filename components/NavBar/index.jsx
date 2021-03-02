import Link from 'next/link';
import NavnbarStyle from '../NavBarStyle';

export default function NavBar() {
  return(
    <NavnbarStyle>
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
    </NavnbarStyle>
  )
}
import Link from 'next/link';
import NavBarStyle from '../NavBarStyle';

export default function NavBar() {
  return(
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
    </NavBarStyle>
  )
}
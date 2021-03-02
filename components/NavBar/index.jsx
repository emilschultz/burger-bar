import Link from 'next/link';

export default function NavBar() {
  return(
    <ul>
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
    </ul>
  )
}
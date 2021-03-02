import Link from 'next/link';
import NavBar from '../components/NavBar';
import GlobalStyle from '../components/GlobalStyle';

export default function login() {
  return(
    <>
      <GlobalStyle />
      <NavBar />
      <h1>Login</h1>
      <form>
        <label htmlFor="e-mail">E-mail</label>
        <input type="text" placeholder="e-mail" name="e-mail" required></input>
        
        <label htmlFor="password">Password</label>
        <input type="text" placeholder="password" name="password" required></input>

        <button type="submit">Login</button>
        <Link href="/">
          <button type="button">Cancel</button>
        </Link>


      </form>
    </>
  )
}
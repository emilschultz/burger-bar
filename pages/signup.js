import Link from 'next/link';

export default function signup() {
  return(
    <>
      <h1>Sign up here</h1>
      <form>
        <label htmlFor="e-mail">E-mail</label>
        <input type="text" placeholder="e-mail" name="e-mail" required></input>

        <label htmlFor="password">Password</label>
        <input type="text" placeholder="password" name="password"></input>

        <button type="submit">Create user</button>
        <Link href="/">
          <button type="button">Cancel</button>
        </Link>

      </form>
    </>
  )
}
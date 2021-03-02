import Head from 'next/head';
import Link from 'next/link';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Børres Burger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main as="main">
        <section>
          
          <h1>Hi!</h1>
          <h2>Welcome to Børre's Burgers</h2>
          
          <Link href="/login">
            <button>Login</button>
          </Link>
          <Link href="/signup">
            <button>Sign Up</button>
          </Link>

        </section>
      </main>

    </>
  )
}
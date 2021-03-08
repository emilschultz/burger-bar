import Head from 'next/head';
import Link from 'next/link';
import firebase from '../config/firebase';

import NavBar from '../components/NavBar';
import GlobalStyle from '../components/GlobalStyle';
import { useEffect } from 'react';


export default function Home({ error }) {
  if (error !== undefined) {
    return (
        <p>En fejl er opstået: {error}</p>
    )
  }

  useEffect(async () => {
    const userSnapshot = await firebase.firestore().collection('users').get();

    const users = [];
    userSnapshot.forEach(doc => {
      users.push(doc.data());
    });
    console.log('users:', users)
  },[]);

  return (
    
    <>
      <Head>
        <title>Børres Burger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GlobalStyle />
      <NavBar />

      <main as="main">
        <section>
          
          <h1>Hi!</h1>
          <h2>Welcome to Børre's Burgers</h2>
          <p>Have a look at the menu and log in to order. <br/>
            If you don't have an account, click the sign up button</p>

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
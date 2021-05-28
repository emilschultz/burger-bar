import Head from "next/head";
import Link from "next/link";
import firebase from "../config/firebase";
import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { useAuth } from "../config/auth";

import NavBar from "../components/NavBar";
import GlobalStyle from "../components/GlobalStyle";
import Button from "../components/Button";

export default function Home() {
  useEffect(async () => {
    const userSnapshot = await firebase.firestore().collection("users").get();
    const users = [];
    userSnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    console.log("users:", users);
  }, []);

  return (
    <>
      <Head>
        <title>Børres Burger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GlobalStyle />
      <NavBar />

      <main style={{ marginLeft: "1rem" }}>
        <section>
          <h1>Hi!</h1>
          <h2>Welcome to Børre's Burgers</h2>
          <p>
            Have a look at the menu and log in to order. <br />
            If you don't have an account, click the sign up button
          </p>

          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </section>
      </main>
    </>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";

import firebase from "../config/firebase";
import { useState } from "react";

import NavBar from "../components/NavBar";
import GlobalStyle from "../components/GlobalStyle";

export default function signup() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const uid = user.uid;
      console.log("Du har lavet en bruger! tiløk");
      console.log(uid);
      router.push("/login");
    } catch (error) {
      setError(error.message);
      console.log("Noget gik galt med oprettelsen af din bruger");
    }
  };

  return (
    <>
      <GlobalStyle />
      <NavBar />

      <h1>Sign up here</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          name="email"
          placeholder="e-mail"
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Create user</button>

        <Link href="/">
          <button type="button">Cancel</button>
        </Link>

        <br />

        <Link href="/login">
          <button>Do you already have a user? Log in</button>
        </Link>
      </form>
    </>
  );
}

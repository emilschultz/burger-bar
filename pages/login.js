import React, { useState } from "react";
import Link from "next/link";
import firebase from "../config/firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";

import NavBar from "../components/NavBar";
import GlobalStyle from "../components/GlobalStyle";
import Button from "../components/Button";
import Heading from "../components/Heading";

const schema = object().shape({
  email: string().email("e-mail does not exist"),
  password: string().required("Incorrect password"),
});

export default function login() {
  const router = useRouter();
  const cart = useCart();

  const [error, setError] = useState(null);

  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    const { email, password } = data;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      cart.productsInCart.lenght > 0
        ? router.push("/cart")
        : router.push("/burgers");
    } catch (error) {
      setError(error.message);
      console.log("ERROR:", error.message);
    }
  };

  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Heading>Login</Heading>
      <div style={{ marginLeft: "1rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            ref={register}
          />
          <label htmlFor="password">Password::</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            ref={register}
          />

          {error && <p>{error}</p>}
          <Button type="submit">Login</Button>
        </form>
        <Link href="/">
          <Button type="button">Cancel</Button>
        </Link>
      </div>

      {/* <form style={{ marginLeft: "1rem" }} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" style={{ marginRight: ".5rem" }}>
          E-mail
        </label>
        <input
          type="text"
          name="email"
          placeholder="e-mail"
          ref={register}
          style={{ marginRight: "1rem" }}
        />

        <label htmlFor="password" style={{ marginRight: ".5rem" }}>
          Password
        </label>
        <input
          type="password"
          placeholder="password"
          name="password"
          ref={register}
          style={{ marginRight: "1rem" }}
        />

        <Button type="submit">Login</Button>

        <Link href="/">
          <Button type="button">Cancel</Button>
        </Link>
        <br />
        {errors.email && <p>{errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
      </form> */}
    </>
  );
}

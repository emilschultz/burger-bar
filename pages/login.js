import React, { useState, useEffect } from "react";
import Link from "next/link";
// import firebase from '../config/firebase';
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import NavBar from "../components/NavBar";
import GlobalStyle from "../components/GlobalStyle";

const schema = object().shape({
  email: string().email("e-mail does not exist"),
  password: string().required("Incorrect password"),
});

export default function login() {
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  // const [error, setError] = useState(null);

  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Form data:", data);
  };

  useEffect(() => {
    console.log("errors:", errors);
  }, [errors]);

  return (
    <>
      <GlobalStyle />
      <NavBar />
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">E-mail</label>
        <input type="text" name="email" placeholder="e-mail" ref={register} />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="password"
          name="password"
          ref={register}
        />
        <p>{errors.email && errors.email.message}</p>

        <button type="submit">Login</button>

        <Link href="/">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </>
  );
}

import firebase from "../config/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import NavBar from "../components/NavBar";
import GlobalStyle from "../components/GlobalStyle";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { object, string } from "yup";

const schema = object().shape({
  name: string().required("Please state your name"),
  email: string().required("Please use a valid e-mail"),
  password: string().required("Please "),
});

export default function signup() {
  const [error, setError] = useState(null);

  const router = useRouter();

  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      user.user.updateProfile({ displayName: name });
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <GlobalStyle />
      <NavBar />

      <Heading>Sign up here</Heading>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginLeft: "1rem" }}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
          ref={register}
        />
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          required
          ref={register}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
          ref={register}
        />
        <br />
        {error && <p>{error}</p>}

        <Link href="/login">
          <Button style={{ marginTop: "1rem" }} type="submit">
            Create user
          </Button>
        </Link>

        <Link href="/">
          <Button style={{ marginTop: "1rem" }} type="button">
            Cancel
          </Button>
        </Link>

        <Link href="/login">
          <Button style={{ width: "21.5%", marginTop: "1rem" }}>
            Do you already have a user? Log in
          </Button>
        </Link>
      </form>
    </>
  );

  //   {
  //     /* <form onSubmit={handleSubmit} style={{ marginLeft: "1rem" }}>
  //       <label style={{ marginRight: ".5rem" }} htmlFor="email">
  //         E-mail
  //       </label>
  //       <input
  //         type="text"
  //         name="email"
  //         placeholder="e-mail"
  //         onChange={(event) => setEmail(event.target.value)}
  //         style={{ marginRight: "1rem" }}
  //       />

  //       <label style={{ marginRight: ".5rem" }} htmlFor="password">
  //         Password
  //       </label>
  //       <input
  //         type="password"
  //         name="password"
  //         placeholder="password"
  //         onChange={(event) => setPassword(event.target.value)}
  //         style={{ marginRight: "1rem" }}
  //       />
  //       <br />
  //       <Button style={{ marginTop: "1rem" }} type="submit">
  //         Create user
  //       </Button>

  //       <Link href="/">
  //         <Button style={{ marginTop: "1rem" }} type="button">
  //           Cancel
  //         </Button>
  //       </Link>

  //       <br />

  //       <Link href="/login">
  //         <Button style={{ width: "21.5%", marginTop: "1rem" }}>
  //           Do you already have a user? Log in
  //         </Button>
  //       </Link>
  //     </form> */
  //   }
  //   {
  //     /* </>
  // ); */
  //   }
}

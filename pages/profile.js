import React, { useEffect } from "react";

import firebase from "../config/firebase";
import { useAuth } from "../config/auth";
import { useRouter } from "next/router";
import { firebaseAdmin } from "../config/firebaseAdmin";
import nookies from "nookies";
import GlobalStyle from "../components/GlobalStyle";

export default function Profile() {
  const router = useRouter();
  const userContext = useAuth();

  useEffect(() => {
    console.log("The context", userContext);
  }, [userContext]);

  const handleSignout = async () => {
    await firebase.auth().signOut();
    router.push("/");
  };

  return (
    <div>
      <GlobalStyle />
      <div>
        <p>Profile</p>
        <button onClick={handleSignout}>Sign out</button>
        {userContext && (
          <>
            <h1>Username:</h1>
            <p>{userContext.email}</p>
            <h1>Password:</h1>
            <p>{userContext.uid}</p>
          </>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    console.log(cookies.token);
    console.log("TOKEN", JSON.stringify(token));
    const { uid, email } = token;
    return {
      props: { email, uid },
    };
  } catch (error) {
    console.log("Something went WRONG!");
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};

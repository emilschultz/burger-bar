
import React, { useEffect } from "react";

import firebase from "../config/firebase";
import { useAuth } from "../config/auth";
import { useRouter } from "next/router";
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
};
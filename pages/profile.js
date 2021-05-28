import firebase from "../config/firebase";
import React, { useEffect, useState } from "react";
import { useAuth } from "../config/auth";
import { useRouter } from "next/router";

import GlobalStyle from "../components/GlobalStyle";
import Button from "../components/Button";

export default function Profile() {
  const router = useRouter();
  const userContext = useAuth();

  if (!userContext) {
    return <p>You are not logged in</p>;
  }

  const handleSignout = async () => {
    await firebase.auth().signOut();
    router.push("/");
  };

  useEffect(() => {
    console.log("The context", userContext);
  }, [userContext]);

  return (
    <div>
      <GlobalStyle />
      <div>
        <p>Profile</p>
        {userContext && (
          <>
            <h1>Hi {userContext.displayName}</h1>
            <ul>
              <li>Name: {userContext.displayName}</li>
              <li>E-mail: {userContext.email}</li>
              <li>User-id: {userContext.uid}</li>
            </ul>
          </>
        )}
      </div>
      <Button style={{ width: "100%" }} onClick={handleSignout}>
        Sign out
      </Button>
    </div>
  );
}

// export const getServerSideProps = async (ctx) => {
//   try {
//     const cookies = nookies.get(ctx);
//     const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
//     console.log(cookies.token);
//     console.log("TOKEN", JSON.stringify(token));
//     const { uid, email } = token;
//     return {
//       props: { email, uid },
//     };
//   } catch (error) {
//     console.log("Something went WRONG!");
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//     };
//   }
// };

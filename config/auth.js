import { createContext, useContext, useEffect, useState } from "react";

import firebase from "../config/firebase";
import nookies from "nookies";

const AuthContext = createContext({ user: null });

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", null, { path: "/" });
      } else {
        const token = user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  });

  useEffect(() => {
    if (user) {
      let ref = firebase.firestore().collection("users").doc(user.uid);

      ref.onSnapshot((docSnaphot) => {
        let data = {
          id: docSnaphot.id,
          ...docSnaphot.data(),
        };
        setUserData(data);
        console.log(userData);
      });
    }
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return clearInterval(handle);
  });

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

import React, { useState } from 'react';
import Link from 'next/link';
import firebaseInstance from '../config/firebase';
import NavBar from '../components/NavBar';
import GlobalStyle from '../components/GlobalStyle';

export default function login() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async(data) => {
    console.log("Form data = ", data);
    
    try {
      await firebaseInstance.auth().signInWithEmailAndPassword(email, password)
      console.log("Du er logget ind! Tiløk!")
    }
    catch(error) {
      setError(error.message)
      console.log("Log in failed")
    }
  }



  return(
    <>
      <GlobalStyle />
      <NavBar />
      <h1>Login</h1>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input 
          type="text" 
          name="email" 
          placeholder="e-mail" 
          required
          />
        
        <label htmlFor="password">Password</label>
        <input 
          type="text" 
          placeholder="password" 
          name="password" 
          required
          />

        <button type="submit">Login</button>
        <Link href="/">
          <button type="button">Cancel</button>
        </Link>


      </form>
    </>
  )
}
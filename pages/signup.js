import Link from 'next/link';
import firebaseInstance from '../config/firebase';

import NavBar from '../components/NavBar';
import GlobalStyle from '../components/GlobalStyle';
import { useState } from 'react';
import { useForm } from 'react-hook-form';



export default function signup() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null); 
  const { register, handleSubmit } = useForm();

  const onSubmit = async () => {
    // event.preventDefault();
    console.log(email, password);

    try {
      await firebaseInstance.auth().createUserWithEmailAndPassword(email, password)
      console.log("Du har lavet en bruger! tiløk")
    } 
    catch(error) {
      setError(error.message)
      console.log("Noget gik galt med oprettelsen af din bruger")
    }
  }


  return(
    <>
      <GlobalStyle />
      <NavBar />

      <h1>Sign up here</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">E-mail</label>
        <input 
          type="text" 
          name="email" 
          id="email"
          placeholder="e-mail" 
          ref={register({ 
            required: true, 
            maxLength: 30, 
            message: 'Please enter a valid e-mail' 
          })}
          
          onChange={event => setEmail(event.target.value)} 
        />


        <label htmlFor="password">Password</label>
        <input 
          type="text" 
          name="password"
          id="password"
          placeholder="password"
          ref={register({ 
            required: true, 
            maxLength: 15, 
            message: 'Wrong password' 
          })}
          onChange={event => setPassword(event.target.value)} 
          />

        <button type="submit">Create user</button>
        <Link href="/">
          <button type="button">Cancel</button>
        </Link>
        <Link href="/login">Do you already have a user? Then log in</Link>

      </form>
    </>
  )
}
import Head from 'next/head';
import Link from 'next/link';
import firebaseInstance from '../config/firebase';

import NavBar from '../components/NavBar';
import GlobalStyle from '../components/GlobalStyle';
import PreviewMenu from '../components/PreviewMenu';


export default function Home({ burger, error }) {
  if (error !== undefined) {
    return (
        <p>En fejl er opstået: {error}</p>
    )

  }
  console.log(burger)
  return (
    
    <>
      <Head>
        <title>Børres Burger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GlobalStyle />
      <NavBar />

      <main as="main">
        <section>
          
          <h1>Hi!</h1>
          <h2>Welcome to Børre's Burgers</h2>
          <p>Have a look at the menu and log in to order. <br/>
            If you don't have an account, click the sign up button</p>

          <Link href="/login">
            <button>Login</button>
          </Link>
          <Link href="/signup">
            <button>Sign Up</button>
          </Link>

        </section>

        {/* <PreviewMenu /> */}
      </main>
    </>

  )
}

// FIREBASE CONFIGURATION
Home.getInitialProps = async () => {
  // SET UP COLLECTION AND GET SPECIFIC DOCUMENT
  try {
    const collection = await firebaseInstance.firestore().collection('burgers');
    const document = await collection.doc('bacon-burger').get()

    // IF DOCUMENT DOESN'T EXISTS, THROW ERROR
    if (document.exists !== true) {
      throw new Error("Dokumentet findes ikke");
    }
    // IF DOCUMENT EXISTS, GET THE DATA AND RETURN IT
    const burger = {
      id: document.id,
      ...document.data()
    }

    return { burger };

  } catch (error) {
    return {
      error: error.message
    }
  }
};
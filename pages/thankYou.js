import Link from "next/link";

export default function thankYou() {
  return (
    <>
      <h1>
        Your order has been placed!
        <br />
        Kepp an eye on the screen to see when your order is ready for pickup.
      </h1>
      <Link href="/">
        <button>Return to home page</button>
      </Link>
    </>
  );
}

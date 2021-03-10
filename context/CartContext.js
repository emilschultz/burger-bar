import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({
  productsInCart: [],
  addProductToCart: () => {},
  total: 0,
  quantity: 0,
});

export const Cart = ({ children }) => {
  const [productsInCart, setProductsInCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0)

  const addProductToCart = (product) => {
    setProductsInCart([...productsInCart, product]);
  };

  // TOTAL
  useEffect(() => {
    const total = productsInCart.reduce((prev, cur) => {
      return prev + cur.price;
    }, 0 );
    setTotal(total);
  },[productsInCart]);
  
  // QUANTITY
  useEffect(() => {
    const quantity = productsInCart.reduce((prev, cur) => {
      return prev + cur.quantity;
    }, 0)
    setQuantity(quantity);
  }, [productsInCart]);
  


  return(
    <CartContext.Provider value={{ productsInCart, addProductToCart, total, quantity }}>
      {children}
    </CartContext.Provider>
  );
}

export const CartConsumer = CartContext.Consumer;

export const useCart = () => {
  return useContext(CartContext);
}
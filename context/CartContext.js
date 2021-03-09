import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({
  productsInCart: [],
  addProductToCart: () => {},
  total: 0
});

export const Cart = ({ children }) => {
  const [productsInCart, setProductsInCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addProductToCart = (product) => {
    setProductsInCart([...productsInCart, product]);
  };

  useEffect(() => {
    const total = productsInCart.reduce((prev, cur) => {
      return prev + cur.price;
    }, 0 );
    setTotal(total);
  },[productsInCart]);
  
  return(
    <CartContext.Provider value={{ productsInCart, addProductToCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const CartConsumer = CartContext.Consumer;

export const useCart = () => {
  return useContext(CartContext);
}
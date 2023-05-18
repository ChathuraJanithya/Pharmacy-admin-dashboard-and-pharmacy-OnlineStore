import React, { createContext, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  addToCart: () => {},
  removeItem: () => {},
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product) => {
    const existItem = cartItems.find(
      (item) => item.drug_name === product.drug_name
    );
    if (existItem) {
      setCartItems(
        cartItems.map((item) =>
          item.drug_name === product.drug_name
            ? { ...existItem, qty: existItem.qty + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    setCartCount(cartCount + 1);
  };

  const removeItem = (product) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.drug_name !== product.drug_name
    );
    setCartItems(updatedCartItems);
    setCartCount(cartCount - product.qty);
  };

  const total = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeItem,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

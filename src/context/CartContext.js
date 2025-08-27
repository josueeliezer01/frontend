import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setItems([]);
    const res = await fetch("http://localhost:3333/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const add = async (productId, quantity = 1) => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:3333/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    await fetchCart();
  };

  // decrementa quantidade
  const decrement = async (productId, quantity = 1) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3333/cart/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });
    await fetchCart();
  };

  // remove completamente
  const remove = async (productId) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3333/cart/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchCart();
  };

  const clear = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:3333/cart", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchCart();
  };

  return (
    <CartContext.Provider value={{ items, add, decrement, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

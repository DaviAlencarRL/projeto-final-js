import { createContext, useContext, useState, useEffect } from "react";
 
const CartContext = createContext({});
 
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("velour_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
 
 
  useEffect(() => {
    localStorage.setItem("velour_cart", JSON.stringify(items));
  }, [items]);
 
  function addToCart(product, size = null) {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.size === size
      );
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...product, size, qty: 1 }];
    });
  }
 
  function removeFromCart(id, size) {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }
 
  function updateQty(id, size, qty) {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i))
    );
  }
 
  function clearCart() {
    setItems([]);
  }
 
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);
 
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
 
export function useCart() {
  return useContext(CartContext);
}
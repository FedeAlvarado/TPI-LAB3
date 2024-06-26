import { useState, useEffect } from "react";

const useCarrito = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    let alertShown = false;
    let productAdded = false;

    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);

      if (existingProduct) {
        if (existingProduct.quantity < product.stock) {
          productAdded = true;
          if (productAdded) {
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 2000);
          }
          return prevCart.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          );
        } else {
          if (!alertShown) {
            alert("No puedes agregar más de este producto al carrito.");
            alertShown = true;
          }
          return prevCart;
        }
      } else {
        if (product.stock > 0) {
          productAdded = true;
          if (productAdded) {
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 2000);
          }
          return [...prevCart, { ...product, quantity: 1 }];
        } else {
          if (!alertShown) {
            alert("Este producto está agotado.");
            alertShown = true;
          }
          return prevCart;
        }
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (id, e) => {
    const quantity = isNaN(parseInt(e.target.value))
      ? 1
      : parseInt(e.target.value);
    const product = cart.find((product) => product.id === id);

    if (quantity < 1) {
      e.target.value = 1;
      return;
    }

    if (quantity > product.stock) {
      alert("No puedes agregar más de este producto al carrito.");
      e.target.value = product.stock;
      return;
    }

    setCart(
      cart.map((product) =>
        product.id === id ? { ...product, quantity: quantity } : product
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  return {
    cart,
    showSuccessMessage,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};

export default useCarrito;

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/layout/Layout";
import NotFound from "./components/notFound/NotFound";
import Login from "./components/login/Login";
import Protected from "./components/protected/Protected";
import Cart from "./components/cart/Cart";
import Products from "./components/products/Products";
import Contact from "./components/contact/Contact";
import { listProduct } from "./data/Data";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [product, setProduct] = useState(listProduct)


  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logOutHandler = () => {
    setIsLoggedIn(false);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected isSignedIn={isLoggedIn}>
          <Layout listProducts={product}></Layout>
        </Protected>
      ),
    },
    {
      path: "/login",
      element: (
        <Login onLogin={loginHandler} />
      ),
    },
    {
      path: "/products",
      element: (
        <Products listProducts={product}></Products>
      ),
    },
    {
      path: "/cart",
      element: (
        <Cart></Cart>
      ),
    },
    {
      path: "/contact",
      element: (
        <Contact></Contact>
      ),
    },
    {
      path: "*",
      element: <NotFound></NotFound>,
    },
  ]);

  return (
    <div className="d-flex flex-column align-items-center margen-superior">
      {<RouterProvider router={router} />}
    </div>
  );
}

export default App;

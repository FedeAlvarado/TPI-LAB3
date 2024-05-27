import 'bootstrap/dist/css/bootstrap.min.css';
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
import Dashboard from './components/dashboard/Dashboard';


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
          <Layout>
          <Dashboard></Dashboard>
          </Layout>
          
        </Protected>
      ),
    },
    {
      path: "/login",
      element: (
        <Layout>
          <Login onLogin={loginHandler} />
        </Layout>

      ),
    },
    {
      path: "/products",
      element: (
        <Layout>
          <Products listProducts={product}></Products>
        </Layout>

      ),
    },
    {
      path: "/cart",
      element: (
        <Layout>
          <Cart></Cart>
        </Layout>

      ),
    },
    {
      path: "/contact",
      element: (
        <Layout>
          <Contact></Contact>
        </Layout>

      ),
    },
    {
      path: "*",
      element: (
        <Layout>
          <NotFound></NotFound>
        </Layout>
      ),
    },
  ]);

  return (
    <div className="d-flex flex-column align-items-center margen-superior">
      {<RouterProvider router={router} />}
    </div>
  );
}

export default App;

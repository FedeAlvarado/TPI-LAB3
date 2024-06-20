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
import Superadmin from './components/superadmin/Superadmin';

function App() {
  const [product, setProduct] = useState(listProduct)

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Layout>
            <Dashboard />
          </Layout>
        </Protected>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Layout>
          <Dashboard />
        </Layout>

      ),
    },
    {
      path: "/login",
      element: (
        <Layout>
          <Login />
        </Layout>
      ),
    },
    {
      path: "/products",
      element: (
        <Layout>
          <Products listProducts={product} />
        </Layout>
      ),
    },
    {
      path: "/cart",
      element: (
          <Layout>
            <Cart listProducts={product} />
          </Layout>

      ),
    },
    {
      path: "/contact",
      element: (
        <Layout>
          <Contact />
        </Layout>
      ),
    },
    {
      path: "/superadmin",
      element: (
        <Layout>
          <Superadmin/>
        </Layout>
      ),
    },
    {
      path: "*",
      element: (
        <Layout>
          <NotFound />
        </Layout>
      ),
    },
  ]);

  return (
    <div className="d-flex flex-column align-items-center margen-superior">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import NotFound from './components/notFound/NotFound';
import Login from './components/login/Login';
import Protected from './components/protected/Protected';
import Cart from './components/cart/Cart';
import Products from './components/products/Products';
import Contact from './components/contact/Contact';
import { listProduct, listUsers } from './data/Data';
import Dashboard from './components/dashboard/Dashboard';
import SearchResults from './components/searchResults/SearchResults';
import Superadmin from './components/superadmin/Superadmin';
import Users from './components/users/Users';

function App() {
  const [cart, setCart] = useState([]);

  
  const router = createBrowserRouter([
    {
      path: '/',
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
      path: '/products',
      element: (
        <Layout>
          <Products carts={setCart} />
        </Layout>
      ),
    },
    {
      path: '/cart',
      element: (
        <Layout>
          <Cart cart={cart} setCart={setCart}/>
        </Layout>
      ),
    },
    {
      path: '/contact',
      element: (
        <Layout>
          <Contact />
        </Layout>
      ),
    },
    {
      path: '/search-results',
      element: (
        <Layout>
          <SearchResults carts={setCart}/>
        </Layout>
      ),
    },
    {
      path: "/superadmin",
      element: (
        <Layout>
          <Superadmin />
        </Layout>
      ),
    },
    {
      path: "/users",
      element: (
        <Layout>
          <Users />
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

  // Componente principal
  return (
    <div className="d-flex flex-column align-items-center margen-superior">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

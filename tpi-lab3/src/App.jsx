import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/layout/Layout";
import NotFound from "./components/notFound/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
          <Layout></Layout>
      ),
    },
    {
      path: "*",
      element: <NotFound></NotFound>,
    },
  ]);

  return (
    <div className="d-flex flex-column align-items-center">
      {<RouterProvider router={router} />}
    </div>
  );
}

export default App;

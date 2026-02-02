import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/layout/Layout";
import Search from "../pages/Search";
import BookDetails from "../pages/components/BookDetails";
import BookForm from "../pages/BookForm";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Router() {
  let { authReady, user } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Navigate to={"/login"} />,
        },
        {
          path: "/create",
          element: user ? <BookForm /> : <Navigate to={"/login"} />,
        },
        {
          path: "/edit/:id",
          element: user ? <BookForm /> : <Navigate to={"/login"} />,
        },
        {
          path: "/search",
          element: user ? <Search /> : <Navigate to={"/login"} />,
        },
        {
          path: "/books/:id",
          element: user ? <BookDetails /> : <Navigate to={"/login"} />,
        },
        {
          path: "/register",
          element: !user ? <Register /> : <Navigate to={"/"} />,
        },
        {
          path: "/login",
          element: !user ? <Login /> : <Navigate to={"/"} />,
        },
      ],
    },
  ]);
  return authReady && <RouterProvider router={router} />;
}

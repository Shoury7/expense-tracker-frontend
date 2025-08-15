import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import List from "./List";
import NewExpense from "./NewExpense";
import UpdateExpense from "./UpdateExpense";
const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/newExpense",
      element: <NewExpense />,
    },
    {
      path: "/updateExpense",
      element: <UpdateExpense />,
    },
    {
      path: "/",
      element: <List />,
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default Body;

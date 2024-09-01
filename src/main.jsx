import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./Pages/HomePage/HomePage";
import Elections from "./Pages/ViewElections/Elections";
import Signin from "./Pages/SIgnin/Signin";
import AuthProvider from "./AuthProvider/AuthProvider";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/User/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ManageUser from "./Pages/Admin/ManageUser/ManageUser";
import ManageSingleUser from "./Pages/Admin/ManageSingleUser/ManageSingleUser";
import AddElections from "./Pages/Admin/AddElection/AddElections";
import AllElections from "./Pages/Admin/AllElections/AllElections";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/elections",
        element: <Elections></Elections>,
      },
      {
        path: "/signin",
        element: <Signin></Signin>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "/dashboard",
            element: <Profile></Profile>,
          },{
            path: "/dashboard/users",
            element: <ManageUser></ManageUser>
          },{
            path: "/dashboard/users/:email",
            element: <ManageSingleUser></ManageSingleUser>
          }
          ,{
            path: "/dashboard/addelections",
            element: <AddElections></AddElections>
          }
          ,{
            path: "/dashboard/allelections",
            element: <AllElections></AllElections>
          }
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

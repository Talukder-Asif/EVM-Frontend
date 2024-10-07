import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AddElections from "../Pages/Admin/AddElection/AddElections";
import AllElections from "../Pages/Admin/AllElections/AllElections";
import Department from "../Pages/Admin/Department/Department";
import UpdateDepartment from "../Pages/Admin/Department/UpdateDepartment";
import ManageSingleUser from "../Pages/Admin/ManageSingleUser/ManageSingleUser";
import ManageUser from "../Pages/Admin/ManageUser/ManageUser";
import Voters from "../Pages/Admin/ManageVoters/Voters";
import Dashboard from "../Pages/Dashboard/Dashboard";
import HomePage from "../Pages/HomePage/HomePage";
import Signin from "../Pages/SIgnin/Signin";
import Profile from "../Pages/User/Profile";
import Elections from "../Pages/ViewElections/Elections";
import AdminRoute from "./AdminRoute";

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
              element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
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
            ,{
              path: "/dashboard/department",
              element: <Department></Department>
            }
            ,{
              path: "/dashboard/department/:id",
              element: <UpdateDepartment></UpdateDepartment>
            }
            ,{
              path: "/dashboard/voters",
              element: <Voters></Voters>
            }
          ],
        },
      ],
    },
  ]);

export default router;
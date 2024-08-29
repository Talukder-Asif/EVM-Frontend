import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import MainLayout from './Layout/MainLayout';
import HomePage from './Pages/HomePage/HomePage';
import Elections from './Pages/ViewElections/Elections';
import Signin from './Pages/SIgnin/Signin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>
  },
  {
    path:"/evm",
    element: <MainLayout></MainLayout>,
    children:[{
      path:"/evm/elections",
      element:<Elections></Elections>
    },{
      path:"/evm/signin",
      element:<Signin></Signin>
    }
  ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    </StrictMode>,
)

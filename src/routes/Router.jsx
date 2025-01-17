import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import WorkerHome from "../pages/Dashboard/Worker/WorkerHome/WorkerHome";
import BuyerHome from "../pages/Dashboard/Buyer/BuyerHome/BuyerHome";
import AddNewTask from "../pages/Dashboard/Buyer/AddNewTask/AddNewTask";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // for buyer
        {
          path: 'buyer-home',
          element: <BuyerHome />
        },
        {
          path: 'add-new-task',
          element: <AddNewTask />
        },
        // for worker
        {
          path: 'worker-home',
          element: <WorkerHome />
        }
      ]
    }
  ]);


  export default router
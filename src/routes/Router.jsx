import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import WorkerHome from "../pages/Dashboard/Worker/WorkerHome/WorkerHome";
import BuyerHome from "../pages/Dashboard/Buyer/BuyerHome/BuyerHome";
import AddNewTask from "../pages/Dashboard/Buyer/AddNewTask/AddNewTask";
import PrivateRoute from "./PrivateRoute";
import PurchaseCoin from "../pages/Dashboard/Buyer/PurchaseCoin/PurchaseCoin";
import MyTasks from "../pages/Dashboard/Buyer/MyTasks/MyTasks";
import PaymentHistory from "../pages/Dashboard/Buyer/PaymentHistory/PaymentHistory";
import BuyerRoute from "./BuyerRoute";

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
      element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
      children: [
        // for buyer
        {
          path: 'buyer-home',
          element: <BuyerRoute><BuyerHome /></BuyerRoute>
        },
        {
          path: 'add-new-task',
          element: <BuyerRoute><AddNewTask /></BuyerRoute>
        },
        {
          path: 'purchase-coin',
          element: <BuyerRoute><PurchaseCoin /></BuyerRoute>
        },
        {
          path: 'my-tasks',
          element: <BuyerRoute><MyTasks /></BuyerRoute>
        },
        {
          path: 'payment-history',
          element: <BuyerRoute><PaymentHistory /></BuyerRoute>
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
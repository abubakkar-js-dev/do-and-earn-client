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
import WorkerRoute from "./WorkerRoute";
import TaskList from "../pages/Dashboard/Worker/TaskList/TaskList";
import TaskDetails from "../pages/Dashboard/Worker/TaskDetails/TaskDetails";
import MySubmissions from "../pages/Dashboard/Worker/MySubmissions/MySubmissions";
import Withdrawals from "../pages/Dashboard/Worker/Withdrawals/Withdrawals";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageTasks from "../pages/Dashboard/Admin/ManageTasks/ManageTasks";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import AllTasks from "../pages/AllTasks/AllTasks";
import AboutUs from "../pages/AboutUs/AboutUs";
import MyProfile from "../pages/MyProfile/MyProfile";
import AnotherTaskDetails from "../pages/AnotherTaskDetails/AnotherTaskDetails";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
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
        },
        {
          path: 'all-tasks',
          element: <PrivateRoute><AllTasks /></PrivateRoute>
        },
        {
          path: 'about-us',
          element: <AboutUs />
        },
        {
          path: '/all-tasks/:id',
          element: <PrivateRoute><AnotherTaskDetails /></PrivateRoute>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
      children: [
        {
          path: 'my-profile',
          element: <MyProfile />
        },
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
          element: <WorkerRoute><WorkerHome /></WorkerRoute>
        },
        {
          path: 'task-list',
          element: <WorkerRoute><TaskList /></WorkerRoute>
        },
        {
          path: 'task-details/:id',
          element: <WorkerRoute><TaskDetails /></WorkerRoute>
        },
        {
          path: 'my-submissions',
          element: <WorkerRoute><MySubmissions /></WorkerRoute>
        },
        {
          path: 'withdrawals',
          element: <WorkerRoute><Withdrawals /></WorkerRoute>
        },
        //  for admin
        {
          path: 'admin-home',
          element: <AdminHome />
        },
        {
          path: 'manage-users',
          element: <ManageUsers />
        },
        {
          path: 'manage-tasks',
          element: <ManageTasks />
        }
      ]
    }
  ]);


  export default router
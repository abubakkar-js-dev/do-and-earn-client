import { Avatar, Badge, Layout, Menu } from "antd";
import { FaCoins } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdPayments } from "react-icons/md";
import { TiSocialSkypeOutline, TiUserOutline } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import logo from "../assets/images/logo-2.png";
import { Helmet } from "react-helmet-async";
import NotificationPopUp from "../components/NotificationPopUp/NotificationPopUp";

const { Header, Content, Sider } = Layout;

const DashboardLayout = () => {
  const {userData} = useUserData();

  const userRole = userData.role;
  const userName = userData.name;
  const availableCoins = userData.availableCoin;

  // console.log(userRole, "from ....")

  // const userRole = "buyer"; 
  // const userName = "John Doe";
  // const availableCoins = 50;

  const navigationItems = {
    Worker: [
      { key: "1", label: <NavLink to="/dashboard/worker-home">Home</NavLink>, icon: <IoHomeOutline /> },
      { key: "2", label: <NavLink to="/dashboard/task-list">Task List</NavLink>, icon: <TiSocialSkypeOutline /> },
      { key: "3", label:  <NavLink to="/dashboard/my-submissions">My Submissions</NavLink> , icon: <TiUserOutline /> },
      { key: "4", label: <NavLink to="/dashboard/withdrawals">Withdrawals</NavLink>, icon: <FaCoins /> },
    ],
    Buyer: [
      { key: "1", label: <NavLink to="/dashboard/buyer-home">Home</NavLink>, icon: <IoHomeOutline /> },
      { key: "2", label: <NavLink to="/dashboard/add-new-task">Add New Tasks</NavLink>, icon: <TiSocialSkypeOutline /> },
      { key: "3", label: <NavLink to="/dashboard/my-tasks">My Tasks</NavLink>, icon: <TiUserOutline /> },
      { key: "4", label: <NavLink to="/dashboard/purchase-coin">Purchase Coin</NavLink>, icon: <FaCoins /> },
      { key: "5", label: <NavLink to="/dashboard/payment-history">Payment History</NavLink>, icon: <MdPayments /> },
    ],
    Admin: [
      { key: "1", label: <NavLink to="/dashboard/admin-home">Home</NavLink>, icon: <IoHomeOutline /> },
      { key: "2", label: <NavLink to="/dashboard/manage-users">Manage Users</NavLink>, icon: <TiUserOutline /> },
      { key: "3", label: <NavLink to="/dashboard/manage-tasks">Manage Tasks</NavLink>, icon: <TiSocialSkypeOutline /> },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
    <Helmet>
      <title>Dashboard | Do&Earn</title>
    </Helmet>
      {/* Sidebar */}
      <Sider
        breakpoint="lg"
        collapsedWidth="80"
        // style={{ height: "100vh" }}
        className="min-h-screen"
      >
        <div className="p-4 text-center text-white text-lg font-bold">
          <img src={logo} alt="Logo" className="w-16 h-12 mx-auto rounded-3xl  object-cover" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={navigationItems[userRole?.charAt(0).toUpperCase() + userRole?.slice(1)]?.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            padding: "0 16px",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            <span className="mr-2">Available Coins:</span>
            <Badge count={availableCoins} overflowCount={999999} showZero>
              <FaCoins style={{ color: "gold" }} />
            </Badge>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* User Role and Name */}
        <span className="hidden md:block">
          {userRole} | {userName}
        </span>
        
        {/* Avatar with profile picture fallback */}
        <Avatar
          icon={!userData?.profilePicture ? <TiUserOutline /> : null}
          src={userData?.profilePicture || null}
          size={40} 
        />
        
        {/* Badge Icon */}
        <NotificationPopUp />
      </div>
        </Header>

        {/* Content */}
        <Content
        >
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              minHeight: "300px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Outlet />
          </div>
        </Content>

        {/* Footer */}
        {/* <Footer style={{ textAlign: "center" }}>Footer Section</Footer> */}
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

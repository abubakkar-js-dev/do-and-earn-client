import { Avatar, Badge, Layout, Menu } from "antd";
import { FaCoins } from "react-icons/fa";
import { IoBarbellOutline, IoHomeOutline } from "react-icons/io5";
import { MdPayments } from "react-icons/md";
import { TiSocialSkypeOutline, TiUserOutline } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import useUserData from "../hooks/useUserData";

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = () => {
  const {userData} = useUserData();

  const userRole = userData.role;
  const userName = userData.name;
  const availableCoins = userData.availableCoin;

  console.log(userRole, "from ....")

  // const userRole = "buyer"; 
  // const userName = "John Doe";
  // const availableCoins = 50;

  const navigationItems = {
    Worker: [
      { key: "1", label: <NavLink to="/dashboard/worker-home">Home</NavLink>, icon: <IoHomeOutline /> },
      { key: "2", label: "Task List", icon: <TiSocialSkypeOutline /> },
      { key: "3", label: "My Submissions", icon: <TiUserOutline /> },
      { key: "4", label: "Withdrawals", icon: <FaCoins /> },
    ],
    Buyer: [
      { key: "1", label: <NavLink to="/dashboard">Home</NavLink>, icon: <IoHomeOutline /> },
      { key: "2", label: <NavLink to="/dashboard/add-new-task">Add New Tasks</NavLink>, icon: <TiSocialSkypeOutline /> },
      { key: "3", label: "My Tasks", icon: <TiUserOutline /> },
      { key: "4", label: "Purchase Coin", icon: <FaCoins /> },
      { key: "5", label: "Payment History", icon: <MdPayments /> },
    ],
    Admin: [
      { key: "1", label: "Home", icon: <IoHomeOutline /> },
      { key: "2", label: "Manage Users", icon: <TiUserOutline /> },
      { key: "3", label: "Manage Tasks", icon: <TiSocialSkypeOutline /> },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        breakpoint="lg"
        collapsedWidth="80"
        // style={{ height: "100vh" }}
        className="min-h-screen"
      >
        <div className="p-4 text-center text-white text-lg font-bold">Logo</div>
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
            <Badge count={availableCoins} showZero>
              <FaCoins style={{ color: "gold" }} />
            </Badge>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span>{userRole} | {userName}</span>
            <Avatar icon={<TiUserOutline />} />
            <Badge dot>
              <IoBarbellOutline style={{ fontSize: "24px" }} />
            </Badge>
          </div>
        </Header>

        {/* Content */}
        <Content
          style={{
            padding: "16px",
            margin: "16px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "8px",
              minHeight: "300px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Outlet />
          </div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center" }}>Footer Section</Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

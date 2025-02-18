import { useEffect, useState } from "react";
import { Layout, Menu, Drawer, Button, Dropdown, message } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import './Navbar.css';
import useAuth from "../../hooks/useAuth";
import useUserData from "../../hooks/useUserData";

const { Header } = Layout;

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation();
  const { user, logOut, setUser } = useAuth();
  const { userData, refetch } = useUserData();

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [refetch, user]);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const handleLogout = () => {
    logOut().then(() => {
      message.success("Successfully Logged Out");
      setUser(null);
    })
    .catch((err) => {
      message.error("Failed to log out");
      console.error(err);
    });
  };

  // Common menu items
  const loggedOutMenuItems = [
    { key: "/", label: <NavLink to="/" className="nav-link text-base">Home</NavLink> },
    { key: "/login", label: <NavLink to="/login" className="nav-link text-base">Login</NavLink> },
    { key: "/register", label: <NavLink to="/register" className="nav-link text-base">Register</NavLink> },
  ];

  const loggedInMenuItems = [
    { key: "/", label: <NavLink to="/" className="nav-link text-base">Home</NavLink> },
    { key: "/dashboard", label: <NavLink to="/dashboard" className="nav-link text-base">Dashboard</NavLink> },
  ];

  const profileMenu = (
    <Menu>
      <Menu.Item key="coin">
        Available Coin: <strong>{userData?.availableCoin || 0}</strong>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  // if (userDataLoading) return <Loading />;

  return (
    <Layout className="bg-gradient-to-r from-blue-500 to-green-500 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900">
      <Header className="flex justify-between items-center py-6 md:py-8 px-8 md:px-12 container bg-transparent text-white dark:text-gray-200">
        {/* Logo */}
        <div className="logo font-bold text-2xl cursor-pointer transform hover:scale-110 transition">
          <h2 style={{ fontWeight: "bold", margin: 0 }}>
            Do <span className="text-orange-400 dark:text-orange-300">&</span> Earn
          </h2>
        </div>

        {/* Desktop Menu */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={user ? loggedInMenuItems : loggedOutMenuItems}
          className="hidden md:flex bg-transparent border-none flex-1 justify-end"
        />

        {/* Profile and Logout Button */}
        {user && (
          <Dropdown overlay={profileMenu} placement="bottomRight" arrow>
            <Button
              className="hidden md:block rounded-full bg-gradient-to-l from-blue-400 to-green-400 text-white border-none text-lg font-semibold dark:from-gray-700 dark:to-gray-600 dark:text-gray-200"
              icon={<UserOutlined />}
            >
              Profile
            </Button>
          </Dropdown>
        )}

        {/* Join Button */}
        <Button
          href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-abubakkar-js-dev"
          className="hidden md:block rounded-full text-lg font-semibold bg-gradient-to-l from-blue-400 to-green-400 text-white border-none ml-4 dark:from-gray-700 dark:to-gray-600 dark:text-gray-200"
        >
          Join As Developer
        </Button>

        {/* Mobile Menu Button */}
        <Button
          className="md:hidden"
          type="text"
          icon={<MenuOutlined style={{ fontSize: "24px", color: "white" }} />}
          onClick={showDrawer}
        />

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
          className="dark:bg-gray-800 dark:text-gray-200"
        >
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={user ? loggedInMenuItems : loggedOutMenuItems}
            className="dark:bg-gray-800 dark:text-gray-200"
          />
          {user && (
            <>
              <div className="mt-4 dark:text-gray-200">
                Available Coin: <strong>{userData?.availableCoin || 0}</strong>
              </div>
              <Button
                className="mt-4"
                type="primary"
                danger
                onClick={logOut}
              >
                Logout
              </Button>
            </>
          )}
        </Drawer>
      </Header>
    </Layout>
  );
};

export default Navbar;
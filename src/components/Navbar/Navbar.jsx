import { useState } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import './Navbar.css'

const { Header } = Layout;

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation();
  const user = true;

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const menuItems = [
    { key: "/", label: <NavLink to="/" className="nav-link text-base">Home</NavLink> },
    { key: "/login", label: <NavLink to="/login" className="nav-link text-base">Login</NavLink> },
    { key: "/register", label: <NavLink to="/register" className="nav-link text-base">Register</NavLink> },
    user && {key: '/dashboard',label: <NavLink to="/dashboard" className="nav-link text-base">Dashboard</NavLink>}
  ].filter(Boolean);

  return (
    <Layout>
      <Header
        className="flex justify-between items-center py-4 px-6"
        style={{
          background: "linear-gradient(to right, #3b82f6, #10b981)", // Blue-500 to Green-500
          color: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo */}
        <div className="logo font-bold text-2xl cursor-pointer transform hover:scale-110 transition">
          <h2 style={{ fontWeight: "bold", margin: 0 }}>Do <span className="text-orange-400">&</span> Earn</h2>
        </div>

        {/* Desktop Menu */}
        <Menu
          className="hidden md:flex"
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]} // Highlight the current route
          items={menuItems}
          style={{
            background: "transparent",
            border: "none",
            flex: 1,
            justifyContent: "flex-end",
          }}
        />

        {/* Mobile Menu Button */}
        <Button
          className="md:hidden"
          type="text"
          icon={<MenuOutlined style={{ fontSize: "24px", color: "white" }} />}
          onClick={showDrawer}
        />

        {/* Join Button */}
        <Button
            href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-abubakkar-js-dev"
          type="dashed"
          className="hidden md:block rounded-full text-lg font-semibold bg-orange-400 text-white"
        >
          Join As Developer
        </Button>

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]} // Highlight the current route
            items={menuItems}
          />
        </Drawer>
      </Header>
    </Layout>
  );
};

export default Navbar;

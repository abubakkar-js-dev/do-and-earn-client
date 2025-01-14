import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar />
            {/* outlet */}
            <Outlet />
            {/* footer */}
        </div>
    );
};

export default MainLayout;
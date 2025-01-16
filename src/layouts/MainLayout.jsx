import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col">
            {/* Navbar */}
            <Navbar />
            {/* outlet */}
            <div className="flex-grow">
            <Outlet />
            </div>
            {/* footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;
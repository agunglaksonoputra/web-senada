import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* FIXED SIDEBAR */}
      <AdminSidebar />

      <div className="md:ml-64 flex-1 overflow-y-auto px-6 py-8 bg-black pt-13 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

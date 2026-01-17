import { Outlet, NavLink } from "react-router";
import Topbar from "./Topbar";
import { ClipboardList, House, LayoutDashboard, Plus, UserCircle, UserPen, Wrench } from "lucide-react";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* SIDEBAR */}
            <aside className="w-68 bg-gray-900 text-white p-4">
                <h2 className="text-4xl mt-10 font-bold mb-14">Plate Share</h2>

                <nav className="space-y-4">


                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-lg ${isActive ? "" : "hover:bg-gray-800"} flex gap-2`
                        }
                    >
                        <LayoutDashboard />Dashboard Home
                    </NavLink>

                    <NavLink
                        to="/dashboard/add-food"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-lg ${isActive ? "bg-gray-700" : "hover:bg-gray-800"} flex gap-2`
                        }
                    >
                        <Plus /> Add Food
                    </NavLink>
                    <NavLink
                        to="/dashboard/my-foods"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-lg ${isActive ? "bg-gray-700" : "hover:bg-gray-800"} flex gap-2`
                        }
                    >
                        <Wrench /> My Foods
                    </NavLink>
                    <NavLink
                        to="/dashboard/my-requests"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-lg ${isActive ? "bg-gray-700" : "hover:bg-gray-800"} flex gap-2`
                        }
                    >
                        <ClipboardList /> My Requests
                    </NavLink>


                    <NavLink
                        to="/dashboard/edit-profile"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-lg ${isActive ? "bg-gray-700" : "hover:bg-gray-800"} flex gap-2`
                        }
                    >
                        <UserPen /> Edit Profile
                    </NavLink>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-lg ${isActive ? "bg-gray-700" : "hover:bg-gray-800"} flex gap-2`
                        }
                    >
                        <House /> Back to Home
                    </NavLink>


                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col">
                <Topbar />
                <div className="p-8">
                    <Outlet />
                </div>
            </main>


        </div>
    );
};

export default DashboardLayout;

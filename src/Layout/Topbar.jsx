import { useContext } from "react";
import { AuthContext } from "../Contetexts/AuthProvider";
import { LogOut, User } from "lucide-react";
import toast from "react-hot-toast";

const Topbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="h-22 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h3 className="font-semibold text-2xl text-gray-800">
        Welcome, <span className="text-primary text-4xl">{user?.displayName || "User"}</span>
      </h3>

      <div className="flex items-center gap-4">
        <img
          src={user?.photoURL || "https://i.ibb.co/2kRZ6yX/user.png"}
          alt="user"
          className="w-13 h-13 rounded-full object-cover"
        />

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-xl text-red-500 hover:text-red-600"
        >
          <LogOut size={32} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;

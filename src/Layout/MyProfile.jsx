import { useContext } from "react";
import { motion } from "framer-motion";
import { User, Mail, Image as ImageIcon, Edit } from "lucide-react";
import { AuthContext } from "../Contetexts/AuthProvider";
import { useNavigate } from "react-router";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-10"
      >
        {/* HEADER */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-12"
        >
          <img
            src={user?.photoURL || "https://i.ibb.co/2kRZ6yX/user.png"}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-lg"
          />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
            My Profile
          </h2>
          <p className="text-gray-500 dark:text-gray-300">
            View your personal information
          </p>
        </motion.div>

        {/* INFO CARDS */}
        <div className="space-y-6">
          {/* NAME */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
          >
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <User />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Full Name
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {user?.displayName || "Not provided"}
              </p>
            </div>
          </motion.div>

          {/* EMAIL */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
          >
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Mail />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Email Address
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {user?.email}
              </p>
            </div>
          </motion.div>

          {/* PHOTO URL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
          >
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <ImageIcon />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Photo URL
              </p>
              <p className="text-sm text-gray-800 dark:text-white truncate max-w-[260px]">
                {user?.photoURL || "Not provided"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* EDIT BUTTON */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-10 flex justify-end"
        >
          <button
            onClick={() => navigate("/dashboard/edit-profile")}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition"
          >
            <Edit size={18} />
            Edit Profile
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MyProfile;

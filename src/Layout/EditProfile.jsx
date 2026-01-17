import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Image as ImageIcon, Save, ArrowLeft } from "lucide-react";
import { AuthContext } from "../Contetexts/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const { user, updateUserProfile, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Name is required");
    if (!photo.trim()) return toast.error("Photo URL is required");

    try {
      setSaving(true);
      setLoading(true);

      /* 🔹 1. Update Firebase Auth */
      await updateUserProfile(name, photo);

      /* 🔹 2. Update your DATABASE */
      await fetch("https://plate-share-server-blue.vercel.app/users/profile", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          name,
          photo,
        }),
      });

      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-10"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Edit Profile
            </h2>
            <p className="text-gray-500 dark:text-gray-300">
              Update your personal information
            </p>
          </div>

          {/* <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary"
          >
            <ArrowLeft size={18} />
            Back
          </button> */}
        </div>

        {/* LIVE PREVIEW */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-6 mb-10"
        >
          <img
            src={photo || "https://i.ibb.co/2kRZ6yX/user.png"}
            alt="preview"
            className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-md"
          />
          <div>
            {/* <p className="text-sm text-gray-500 dark:text-gray-300">
              Live Preview
            </p> */}
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
              {name || "Your Name"}
            </h4>
          </div>
        </motion.div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white outline-none"
              />
            </div>
          </div>

          {/* EMAIL (READ ONLY) */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-100 cursor-not-allowed text-gray-500"
              />
            </div>
          </div>

          {/* PHOTO URL */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">
              Photo URL
            </label>
            <div className="relative">
              <ImageIcon
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white outline-none"
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfile;

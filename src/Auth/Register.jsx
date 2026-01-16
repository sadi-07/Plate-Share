import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Image } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Contetexts/AuthProvider";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { createUser, updateUserProfile, GUser, setLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleRegister = async (data) => {
    try {
      setLoading(true);
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photo);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration Failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    setLoading(true);

    GUser()
      .then(() => {
        toast.success("Logged in successfully!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Google login failed!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 w-full max-w-md border border-gray-200 dark:border-gray-700"
      >
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8"
        >
          Create Account
        </motion.h2>

        <form onSubmit={handleSubmit(handleRegister)}>
          {/* Name */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="mb-5"
          >
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Full Name
            </label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                placeholder="Enter your name"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </motion.div>

          {/* Photo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 }}
            className="mb-5"
          >
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Photo URL
            </label>
            <div className="relative mt-2">
              <Image className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                placeholder="Enter photo URL"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                {...register("photo", { required: "Photo URL is required" })}
              />
            </div>
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photo.message}
              </p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.35 }}
            className="mb-5"
          >
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Email Address
            </label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          {/* Password */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
            className="mb-5"
          >
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Password
            </label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          {/* Register Button */}
          <motion.button
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold shadow-md transition cursor-pointer"
          >
            Register
          </motion.button>
        </form>

        <div className="flex items-center my-6 opacity-60">
          <span className="grow border-b"></span>
          <span className="mx-3 text-gray-500 dark:text-gray-300 text-sm">
            OR
          </span>
          <span className="grow border-b"></span>
        </div>

        {/* Google Register */}
        <motion.button
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          onClick={handleGoogle}
          className="w-full py-3 flex items-center justify-center gap-3 bg-white rounded-lg shadow-md mb-6 cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-6 h-6"
          />
          Continue with Google
        </motion.button>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600 dark:text-gray-300 mt-6"
        >
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login Here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Register;

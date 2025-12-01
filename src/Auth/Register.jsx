import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { updateProfile } from "firebase/auth";
import {
    Eye, EyeOff, Mail, Lock, User, Image as ImageIcon
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Contetexts/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
    const { createUser, updateUserProfile, GUser, setLoading } = useContext(AuthContext);

    const [showPass, setShowPass] = useState(false);
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const validatePassword = () => {
        const err = [];
        if (!/[A-Z]/.test(pass)) err.push("At least 1 uppercase letter required.");
        if (!/[a-z]/.test(pass)) err.push("At least 1 lowercase letter required.");
        if (pass.length < 6) err.push("Password must be at least 6 characters.");
        setErrors(err);
        return err.length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validatePassword()) return;

        try {
            setLoading(true);
            const result = await createUser(email, pass);
            await updateUserProfile(name, photo);
            toast.success("Account created successfully!");
            navigate("/");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            setLoading(true);
            await GUser();
            toast.success("Logged in with Google!");
            navigate("/");
        } catch {
            toast.error("Google Login Failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 w-full max-w-md border border-gray-200 dark:border-gray-700"
            >
                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8"
                >
                    Create an Account
                </motion.h2>

                <form onSubmit={handleRegister}>
                    {/* FULL NAME */}
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="mb-5">
                        <label className="text-gray-700 dark:text-gray-300 font-medium">Full Name</label>
                        <div className="relative mt-2">
                            <User className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </motion.div>

                    {/* PHOTO URL */}
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.28 }} className="mb-5">
                        <label className="text-gray-700 dark:text-gray-300 font-medium">Photo URL</label>
                        <div className="relative mt-2">
                            <ImageIcon className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                required
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                                placeholder="Enter photo URL"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </motion.div>

                    {/* EMAIL */}
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.35 }} className="mb-5">
                        <label className="text-gray-700 dark:text-gray-300 font-medium">Email Address</label>
                        <div className="relative mt-2">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </motion.div>

                    {/* PASSWORD */}
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.45 }} className="mb-5">
                        <label className="text-gray-700 dark:text-gray-300 font-medium">Password</label>
                        <div className="relative mt-2">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type={showPass ? "text" : "password"}
                                required
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-12 py-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </motion.div>

                    {/* PASSWORD ERRORS */}
                    {errors.length > 0 && (
                        <motion.ul variants={fadeUp} initial="hidden" animate="visible" className="text-red-500 text-sm mb-3 pl-2 space-y-1">
                            {errors.map((err, i) => (
                                <li key={i}>• {err}</li>
                            ))}
                        </motion.ul>
                    )}

                    {/* REGISTER BUTTON */}
                    <motion.button
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.55 }}
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold shadow-md cursor-pointer"
                    >
                        Register
                    </motion.button>
                </form>

                <div className="flex items-center my-6 opacity-60">
                    <span className="flex-grow border-b dark:border-gray-700"></span>
                    <span className="mx-3 text-gray-500 dark:text-gray-300 text-sm">OR</span>
                    <span className="flex-grow border-b dark:border-gray-700"></span>
                </div>

                {/* GOOGLE LOGIN */}
                <motion.button
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.15 }}
                    onClick={handleGoogle}
                    className="w-full py-3 flex items-center justify-center gap-3 bg-white rounded-lg shadow-md cursor-pointer"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" />
                    Continue with Google
                </motion.button>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="text-center text-base text-gray-600 dark:text-gray-300 mt-6"
                >
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Register;

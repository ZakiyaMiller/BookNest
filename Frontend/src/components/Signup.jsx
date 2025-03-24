import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { registerWithEmailPassword } from "../firebase/auth.service";
import signupBg from "../assets/signupBg.mp4";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Signup() {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const userCredential = await registerWithEmailPassword(data.email, data.password);
            toast.success("Signup Successful!");
            await createOrUpdateUserFn({
                ...userCredential.user,
                displayName: data.fullname // Add this line
            });
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        }
    };

    const createOrUpdateUserFn = async (user) => {
        try {
            const token = await user.getIdToken();
            const res = await axios.post("http://localhost:4001/user/create-or-update", {
                uid: user.uid,
                email: user.email,
                fullname: user.displayName || data.fullname // Modified this line
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('createOrUpdateUser response:', res.data);
            setAuthUser(res.data.user);
        } catch (error) {
            console.error('createOrUpdateUser error:', error);
        }
    };

    return (
        <div className="min-h-screen relative">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src={signupBg} type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>

            {/* Form Container */}
            <div className="relative z-20 min-h-screen flex items-center justify-center">
                <dialog open id="signup_modal" className="modal modal-open bg-transparent">
                    <form onSubmit={handleSubmit(onSubmit)} className="modal-box bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md mx-auto">
                        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </Link>
                        <h3 className="text-2xl font-bold text-center text-[#d75351] mb-2">Create Account</h3>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Please enter your details</p>

                        {/* Name */}
                        <div className="space-y-2 mb-4">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#d75351] outline-none transition-all"
                                {...register("fullname", { required: true })}
                            />
                            {errors.fullname && (
                                <span className="text-sm text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2 mb-4">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#d75351] outline-none transition-all"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2 mb-6">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#d75351] outline-none transition-all"
                                {...register("password", { required: true })}
                            />
                            {errors.password && (
                                <span className="text-sm text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Button */}
                        <button className="w-full bg-[#d75351] text-white py-2 rounded-lg hover:bg-[#d75351c7] transition duration-200 mb-4">
                            Sign Up
                        </button>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{" "}
                            <button
                                type="button"
                                className="text-[#d75351] hover:underline"
                                onClick={() => document.getElementById("my_modal_3").showModal()}
                            >
                                Login
                            </button>
                        </p>
                    </form>
                </dialog>
                <Login />
            </div>
        </div>
    );
}

export default Signup;
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginWithEmailPassword, signInWithGoogle } from "../firebase/auth.service";
import axios from "axios";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const userCredential = await loginWithEmailPassword(data.email, data.password);
            toast.success("Login Successful");
            document.getElementById("my_modal_3").close();
            await createOrUpdateUserFn(userCredential.user);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const userCredential = await signInWithGoogle();
            toast.success("Login Successful");
            document.getElementById("my_modal_3").close();
            await createOrUpdateUserFn(userCredential.user);
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
                fullname: user.displayName || user.email.split('@')[0]
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('createOrUpdateUser response:', res.data);
        } catch (error) {
            console.error('createOrUpdateUser error:', error);
        }
    };

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="space-y-6">
                        <Link
                            to="/"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => document.getElementById("my_modal_3").close()}
                        >
                            ✕
                        </Link>

                        <h3 className="text-2xl font-bold text-center text-[#d75351]">Welcome Back!</h3>
                        <p className="text-center text-gray-600 dark:text-gray-400">Please enter your details</p>

                        {/* Email */}
                        <div className="space-y-2">
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
                        <div className="space-y-2">
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

                        {/* Buttons */}
                        <div className="space-y-4">
                            <button className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200">
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full border border-gray-300 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 flex items-center justify-center gap-2"
                            >
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                                Sign in with Google
                            </button>
                        </div>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Not registered?{" "}
                            <Link to="/signup" className="text-gray-600 hover:text-gray-800 hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default Login;
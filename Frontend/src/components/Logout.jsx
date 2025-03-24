import React from "react";
import toast from "react-hot-toast";
import { logoutUser } from "../firebase/auth.service";

function Logout() {
    const handleLogout = async () => {
        try {
            await logoutUser();
            toast.success("Logout successful!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <button
                className="px-3 py-2 bg-gray-700 text-white rounded-md cursor-pointer hover:bg-gray-600 duration-200"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export default Logout;
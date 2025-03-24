import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import axios from 'axios';

function AuthProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,
            async (user) => {
                if (user) {
                    try {
                        const token = await user.getIdToken();
                        await axios.post("http://localhost:4001/user/create-or-update", {
                            uid: user.uid,
                            email: user.email,
                            fullname: user.displayName || user.email.split('@')[0]
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                    } catch (error) {
                        console.error("Error creating/updating user in MongoDB:", error);
                    }
                }
                setAuthUser(user);
                setLoading(false);
            },
            (error) => {
                console.error('Auth error:', error);
                setError(error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
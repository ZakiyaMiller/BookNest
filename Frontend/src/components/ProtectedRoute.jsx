import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }) {
    const [authUser] = useAuth();

    if (!authUser) {
        return <Navigate to="/signup" />;
    }

    return children;
}

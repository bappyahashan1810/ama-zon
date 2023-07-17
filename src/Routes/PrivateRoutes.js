import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/UserContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    let location = useLocation()
    if (loading) {
        return <div>
            <span className="loading loading-ball loading-xs"></span>
            <span className="loading loading-ball loading-md"></span>
            <span className="loading loading-ball loading-xs"></span>
            <span className="loading loading-ball loading-md"></span>
        </div>
    }
    if (user && user.email) {
        return children;

    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoutes;
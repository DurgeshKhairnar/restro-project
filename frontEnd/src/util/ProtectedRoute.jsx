import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../API/axios.js";

const ProtectedRoute = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {

        const checkAuth = async () => {

            try {

                console.log("Protected Route is called");

                const response = await api.get("/check");

                console.log(response.data.success);

                if (response.data.success) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }

            } catch (error) {

                console.log("Authentication failed");

                setIsAuthenticated(false);
            }
        };

        checkAuth();

    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
import { useEffect, useState, ReactNode, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): ReactElement => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const response = await axiosInstance.get('/auth/status');
            return response.data;
        };

        const refreshAuthToken = async () => {
            const refreshResponse = await axiosInstance.post('auth/refresh');
            return refreshResponse.status === 202;
        };

        const verifyAuth = async () => {
            try {
                const { isAuthorized, previouslyAuthorized } = await checkAuthStatus();

                if (isAuthorized) {
                    setIsAuthenticated(true);
                } else if (previouslyAuthorized) {
                    const tokenRefreshed = await refreshAuthToken();
                    if (tokenRefreshed) {
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, []);

    if (isLoading) {
        return <div></div>;
    }

    return isAuthenticated ? children as ReactElement : <Navigate to="/login" replace />;
};

export default PrivateRoute;
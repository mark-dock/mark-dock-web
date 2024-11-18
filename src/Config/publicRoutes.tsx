import { useEffect, useState, ReactNode, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps): ReactElement => {
    const [isPublicAuthenticated, setIsPublicAuthenticated] = useState<boolean | null>(null);
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
                    setIsPublicAuthenticated(false);
                } else if (previouslyAuthorized) {
                    const tokenRefreshed = await refreshAuthToken();
                    if (tokenRefreshed) {
                        setIsPublicAuthenticated(false);
                    } else {
                        setIsPublicAuthenticated(true);
                    }
                } else {
                    setIsPublicAuthenticated(true);
                }
            } catch (error) {
                setIsPublicAuthenticated(true);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, []);

    if (isLoading) {
        return <div></div>;
    }

    // Allow access to specific public routes like /invite
    const publicRoutes = ["/invite"];
    const currentPath = window.location.pathname;
    if (publicRoutes.includes(currentPath)) {
        return children as ReactElement;
    }

    // Redirect authenticated users to the dashboard
    return isPublicAuthenticated ? (children as ReactElement) : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;

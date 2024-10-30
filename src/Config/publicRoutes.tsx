import { useEffect, useState, ReactNode, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps): ReactElement => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                let response = await axiosInstance.get('/auth/status');

                if (response.data.isAuthorized === true) {
                    setIsAuthenticated(true);
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

    return isAuthenticated ? <Navigate to="/dashboard" replace /> : children as ReactElement;
};

export default PublicRoute;
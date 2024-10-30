import {useState} from "react";
import axiosInstance from "../../Config/axiosInstance";

export default function Logout() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            const response = await axiosInstance.post('/auth/logout');

            if (response.status != 202) {
                throw new Error('Logout failed');
            }

            window.location.href = "/";
        } catch (error) {
            console.error('Error during logout:', error);
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 disabled:opacity-50"
                disabled={isLoggingOut}
            >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    );
}
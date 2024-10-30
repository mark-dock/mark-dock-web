import {useEffect, useState} from "react";
import axiosInstance from "../Config/axiosInstance";

import Logout from "../Components/Buttons/Logout";

export default function Dashboard() {
    const [userInfo, setUserInfo] = useState<{ user_id: string; name: string; email: string } | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await axiosInstance.get(`/user/info`);
            const data = await response.data;
            setUserInfo(data);
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Documentation Platform
                </h2>

                {userInfo && (
                    <div className="mt-4 text-center">
                        <p>User ID: {userInfo.user_id}</p>
                        <p>Name: {userInfo.name}</p>
                        <p>Email: {userInfo.email}</p>
                    </div>
                )}

                < Logout />
            </div>
        </div>
    );
}
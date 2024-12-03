import React, { useEffect, useState } from "react";
import axiosInstance from "../Config/axiosInstance";
import Logout from "../Components/Buttons/Logout";
import UserInfo from "../Types/Settings/UserInfo";

const formatAccountType = (accountType: string): string => {
    return accountType
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/^./, (char) => char.toUpperCase());
};

export default function UserSettings(): JSX.Element {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const fetchUserInfo = async (): Promise<void> => {
            try {
                const response = await axiosInstance.get<UserInfo>("/user/info");
                setUserInfo(response.data);
            } catch (error) {
                console.error("Error fetching user information:", error);
            }
        };

        fetchUserInfo();
    }, []);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative min-h-screen bg-scheme-100 flex justify-center items-center">
            <div className="w-full max-w-4xl">
                <div className="bg-scheme-200 p-12 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src="/images/avatar.jpg"
                            alt={`${userInfo.name}'s Profile Picture`}
                            className="w-20 h-20 rounded-full"
                        />
                        <Logout/>
                    </div>

                    <div className="col-span-2">
                        <h2 className="text-2xl font-semibold text-scheme-500 mb-2">
                            {userInfo.name || "User Settings"}
                        </h2>
                        <p className="text-sm text-gray-200">User ID: {userInfo.user_id}</p>
                        <p className="text-sm text-gray-200">Email: {userInfo.email}</p>
                        <p className="text-sm text-gray-200">Joined
                            At: {new Date(userInfo.created_at).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-200">
                            Account Type: {formatAccountType(userInfo["Account Type"])}
                        </p>
                    </div>
                </div>

                <div className="bg-scheme-200 p-12 rounded-lg mt-8">
                    <div className="flex justify-center items-center mb-6">
                        <p className="text-sm text-center text-gray-500">
                            Settings coming soon! For now, you can log out using the button above.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

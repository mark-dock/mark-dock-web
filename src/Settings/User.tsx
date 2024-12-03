import React, { useEffect, useState } from "react";
import axiosInstance from "../Config/axiosInstance";
import Logout from "../Components/Buttons/Logout";
import UserInfo from "../Types/Settings/UserInfo";
import RectangleButton from "../Components/Buttons/RectangleButton";
import CreateOrgForm from "../Components/Forms/CreateOrgForm";

const formatAccountType = (accountType: string): string => {
    return accountType
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/^./, (char) => char.toUpperCase());
};

export default function UserSettings(): JSX.Element {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

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
                        <Logout />
                    </div>

                    <div className="col-span-2">
                        <h2 className="text-2xl font-semibold text-scheme-500 mb-2">
                            {userInfo.name || "User Settings"}
                        </h2>
                        <p className="text-sm text-gray-200">User ID: {userInfo.user_id}</p>
                        <p className="text-sm text-gray-200">Email: {userInfo.email}</p>
                        <p className="text-sm text-gray-200">
                            Joined At: {new Date(userInfo.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-200">
                            Account Type: {formatAccountType(userInfo["Account Type"])}
                        </p>
                    </div>
                </div>

                <div className="bg-scheme-200 p-12 rounded-lg mt-8">
                    <div className="flex justify-center items-center mb-6">
                        <RectangleButton
                            buttonText="Create New Organization"
                            buttonClass="mt-4 bg-yellow text-white hover:bg-hoverYellow"
                            onPress={() => setIsFormVisible(true)}
                        />
                    </div>
                </div>

                {isFormVisible && (
                <CreateOrgForm
                    onSuccess={(orgName) => {
                    console.log(`Successfully created: ${orgName}`);
                    setIsFormVisible(false); // Close the form on success
                    }}
                    onFailure={(error) => console.error(error)}
                    onCancel={() => setIsFormVisible(false)} // Close the form on cancel
                    formTextClass="text-white"
                    submitButtonClass="bg-yellow text-white hover:bg-hoverYellow"
                    cancelButtonClass="bg-scheme-250 text-white hover:bg-scheme-hover250" 
                />
                )}
            </div>
        </div>
    );
}

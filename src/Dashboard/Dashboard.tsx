import { useEffect, useState } from "react";
import axiosInstance from "../Config/axiosInstance";
import Logout from "../Components/Buttons/Logout";
import UserOrgs from "../Components/UserOrgs";
import CreateOrg from "../Components/CreateOrg";
import FileCard from "../Components/FileCard";
import FileStructure from "../Components/FileStructure";

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
        <div className="min-h-screen bg-scheme-100 mx-auto px-16 py-6">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-8">
                {/* Organization Info */}
                <div className="flex items-center">
                    <img src="/api/placeholder/40/40" alt="Organization Logo" className="w-10 h-10 rounded-full" />
                    <div className="ml-3">
                        <h1 className="text-xl font-bold text-scheme-500">Acme Corp</h1>
                        <p className="text-sm text-scheme-300">Admin Access</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        className="w-64 p-2 border rounded-md"
                        placeholder="Search files..."
                    />
                    <svg className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19l-6-6m0 0l-6-6m6 6l-6 6m6-6l6 6"></path>
                    </svg>
                </div>

                {/* User Info */}
                <div className="flex items-center justify-between space-x-8">
                    <div className="flex items-center">
                        <span className="text-right mr-3">
                            <p className="font-medium text-scheme-500">{userInfo?.name}</p>
                            <p className="text-sm text-scheme-300">{userInfo?.email}</p>
                        </span>
                        <img src="/api/placeholder/40/40" alt="User Avatar" className="w-10 h-10 rounded-full" />
                    </div>
                    <Logout />
                </div>
            </div>

            {/* Recent Files Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-scheme-500">Recent Files</h2>
                <hr className="border border-scheme-200 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <FileCard />
                    <FileCard />
                    <FileCard />
                    <FileCard />
                    <FileCard />
                </div>
            </section>

            <hr className="border border-scheme-200 mb-4" />
            {/* Folder Structure */}
            <section>
                <h2 className="text-xl font-semibold mb-4 text-scheme-500">All Files</h2>
                <FileStructure />
            </section>
        </div>
    );
}

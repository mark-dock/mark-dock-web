import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../Config/axiosInstance";
import Logout from "../Components/Buttons/Logout";
import UserOrgs from "../Components/UserOrgs";
import CreateOrg from "../Components/CreateOrg";
import FileCard from "../Components/FileCard";
import FileStructure from "../Components/FileStructure";

export default function Dashboard() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<{ user_id: string; name: string; email: string } | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await axiosInstance.get(`/user/info`);
            const data = await response.data;
            setUserInfo(data);
        };

        fetchUserInfo();
    }, []);

    const openUserSettings = () => {
        navigate('/usersettings');
    }

    return (
        <div className="relative min-h-screen bg-scheme-100">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-128 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6 bg-scheme-250 min-h-screen text-scheme-500">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-scheme-500">Organization</h2>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-scheme-400 hover:text-scheme-500"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-6">
                        <UserOrgs />
                        <CreateOrg />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto px-16 py-6">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-8">
                    {/* Organization Info */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="flex items-center hover:bg-scheme-200 rounded-lg p-2 transition-colors duration-200"
                    >
                        <img src="/api/placeholder/40/40" alt="Organization Logo" className="w-10 h-10 rounded-full" />
                        <div className="ml-3 flex flex-col items-start">
                            <h1 className="text-xl font-bold text-scheme-500">Organization Name</h1>
                            <p className="text-sm text-scheme-300">Access Level</p>
                        </div>
                    </button>

                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            className="w-64 p-2 border focus:bg-white bg-scheme-500 rounded-md focus:outline-none focus:ring-2 focus:ring-transparent transition-colors duration-200"
                            placeholder="Search files..."
                        />
                        <svg className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {/* Search Icon, Magnifying Glass */}
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.2-5.2"></path>
                            <circle cx="10.5" cy="10.5" r="7.5"></circle>
                        </svg>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center justify-between space-x-8">
                        <button
                            onClick={openUserSettings}
                            className="flex items-center hover:bg-scheme-200 rounded-lg p-2 transition-colors duration-200">
                            <span className="text-right mr-3">
                                <p className="font-medium text-scheme-500">{userInfo?.name}</p>
                                <p className="text-sm text-scheme-300">{userInfo?.email}</p>
                            </span>
                            <img src="/api/placeholder/40/40" alt="User Avatar" className="w-10 h-10 rounded-full" />
                        </button>
                        <Logout />
                    </div>
                </div>

                <hr className="border border-scheme-200 mb-4" />

                {/* Recent Files Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-scheme-500">Recent Files</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                        <FileCard />
                        <FileCard />
                        <FileCard />
                        <FileCard />
                        <FileCard />
                        {/* Arrow Button */}
                        <button className="flex justify-center items-center bg-scheme-200 p-4 rounded-lg shadow hover:bg-scheme-300 transition-colors duration-200">
                            <svg className="flex justify-center w-10 h-10 text-scheme-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                </section>

                <hr className="border border-scheme-200 mb-4" />

                {/* Folder Structure */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-scheme-500">All Files</h2>
                    <FileStructure />
                </section>
            </div>

            {/* Overlay */}
            {
                isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-transparent bg-opacity-0 transition-opacity"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )
            }
        </div >
    );
}

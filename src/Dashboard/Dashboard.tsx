import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../Config/axiosInstance";
import FileStructure from "../Components/FileStructure";
import OrganizationWorkspace from "../Components/Sidebar/OrganizationWorkspace";
import PersonalSelection from "../Components/Sidebar/PersonalWorkspace";
import RecentFiles from "../Components/Dashboard/RecentFiles";

export default function Dashboard() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<{ user_id: string; name: string; email: string } | null>(null);
    const [workspaceInfo, setWorkspaceInfo] = useState<{ name: string; access: string } | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await axiosInstance.get(`/user/info`);
            const data = await response.data;
            setUserInfo(data);
        };

        const fetchWorkspaceInfo = async () => {
            const organizationId: string | null = localStorage.getItem(`selectedOrgId`)

            if (organizationId !== null && organizationId !== "") {
                const response = await axiosInstance.get(`/organization/${organizationId}/info`);
                const data = await response.data;

                setWorkspaceInfo({
                    name: data.name,
                    access: data.access_name,
                });
            } else {
                setWorkspaceInfo({
                    name: "Personal Workspace",
                    access: "",
                });
            }
        }

        fetchUserInfo();
        fetchWorkspaceInfo();
    }, []);

    const openUserSettings = () => {
        navigate('/usersettings');
    }

    const createFile = () => {
        navigate('/editor');
    }

    return (
        <div className="relative min-h-screen bg-scheme-100">
            <div
                className={`w-96 fixed z-20 top-0 left-0 h-full bg-scheme-250 shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6 min-h-screen text-scheme-500">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-scheme-500">Workspace Menu</h2>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-scheme-400 hover:text-scheme-500"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-scheme-500 mb-2">Personal</h3>
                            <PersonalSelection />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-scheme-500 mb-2">Organizations</h3>
                            <OrganizationWorkspace/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto">
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-10"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
                {/* Top Bar */}
                <div className="flex px-16 py-6 justify-between items-center mb-8 bg-scheme-200">
                    {/* Organization Info */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="flex items-center hover:bg-scheme-250 rounded-lg p-2 transition-colors duration-200"
                    >
                        <img src="/images/org.jpg" alt="Organization Logo" className="w-10 h-10 rounded-full" />
                        <div className="ml-3 flex flex-col items-start">
                            <h1 className="text-xl font-bold text-scheme-500">{workspaceInfo?.name}</h1>
                            {workspaceInfo?.access && (
                                <p className="text-sm text-scheme-400">Access Level: {workspaceInfo.access}</p>
                            )}
                        </div>
                    </button>

                    {/* Search Bar and MarkDock text next to each other */}
                    {/*<h1 className="text-4xl font-bold text-scheme-500">MarkDock</h1>*/}
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
                            className="flex items-center hover:bg-scheme-250 rounded-lg p-2 transition-colors duration-200">
                            <span className="text-right mr-3">
                                <p className="font-medium text-scheme-500">{userInfo?.name}</p>
                                <p className="text-sm text-scheme-400">{userInfo?.email}</p>
                            </span>
                            <img src="/images/avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full" />
                        </button>
                    </div>
                </div>

                <RecentFiles />


                {/* Folder Structure */}
                <section className="flex">
                    <div className="w-2/3">
                        <h2 className="text-xl font-semibold px-16 mb-4 text-scheme-500">All Files</h2>
                        <FileStructure />
                    </div>
                    <div className="w-1/3 mr-16">
                        <h2 className="text-xl font-semibold mb-4 text-scheme-500">Create</h2>
                        <button
                            onClick={() => createFile()}
                            className="flex items-center justify-start w-full bg-scheme-200 p-4 rounded-lg shadow hover:bg-scheme-250 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 text-scheme-400 mr-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            <h2 className="text-scheme-500 font-medium">New Document</h2>
                        </button>
                        <button className="flex items-center justify-start w-full bg-scheme-200 p-4 rounded-lg shadow hover:bg-scheme-250 transition-colors duration-200 mt-4">
                            <svg className="w-5 h-5 text-scheme-400 mr-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                            </svg>
                            <h2 className="text-scheme-500 font-medium">New Folder</h2>
                        </button>
                        <button className="flex items-center justify-start w-full bg-scheme-200 p-4 rounded-lg shadow hover:bg-scheme-250 transition-colors duration-200 mt-4">
                            <svg className="w-5 h-5 text-scheme-400 mr-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {/* Upload Icon, Arrow Up with a box around it */}
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2z"></path>
                            </svg>
                            <h2 className="text-scheme-500 font-medium">Upload File</h2>
                        </button>
                    </div>
                </section>
            </div>
        </div >
    );
}

import axiosInstance from '../../Config/axiosInstance';
import { useState, useEffect } from 'react';
import OrganizationWorkspace from "../Sidebar/OrganizationWorkspace";
import PersonalSelection from "../Sidebar/PersonalWorkspace";

export default function HeaderOrgButton() {
  const [workspaceInfo, setWorkspaceInfo] = useState<{ name: string; access: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
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

    fetchWorkspaceInfo();
  }, []);



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
              <OrganizationWorkspace />
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Organization Info */}
        <button
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
      </div>
    </div>
  );
}

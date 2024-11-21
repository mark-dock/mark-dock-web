import { useState, useEffect } from "react";
import axiosInstance from "../Config/axiosInstance";
import CreateOrgInviteButton from "./Buttons/CreateOrgInviteButton";
import OrgMembers from "./OrgMembers";
import OrgInviteLinks from "./OrgInviteLinks";

// Types
interface Member {
    userId: string;
    access: string;
    userName: string;
}

interface Organization {
    id: number;
    name: string;
    access: string;
    accessId: number;
    createdAt: string;
    updatedAt: string;
    members: Member[];
}

export default function ManageOrgs() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null); // For selected organization
    const [showSettings, setShowSettings] = useState<boolean>(false); // To toggle settings page visibility

    // Fetch organizations
    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await axiosInstance.get("/organization/get");
                if (response.status === 200) {
                    setOrganizations(response.data.organizations);
                } else {
                    throw new Error("Failed to fetch organizations");
                }
            } catch (error) {
                console.error("Error fetching organizations:", error);
                setError("Error fetching organizations");
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrganizations();
    }, []);

    const handleSettingsClick = (org: Organization) => {
        setSelectedOrg(org); // Set the selected organization
        setShowSettings(true); // Show the settings page
    };

    const handleBackToOrganizations = () => {
        setShowSettings(false); // Hide settings page and go back to the list of organizations
    };

    const handleLeaveOrganization = (orgId: number) => {
        // Handle the logic for leaving an organization (e.g., API call)
        console.log(`Leaving organization with ID: ${orgId}`);
    };

    return (
        <div className="relative min-h-screen bg-scheme-100">
            <div className="mx-auto px-16 py-6">
                {isLoading ? (
                    <div className="text-scheme-500">Loading...</div>
                ) : error ? (
                    <div className="text-red-600">{error}</div>
                ) : showSettings && selectedOrg ? (
                    <div className="space-y-4 w-full max-w-2xl">
                        <button
                            onClick={handleBackToOrganizations}
                            className="text-blue-600 hover:text-blue-500"
                        >
                            Back to Organizations
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-scheme-500">{selectedOrg.name} Settings</h2>
                        {/* Show the settings page with the selected organization */}
                        {selectedOrg.accessId === 1 && (
                            <div className="space-y-4">
                                <OrgMembers members={selectedOrg.members} />
                                <OrgInviteLinks orgId={selectedOrg.id.toString()} />
                                <CreateOrgInviteButton organizationId={selectedOrg.id} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4 w-full max-w-2xl">
                        <h2 className="text-2xl font-semibold mb-4 text-scheme-500">Your Organizations</h2>
                        <ul>
                            {organizations.map((org) => (
                                <li key={org.id} className="border p-4 rounded-md shadow-md mb-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-scheme-500">{org.name}</h3>
                                            <p className="text-sm text-scheme-300">Access Level: {org.access}</p>
                                        </div>
                                        <div className="flex space-x-4">
                                            {/* Leave Organization Button */}
                                            <button
                                                onClick={() => handleLeaveOrganization(org.id)}
                                                className="text-red-600 hover:text-red-500 transition-all duration-200"
                                            >
                                                Leave Organization
                                            </button>
                                            {/* Settings Button (only for Admin users) */}
                                            {org.accessId === 1 && (
                                                <button
                                                    onClick={() => handleSettingsClick(org)}
                                                    className="text-blue-600 hover:text-blue-500 transition-all duration-200"
                                                >
                                                    Settings
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}







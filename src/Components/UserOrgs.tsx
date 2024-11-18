import { useState, useEffect } from "react";
import axiosInstance from "../Config/axiosInstance";

interface Member {
    userId: string;
    access: string;
}

interface Organization {
    id: number;
    name: string;
    access: string;
    createdAt: string;
    updatedAt: string;
    members?: Member[];
}

export default function UserOrgs() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [inviteLinks, setInviteLinks] = useState<{ [orgId: number]: string }>({}); // Store invite links per organization
    const [isCreating, setIsCreating] = useState<{ [orgId: number]: boolean }>({}); // Track loading state for each org

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

    const createInviteLink = async (organizationId: number, accessId: number) => {
        setIsCreating((prev) => ({ ...prev, [organizationId]: true }));

        try {
            const response = await axiosInstance.post(
                `/organization/${organizationId}/create-invite-link`,
                null,
                { params: { accessId } }
            );

            if (response.status === 201) {
                setInviteLinks((prev) => ({
                    ...prev,
                    [organizationId]: response.data.inviteLink,
                }));
            } else {
                throw new Error("Failed to create invite link");
            }
        } catch (error) {
            console.error(`Error creating invite link for org ${organizationId}:`, error);
            setError("Error creating invite link");
        } finally {
            setIsCreating((prev) => ({ ...prev, [organizationId]: false }));
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-4">Your Organizations</h2>
                    <ul>
                        {organizations.map((org) => (
                            <li key={org.id} className="border p-4 rounded-md shadow-md">
                                <h3 className="font-bold">{org.name}</h3>
                                <p>Created at: {new Date(org.createdAt).toLocaleString()}</p>
                                <p>Updated at: {new Date(org.updatedAt).toLocaleString()}</p>
                                <p>Access: {org.access}</p>

                                {/* Show invite link if created */}
                                {inviteLinks[org.id] && (
                                    <p className="text-green-600 mt-2">
                                        Invite Link: <a href={inviteLinks[org.id]} target="_blank" rel="noopener noreferrer">{inviteLinks[org.id]}</a>
                                    </p>
                                )}

                                {/* Button to create invite link */}
                                <button
                                    onClick={() => createInviteLink(org.id, 1)} // Replace `1` with dynamic access ID as needed
                                    disabled={isCreating[org.id]}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 disabled:opacity-50"
                                >
                                    {isCreating[org.id] ? "Creating..." : "Create Invite Link"}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}



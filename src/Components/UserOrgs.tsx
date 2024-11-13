import { useState, useEffect } from "react";
import axiosInstance from "../Config/axiosInstance";

// Define an interface for the Organization object
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
    members?: Member[]; // Optional field for members, only for admins
}

export default function UserOrgs() {
    const [organizations, setOrganizations] = useState<Organization[]>([]); // Explicitly type the state
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch organizations when the component is mounted
        const fetchOrganizations = async () => {
            try {
                const response = await axiosInstance.get('/organization/get');

                if (response.status === 200) {
                    setOrganizations(response.data.organizations);
                } else {
                    throw new Error('Failed to fetch organizations');
                }
            } catch (error) {
                console.error('Error fetching organizations:', error);
                setError('Error fetching organizations');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrganizations();
    }, []);

    // Render the component
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
                                {org.members && org.members.length > 0 && (
                                    <div className="mt-2">
                                        <h4 className="font-semibold">Members:</h4>
                                        <ul>
                                            {org.members.map((member) => (
                                                <li key={member.userId} className="ml-4">
                                                    <p>User ID: {member.userId}</p>
                                                    <p>Access: {member.access}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}


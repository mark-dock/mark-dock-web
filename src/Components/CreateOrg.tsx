import { useState } from "react";
import axiosInstance from "../Config/axiosInstance";

// Define the response type for the created organization
interface Organization {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export default function CreateOrg() {
    const [name, setName] = useState<string>(''); // State for the organization name
    const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading state
    const [organization, setOrganization] = useState<Organization | null>(null); // State to hold the created organization
    const [error, setError] = useState<string | null>(null); // State for error messages

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Organization name is required.");
            return;
        }

        setIsLoading(true);
        setError(null); // Reset error on each submit

        try {
            const response = await axiosInstance.post('/organization/create', { name });

            if (response.status === 201) {
                setOrganization(response.data.organization); // Store the created organization
            } else {
                setError('Failed to create organization.');
            }
        } catch (error: any) {
            setError('Error creating organization: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-md p-4 border rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Create New Organization</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Organization Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter organization name"
                        />
                    </div>

                    {error && <p className="text-red-600 mb-4">{error}</p>}

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Create Organization'}
                        </button>
                    </div>
                </form>

                {organization && (
                    <div className="mt-6 p-4 border rounded-md bg-green-50">
                        <h3 className="text-xl font-semibold">Organization Created!</h3>
                        <p><strong>ID:</strong> {organization.id}</p>
                        <p><strong>Name:</strong> {organization.name}</p>
                        <p><strong>Created At:</strong> {new Date(organization.createdAt).toLocaleString()}</p>
                        <p><strong>Updated At:</strong> {new Date(organization.updatedAt).toLocaleString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

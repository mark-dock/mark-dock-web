import { useState, useEffect } from "react";
import axiosInstance from "../../Config/axiosInstance";
import SelectionItem from "./WorkspaceSelection";
import {Organization} from "../../Types/Organization/organization";

export default function OrganizationWorkspace() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div>
            {isLoading ? (
                <div className="text-scheme-500">Loading...</div>
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <div>
                    {organizations.length === 0 ? (
                        <p className="text-scheme-300">You are not a part of any organizations.</p>
                    ) : (
                        organizations.map((org) => (
                            <SelectionItem
                                key={org.id}
                                type="organization"
                                data={{
                                    id: org.id,
                                    name: org.name,
                                    access: org.access,
                                    accessId: org.accessId,
                                }}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

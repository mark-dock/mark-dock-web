import { useState, useEffect } from "react";
import axiosInstance from "../../Config/axiosInstance";
import OrganizationSelection from "./OrganizationSelection";
import {Organization} from "../../Types/Organization/organization";
import {useNavigate} from "react-router-dom";

interface Member {
    userId: string;
    access: string;
    userName: string;
}

export default function ManageOrgs() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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

    function handleSettingsClick(org: Organization) {
        navigate(`/organization/${org.id}/settings`);
    }

    return (
        <div>
            {isLoading ? (
                <div className="text-scheme-500">Loading...</div>
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <ul>
                    {organizations.length === 0 ? (
                        <li className="text-scheme-300">You are not a part of any organizations.</li>
                    ) : (
                        organizations.map((org) =>
                            <OrganizationSelection org={org} handleSettingsClick={handleSettingsClick} />
                        ))}
                </ul>
            )}
        </div>
        );
    }

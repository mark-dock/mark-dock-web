import { Settings, CheckCircle } from 'lucide-react';
import { Organization } from "../../Types/Organization/organization";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function OrganizationSelection({org, handleSettingsClick}: {
    org: Organization;
    handleSettingsClick: (org: Organization) => void;
}) {
    const navigate = useNavigate();
    const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

    useEffect(() => {
        const storedOrgId = localStorage.getItem("selectedOrgId");
        if (storedOrgId) {
            setSelectedOrgId(storedOrgId);
        }
    }, []);

    const handleSelectOrganization = (orgId: string) => {
        setSelectedOrgId(orgId);
        localStorage.setItem("selectedOrgId", orgId);
        window.location.reload();
    };

    return (
        <li
            key={org.id}
            onClick={() => handleSelectOrganization(org.id)}
            className={`p-4 rounded-md shadow-md mb-4 bg-scheme-300 cursor-pointer ${
                selectedOrgId === org.id ? "bg-opacity-100" : "bg-opacity-50"
            }`}
        >
            <div className="flex justify-between items-center">
                <div className="pr-3">
                    <img src="/images/org.jpg" alt="Organization Logo" className="w-10 h-10 rounded-full"/>
                </div>

                <div className="flex-1">
                    <h3 className="font-bold text-scheme-500">{org.name}</h3>
                    <p className="text-sm text-scheme-400">
                        Access Level:{" "}
                        {org.access.charAt(0).toUpperCase() + org.access.slice(1)}
                    </p>
                </div>

                <div className="flex space-x-4">
                    {selectedOrgId === org.id && (
                        <CheckCircle className="text-green-500 h-6 w-6" aria-label="Selected Organization"/>
                    )}

                    {org.accessId === 1 && (
                        <button
                            onClick={() => handleSettingsClick(org)}
                            className="text-blue-600 hover:text-blue-500 transition-all duration-200"
                            aria-label="Settings"
                        >
                            <Settings color="white" className="h-6 w-6"/>
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
}

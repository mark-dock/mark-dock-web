import { Settings, CheckCircle } from 'lucide-react';
import { Organization } from "../../Types/Organization/organization";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectionItem({ type, data }: {
    type: "organization" | "personal";
    data: Organization | null;
}) {
    const navigate = useNavigate();
    const [isSelected, setIsSelected] = useState<boolean>(false);

    useEffect(() => {
        const storedOrgId = localStorage.getItem("selectedOrgId");
        setIsSelected(
            type === "organization" && data
                ? storedOrgId === data.id
                : !storedOrgId || storedOrgId === ""
        );
    }, [type, data]);

    const handleSelect = () => {
        localStorage.setItem("selectedOrgId", type === "organization" && data ? data.id : "");
        window.location.reload();
    };

    const handleSettingsClick = () => {
        navigate(type === "organization" ? `/organization/${data?.id}/settings` : `/usersettings`);
    };

    const getTitle = () => (type === "organization" ? data?.name || "Unnamed Organization" : "Personal Workspace");

    const getAccessLevel = () => {
        if (type === "organization" && data) {
            return (
                <p className="text-sm text-scheme-400">
                    Access Level: {data.access?.charAt(0).toUpperCase() + data.access?.slice(1) || "Unknown"}
                </p>
            );
        }
        return null;
    };

    const renderSettingsButton = () => (
        <button
            onClick={handleSettingsClick}
            className="text-blue-600 hover:text-blue-500 transition-all duration-200"
            aria-label="Settings"
        >
            <Settings color="white" className="h-6 w-6" />
        </button>
    );

    return (
        <div
            onClick={handleSelect}
            className={`p-4 rounded-md shadow-md mb-4 bg-scheme-300 cursor-pointer ${
                isSelected ? "bg-opacity-100 border-green-500" : "bg-opacity-50 border-gray-300"
            }`}
        >
            <div className="flex justify-between items-center">
                <div className="pr-3">
                    <img
                        src={type === "organization" ? "/images/org.jpg" : "/images/avatar.jpg"}
                        alt={type === "organization" ? "Organization Logo" : "Personal Avatar"}
                        className="w-10 h-10 rounded-full"
                    />
                </div>

                <div className="flex-1">
                    <h3 className="font-bold text-scheme-500">{getTitle()}</h3>
                    {getAccessLevel()}
                </div>

                <div className="flex space-x-4">
                    {isSelected && (
                        <CheckCircle
                            className="text-green-500 h-6 w-6"
                            aria-label="Selected Workspace"
                        />
                    )}
                    {type === "organization" && data?.accessId === 1 ? renderSettingsButton() : type === "personal" && renderSettingsButton()}
                </div>
            </div>
        </div>
    );
}

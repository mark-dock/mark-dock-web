import { Settings, CheckCircle } from 'lucide-react';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function PersonalSelection() {
    const navigate = useNavigate();
    const [selectedPersonal, setSelectedPersonal] = useState<boolean>(true);

    useEffect(() => {
        const storedOrgId: string | null = localStorage.getItem("selectedOrgId");
        setSelectedPersonal(storedOrgId == null || storedOrgId === "");
    }, []);

    const handleSelectPersonal = () => {
        localStorage.setItem("selectedOrgId", "");
        window.location.reload();
    };

    function handleSettingsClick() {
       navigate(`/usersettings`);
    }

    return (
        <li
            onClick={() => handleSelectPersonal()}
            className={`p-4 rounded-md shadow-md mb-4 bg-scheme-300 cursor-pointer ${
                selectedPersonal ? "bg-opacity-100" : "bg-opacity-50"
            }`}
        >
            <div className="flex justify-between items-center">
                <div className="pr-3">
                    <img src="/images/avatar.jpg" alt="Organization Logo" className="w-10 h-10 rounded-full"/>
                </div>

                <div className="flex-1">
                    <h3 className="font-bold text-scheme-500">Personal Workspace</h3>
                </div>

                <div className="flex space-x-4">
                    {selectedPersonal && (
                        <CheckCircle className="text-green-500 h-6 w-6" aria-label="Selected Organization"/>
                    )}

                    <button
                        onClick={() => handleSettingsClick()}
                        className="text-blue-600 hover:text-blue-500 transition-all duration-200"
                        aria-label="Settings"
                    >
                        <Settings color="white" className="h-6 w-6"/>
                    </button>
                </div>
            </div>
        </li>
    );
}

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "./Config/axiosInstance";
import ConfirmChoiceButton from "./Components/Buttons/ConfirmChoiceButton";

export default function InvitePage() {
    const [searchParams] = useSearchParams();
    const [inviteToken, setInviteToken] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            setInviteToken(token);
        } else {
            setError("Invalid or missing invite token.");
        }
    }, [searchParams]);

    const handleAcceptInvite = async () => {
        if (!inviteToken) {
            setError("No invite token found.");
            return;
        }

        setIsProcessing(true);
        setError(null);
        setMessage(null);

        try {
            const response = await axiosInstance.post(`/organization/accept-invite`, { token: inviteToken });

            if (response.status === 200) {
                setMessage("You have successfully joined the organization!");
            } else {
                throw new Error("Failed to accept invite.");
            }
        } catch (err: any) {
            console.error("Error accepting invite:", err);
            setError(err.response?.data?.error || "Error accepting invite.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDenyInvite = () => {
        setMessage("You have declined the invitation.");
    };

    const handleChoice = (choice: "Yes" | "No") => {
        if (choice === "Yes") {
            handleAcceptInvite();
        } else {
            handleDenyInvite();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-scheme-400 bg-opacity-80">
            <div className="bg-scheme-250 p-6 rounded-lg shadow-lg max-w-sm w-full">
                {error ? (
                    <div className="text-red-600 text-center mb-4">{error}</div>
                ) : message ? (
                    <div className="text-white font-semibold text-center mb-4">{message}</div>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-4 text-center text-white">Invitation to Join</h2>
                        <p className="mb-4 text-center text-white">You have been invited to join an organization. Would you like to accept or decline?</p>
                        <div className="flex justify-center space-x-4">
                            <ConfirmChoiceButton
                                message="Do you want to accept or decline the invitation?"
                                onChoice={handleChoice}
                                confirmationTextClass="text-white"
                                confirmationYesButtonClass="bg-yellow text-white rounded hover:bg-hoverYellow"
                                confirmationNoButtonClass="bg-text-scheme-250 text-white rounded hover:bg-hover250"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}



                

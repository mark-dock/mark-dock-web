import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "./Config/axiosInstance";

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

    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-md p-6 bg-white shadow rounded-md">
                {error ? (
                    <div className="text-red-600">{error}</div>
                ) : message ? (
                    <div className="text-green-600">{message}</div>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-4">Invitation to Join</h2>
                        <p className="mb-4">You have been invited to join an organization. Would you like to accept or decline?</p>
                        <div className="space-y-4">
                            <button
                                onClick={handleAcceptInvite}
                                disabled={isProcessing}
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                            >
                                {isProcessing ? "Processing..." : "Accept Invitation"}
                            </button>
                            <button
                                onClick={handleDenyInvite}
                                disabled={isProcessing}
                                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                            >
                                Decline Invitation
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

                

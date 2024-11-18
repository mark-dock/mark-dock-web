import { FC, useState } from "react";
import axiosInstance from "../../Config/axiosInstance";

interface CreateOrgInviteButtonProps {
    organizationId: number;
}

const CreateOrgInviteButton: FC<CreateOrgInviteButtonProps> = ({ organizationId }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [inviteLink, setInviteLink] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const createInviteLink = async (organizationId: number) => {
        setIsCreating(true);
        setError(null);

        try {
            const response = await axiosInstance.post(
                `/organization/${organizationId}/create-invite-link?accessId=3`
            );

            if (response.status === 201) {
                setInviteLink(response.data.inviteLink);
            } else {
                throw new Error("Failed to create invite link");
            }
        } catch (error) {
            console.error(`Error creating invite link for org ${organizationId}:`, error);
            setError("Error creating invite link");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div>
            <button
                onClick={() => createInviteLink(organizationId)}
                disabled={isCreating}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 disabled:opacity-50"
            >
                {isCreating ? "Creating..." : "Create Invite Link"}
            </button>

            {inviteLink && (
                <p className="text-green-600 mt-2">
                    Invite Link: <a href={inviteLink} target="_blank" rel="noopener noreferrer">{inviteLink}</a>
                </p>
            )}

            {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
    );
};

export default CreateOrgInviteButton;



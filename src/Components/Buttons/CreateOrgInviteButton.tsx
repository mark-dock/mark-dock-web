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
    <div className="space-y-4">
      <button
        onClick={() => createInviteLink(organizationId)}
        disabled={isCreating}
        className="text-blue-600 hover:text-blue-500 border border-blue-600 px-6 py-3 rounded-md shadow-md hover:bg-blue-50 disabled:opacity-50 transition-all duration-200"
      >
        {isCreating ? "Creating..." : "Create Invite Link"}
      </button>

      {inviteLink && (
        <p className="text-green-600 mt-2 text-sm">
          Invite Link:{" "}
          <a
            href={inviteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500"
          >
            {inviteLink}
          </a>
        </p>
      )}

      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default CreateOrgInviteButton;





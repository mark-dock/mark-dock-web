import React, { useState, useEffect } from "react";
import axiosInstance from "../Config/axiosInstance";

interface InviteLink {
  inviteToken: string;
  accessId: number;
  inviteLink: string;
  currentCount: number;
  maxCount: number;
  expiresAt: string | null;
}

interface OrgInviteLinksProps {
  orgId: string;
}

const OrgInviteLinks: React.FC<OrgInviteLinksProps> = ({ orgId }) => {
  const [inviteLinks, setInviteLinks] = useState<InviteLink[]>([]); // Ensure this is always an array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch invite links for the organization
  useEffect(() => {
    const fetchInviteLinks = async () => {
      try {
        const response = await axiosInstance.get(`/organization/${orgId}/get-invite-links`);
        if (response.status === 200) {
          // Check if the response data contains inviteLinks, default to an empty array if not
          setInviteLinks(response.data.inviteLinks || []);
        } else {
          throw new Error("Failed to fetch invite links");
        }
      } catch (error) {
        console.error("Error fetching invite links:", error);
        setError("Error fetching invite links");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInviteLinks();
  }, [orgId]);

  const handleDelete = (inviteToken: string) => {
    // Your delete functionality here
    console.log(`Deleting invite with token: ${inviteToken}`);
  };

  return (
    <div className="mt-4">
      {isLoading ? (
        <div className="text-scheme-500">Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : inviteLinks.length === 0 ? (
        <div className="text-scheme-400">No invite links available</div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold text-scheme-500">Invite Links:</h3>
          <div className="space-y-4"> {/* Added space-y-4 for vertical spacing */}
            {inviteLinks.map((invite) => (
              <div key={invite.inviteToken} className="border rounded-md shadow-sm p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-scheme-500">
                    <strong className="font-semibold">Access ID:</strong> {invite.accessId}
                  </p>
                  <p className="text-sm text-scheme-500">
                    <strong className="font-semibold">Invite Link:</strong>{" "}
                    <a
                      href={invite.inviteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      {invite.inviteLink}
                    </a>
                  </p>
                  <p className="text-sm text-scheme-500">
                    <strong className="font-semibold">Current Count:</strong> {invite.currentCount} / {invite.maxCount}
                  </p>
                  {invite.expiresAt && (
                    <p className="text-sm text-scheme-500">
                      <strong className="font-semibold">Expires At:</strong> {new Date(invite.expiresAt).toLocaleString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(invite.inviteToken)}
                  className="ml-4 text-red-600 hover:text-red-500 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgInviteLinks;



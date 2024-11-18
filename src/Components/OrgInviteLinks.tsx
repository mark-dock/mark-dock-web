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

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : inviteLinks.length === 0 ? (
        <div>No invite links available</div>
      ) : (
        <div>
          <h3 className="font-bold">Invite Links:</h3>
          <ul className="list-disc pl-6">
            {inviteLinks.map((invite) => (
              <li key={invite.inviteToken} className="my-2">
                <p>
                  <strong>Access ID:</strong> {invite.accessId}
                </p>
                <p>
                  <strong>Invite Link:</strong>{" "}
                  <a href={invite.inviteLink} target="_blank" rel="noopener noreferrer">
                    {invite.inviteLink}
                  </a>
                </p>
                <p>
                  <strong>Current Count:</strong> {invite.currentCount} / {invite.maxCount}
                </p>
                {invite.expiresAt && (
                  <p>
                    <strong>Expires At:</strong> {new Date(invite.expiresAt).toLocaleString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrgInviteLinks;


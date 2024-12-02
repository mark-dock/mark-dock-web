import React, { useState, useEffect } from "react";
import RectangleButton from "./Buttons/RectangleButton";
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
  inviteLinks: InviteLink[];
  orgId: string;
}

const OrgInviteLinks: React.FC<OrgInviteLinksProps> = ({ inviteLinks, orgId }) => {
  const [links, setLinks] = useState<InviteLink[]>([]);

  useEffect(() => {
    setLinks(inviteLinks);
  }, [inviteLinks]); 

  // Handle deleting an invite link
  const handleDelete = (inviteToken: string) => {
    axiosInstance
      .delete(`settings/organization/${orgId}/delete-invite-link?token=${inviteToken}`)
      .then((response) => {
        console.log(response.data);
        // Remove the deleted invite link from the state
        setLinks((prevLinks) => prevLinks.filter(link => link.inviteToken !== inviteToken));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle creating a new invite link
  const handleCreateInviteLink = async () => {
    try {
      const response = await axiosInstance.post(`organization/${orgId}/create-invite-link?accessId=3`);
      console.log(response.data);
      const newInviteLink: InviteLink = response.data;

      // Add the new invite link to the state
      setLinks((prevLinks) => [...prevLinks, newInviteLink]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 bg-scheme-200 rounded-lg p-12">
      {links.length === 0 ? (
        <div className="text-scheme-500">No invite links available
           <RectangleButton
            buttonText="Create Invite Link"
            buttonColor="red"
            buttonTextColor="white"
            onPress={() => handleCreateInviteLink()}
          />
        </div>
      ) : (
        <div>
          <RectangleButton
            buttonText="Create Invite Link"
            buttonColor="red"
            buttonTextColor="white"
            onPress={() => handleCreateInviteLink()}
          />
          <div className="text-xl font-semibold text-scheme-500 mb-4">Invite Links:</div>
          <div className="space-y-4">
            {links.map((invite) => (
              <div
                key={invite.inviteToken}
                className="flex justify-between items-center bg-scheme-300 rounded-lg p-4"
              >
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
                    <strong className="font-semibold">Current Count:</strong>{" "}
                    {invite.currentCount} / {invite.maxCount}
                  </p>
                  {invite.expiresAt && (
                    <p className="text-sm text-scheme-500">
                      <strong className="font-semibold">Expires At:</strong>{" "}
                      {new Date(invite.expiresAt).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="ml-4">
                  <RectangleButton
                    buttonText="Delete"
                    buttonTextColor="white"
                    buttonColor="red"
                    onPress={() => handleDelete(invite.inviteToken)}
                    confirmation={{
                      confirmationText: "Are you sure you want to delete this invite link",
                      confirmationTextColor: "white",
                      confirmationYesButtonColor: "red",
                      confirmationYesTextColor: "white",
                      confirmationNoButtonColor: "blue",
                      confirmationNoTextColor: "white",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgInviteLinks;








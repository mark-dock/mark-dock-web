import React from "react";

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
}

const OrgInviteLinks: React.FC<OrgInviteLinksProps> = ({ inviteLinks }) => {
  const handleDelete = (inviteToken: string) => {
    // Your delete functionality here
    console.log(`Deleting invite with token: ${inviteToken}`);
  };

  return (
    <div className="mt-4">
      {inviteLinks.length === 0 ? (
        <div className="text-scheme-400">No invite links available</div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold text-scheme-100">Invite Links:</h3>
          <div className="space-y-4"> {/* Added space-y-4 for vertical spacing */}
            {inviteLinks.map((invite) => (
              <div key={invite.inviteToken} className="border rounded-md shadow-sm p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-scheme-100">
                    <strong className="font-semibold">Access ID:</strong> {invite.accessId}
                  </p>
                  <p className="text-sm text-scheme-100">
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
                  <p className="text-sm text-scheme-100">
                    <strong className="font-semibold">Current Count:</strong> {invite.currentCount} / {invite.maxCount}
                  </p>
                  {invite.expiresAt && (
                    <p className="text-sm text-scheme-100">
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




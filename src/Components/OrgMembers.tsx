import React, { useState, useEffect } from 'react';
import RectangleButton from './Buttons/RectangleButton';
import axiosInstance from '../Config/axiosInstance';

interface Member {
  userId: string;
  permissionLevel: string;
  name: string;
  email: string;
  joinedAt: string;
}

interface OrganizationMembersProps {
  members: Member[];
  orgId: string;
}

const OrgMembers: React.FC<OrganizationMembersProps> = ({ members, orgId }) => {
  const [memberList, setMemberList] = useState<Member[]>([]);

  useEffect(() => {
    setMemberList(members); // Initialize members from props
  }, [members]);

  // Handle removing a member
  const handleRemoveMember = async (userId: string) => {
    try {
      await axiosInstance.delete(
        `settings/organization/${orgId}/kick-org-member?user_id=${userId}`
      );
      // Remove the member from the state
      setMemberList((prevMembers) => prevMembers.filter((member) => member.userId !== userId));
      console.log(`Member with ID ${userId} removed successfully.`);
    } catch (error) {
      console.error(`Error removing member with ID ${userId}:`, error);
    }
  };

return (
    <div className="mt-4 bg-scheme-200 rounded-lg p-12">
        <div className="text-xl font-semibold text-scheme-500 mb-4">Members:</div>
        {memberList.length === 0 ? (
            <div className="text-scheme-500">No members found.</div>
        ) : (
            <ul className="space-y-4">
                {memberList.map((member) => (
                    <li key={member.userId} className="bg-scheme-300 flex justify-between items-center mb-4 p-4 rounded-lg">
                        <div className="flex flex-col">
                            <p className="font-medium text-scheme-500">{member.name}</p>
                            <p className="text-sm text-scheme-500">Access: {member.permissionLevel}</p>
                            <p className="text-sm text-scheme-500">Email: {member.email}</p>
                            <p className="text-sm text-scheme-500">
                                Joined At: {new Date(member.joinedAt).toLocaleDateString()}
                            </p>
                        </div>
                            <RectangleButton
                                buttonText="Kick"
                                buttonClass="bg-red text-white hover:bg-hoverRed"
                                onPress={() => handleRemoveMember(member.userId)}
                                confirmation={{
                                    confirmationText: `Are you sure you want to remove ${member.name}?`,
                                }}
                            />                 
                    </li>
                ))}
            </ul>
        )}
    </div>
);
};

export default OrgMembers;



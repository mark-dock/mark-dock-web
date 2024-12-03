import React from 'react';
import RectangleButton from './Buttons/RectangleButton';

interface Member {
    userId: string;
    permissionLevel: string;
    name: string;
    email: string;
    joinedAt: string;
}

interface OrganizationMembersProps {
    members: Member[];
}

const OrgMembers: React.FC<OrganizationMembersProps> = ({ members }) => {
    return (
        <div className="mt-4 bg-scheme-200 rounded-lg p-12">
            <div className="text-xl font-semibold text-scheme-500 mb-4">Members:</div>
            <ul className="space-y-4 bg-scheme-300 rounded-lg p-4">
                {members.map((member) => (
                    <li key={member.userId} className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <p className="font-medium text-scheme-500">{member.name}</p>
                            <p className="text-sm text-scheme-500">Access: {member.permissionLevel}</p>
                            <p className="text-sm text-scheme-500">Email: {member.email}</p>
                            <p className="text-sm text-scheme-500">Joined At: {new Date(member.joinedAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-4">
                            <RectangleButton 
                            buttonText="Kick"
                             buttonClass="bg-red text-white hover:bg-hoverRed"
                              onPress={() => console.log(`Removing ${member.name}`)} 
                              confirmation={{
                                confirmationText: `Are you sure you want to remove ${member.name}?`,
                             }}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrgMembers;


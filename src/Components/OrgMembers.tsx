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
        <div className="mt-4">
            <h4 className="text-lg font-semibold text-scheme-500 mb-4">Members:</h4>
            <ul className="space-y-4">
                {members.map((member) => (
                    <li key={member.userId} className="flex justify-between items-center border p-4 rounded-md shadow-md">
                        <div className="flex flex-col">
                            <p className="font-medium text-scheme-500">{member.name}</p>
                            <p className="text-sm text-scheme-500">Access: {member.permissionLevel}</p>
                            <p className="text-sm text-scheme-500">Email: {member.email}</p>
                            <p className="text-sm text-scheme-500">Joined At: {new Date(member.joinedAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-4">
                            <RectangleButton buttonText="Kick"
                             buttonColor="red" 
                             buttonTextColor="white"
                              onPress={() => console.log(`Removing ${member.name}`)} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrgMembers;


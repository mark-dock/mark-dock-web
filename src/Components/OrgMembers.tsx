import React from 'react';

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
            <h4 className="text-lg font-semibold text-scheme-100 mb-4">Members:</h4>
            <ul className="space-y-4">
                {members.map((member) => (
                    <li key={member.userId} className="flex justify-between items-center border p-4 rounded-md shadow-md">
                        <div className="flex flex-col">
                            <p className="font-medium text-scheme-100">{member.name}</p>
                            <p className="text-sm text-scheme-200">Access: {member.permissionLevel}</p>
                            <p className="text-sm text-scheme-300">Email: {member.email}</p>
                            <p className="text-sm text-scheme-300">Joined At: {new Date(member.joinedAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button className="text-blue-600 hover:text-blue-500 transition-all duration-200">
                                Update Role
                            </button>
                            <button className="text-red-600 hover:text-red-500 transition-all duration-200">
                                Kick Member
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrgMembers;


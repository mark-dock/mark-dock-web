import React from 'react';

interface Member {
    userId: string;
    access: string;
    userName: string;
}

interface OrganizationMembersProps {
    members: Member[];
}

const OrgMembers: React.FC<OrganizationMembersProps> = ({ members }) => {
    return (
        <div className="mt-2">
            <h4 className="font-semibold">Members:</h4>
            <ul className="list-disc pl-6">
                {members.map((member) => (
                    <li key={member.userId}>
                        User ID: {member.userId}, Access: {member.access}, Name: {member.userName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrgMembers;

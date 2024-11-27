
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrgSettings: React.FC = () => {
    const { orgId } = useParams<{ orgId: string }>();
    const [organizationId, setOrganizationId] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (orgId) {
            setOrganizationId(orgId);
        }
    }, [orgId]);

    return (
        <div>
            <h1>Organization Settings</h1>
            {organizationId && <p>Organization ID: {organizationId}</p>}
        </div>
    );
};

export default OrgSettings;
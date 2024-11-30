import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../Config/axiosInstance";
import OrgMembers from "./OrgMembers";
import OrgInviteLinks from "./OrgInviteLinks";

const OrgSettings: React.FC = () => {
    const { orgId } = useParams<{ orgId: string }>();
    const [organizationId, setOrganizationId] = useState<string | undefined>(undefined);
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        if (orgId) {
            setOrganizationId(orgId);
            axiosInstance.get(`/organization/${orgId}/get-settings`)
                .then(response => {
                    setSettings(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the settings!", error);
                });
        }
    }, [orgId]);

    return (
        <div>
            <h1>Organization Settings</h1>
            {organizationId && <p>Organization ID: {organizationId}</p>}
            {settings.currentUserJoinedAt && <p>Joined At: {new Date(settings.currentUserJoinedAt).toLocaleDateString()}</p>}
            <OrgMembers members={settings?.members || []} />
            <OrgInviteLinks inviteLinks={settings?.inviteLinks || []} />


        </div>
    );
};

export default OrgSettings;
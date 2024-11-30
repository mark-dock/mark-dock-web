import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../Config/axiosInstance";
import OrgMembers from "./OrgMembers";
import OrgInviteLinks from "./OrgInviteLinks";

const OrgSettings: React.FC = () => {
    const { orgId } = useParams<{ orgId: string }>();
    const [settings, setSettings] = useState<{
        members?: Array<any>;
        inviteLinks?: Array<any>;
        currentUserJoinedAt?: string;
        organizationName?: string;
    } | null>(null);

    useEffect(() => {
        if (orgId) {
            axiosInstance
                .get(`/organization/${orgId}/get-settings`)
                .then((response) => {
                    setSettings(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching organization settings:", error);
                });
        }
    }, [orgId]);

    return (
        <div className="relative min-h-screen bg-scheme-100 flex justify-center items-center">
        <div className="bg-dark-blue p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <img
              src={"/images/org.jpg"}
              alt={"Organization Logo"}
              className="w-20 h-20 rounded-full mx-auto md:mx-0"
            />
            <div className="col-span-2 md:ml-6">
              {settings?.organizationName && (
                <h2 className="text-2xl font-semibold text-scheme-500 mb-2">
                  {settings.organizationName + " Settings"}
                </h2>
              )}
              {orgId && <p className="text-sm text-gray-200">Organization ID: {orgId}</p>}
              {settings?.currentUserJoinedAt && (
                <p className="text-sm text-gray-200">
                  Joined At: {new Date(settings.currentUserJoinedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          <div className="mt-8">
            <OrgMembers members={settings?.members || []} />
          </div>
          <div className="mt-8">
            <OrgInviteLinks inviteLinks={settings?.inviteLinks || []} />
          </div>
        </div>
      </div>
      

    );
};

export default OrgSettings;
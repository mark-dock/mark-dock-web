import axiosInstance from "../../Config/axiosInstance";
import React, { useState } from "react";
import RectangleButton from "../Buttons/RectangleButton";

interface CreateOrgFormProps {
  onSuccess: (orgName: string) => void;
  onFailure: (errorMessage: string) => void;
  onCancel: () => void; // New prop for cancel
  formTextClass: string;
  submitButtonClass: string;
  cancelButtonClass: string;
}

const CreateOrgForm: React.FC<CreateOrgFormProps> = ({
  onSuccess,
  onFailure,
  onCancel,
  formTextClass,
  submitButtonClass,
  cancelButtonClass,
}) => {
  const [orgName, setOrgName] = useState("");

  const handleCreateOrganization = async () => {
    if (!orgName.trim()) {
      onFailure("Organization name cannot be empty.");
      return;
    }

    try {
      const response = await axiosInstance.post("/organization/create", { name: orgName });
      if (response.status === 201) {
        onSuccess(orgName);
        setOrgName(""); // Clear input field
      } else {
        throw new Error("Failed to create organization");
      }
    } catch (error) {
      console.error("Error creating organization:", error);
      onFailure("Error creating organization");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-scheme-400 bg-opacity-80">
      <div className="bg-scheme-250 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className={`text-lg font-bold mb-4 text-center ${formTextClass}`}>
          Create New Organization
        </div>
        <input
          type="text"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder="Enter organization name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <div className="flex justify-center space-x-4">
          <RectangleButton
            buttonText="Submit"
            buttonClass={submitButtonClass}
            onPress={handleCreateOrganization}
          />
          <RectangleButton
            buttonText="Cancel"
            buttonClass={cancelButtonClass}
            onPress={onCancel} // Close the form
          />
        </div>
      </div>
    </div>
  );
};

export default CreateOrgForm;


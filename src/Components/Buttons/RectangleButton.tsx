import React, { useState } from "react";
import ConfirmChoiceButton from "./ConfirmChoiceButton";

interface RectangleButtonProps {
  buttonText: string;
  color: string;
  onPress: () => void;
  confirmationText?: string; // Only this prop is needed now
}

const RectangleButton: React.FC<RectangleButtonProps> = ({ 
  buttonText, 
  color, 
  onPress, 
  confirmationText 
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    if (confirmationText) {
      setShowConfirm(true); // Show confirmation dialog if confirmationText is provided
    } else {
      onPress(); // Directly run onPress if no confirmation is needed
    }
  };

  return (
    <div>
      {showConfirm ? (
        <ConfirmChoiceButton
          message={confirmationText!} // confirmationText must be provided if confirm is true
          onChoice={(choice) => {
            if (choice === "Yes") {
              onPress(); // Run onPress if user confirms
            }
            setShowConfirm(false); // Hide confirmation dialog
          }}
        />
      ) : (
        <button
          className={`text-${color}-600 hover:text-${color}-500 transition-all duration-200`}
          onClick={handleClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default RectangleButton;



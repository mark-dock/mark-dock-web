import React, { useState } from "react";
import ConfirmChoiceButton from "./ConfirmChoiceButton";

interface ConfirmationProps {
  confirmationText: string;
  confirmationTextClass?: string;
  confirmationYesButtonClass?: string;
  confirmationNoButtonClass?: string;
}

interface RectangleButtonProps {
  buttonText: string;
  buttonClass: string; // Full class name for button styles
  onPress: () => void;
  confirmation?: ConfirmationProps; // Optional confirmation prop
}

const RectangleButton: React.FC<RectangleButtonProps> = ({
  buttonText,
  buttonClass,
  onPress,
  confirmation,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    if (confirmation) {
      setShowConfirm(true); // Show confirmation dialog if confirmation prop exists
    } else {
      onPress(); // Directly run onPress if no confirmation is needed
    }
  };

  return (
    <div>
      {showConfirm && confirmation ? (
        <ConfirmChoiceButton
          message={confirmation.confirmationText}
          onChoice={(choice) => {
            if (choice === "Yes") {
              onPress(); // Run onPress if user confirms
            }
            setShowConfirm(false); // Hide confirmation dialog
          }}
          confirmationTextClass={confirmation.confirmationTextClass || "text-white"} // Default classes here if not specified
          confirmationYesButtonClass={confirmation.confirmationYesButtonClass || "bg-red-600 text-white hover:bg-red-500"} 
          confirmationNoButtonClass={confirmation.confirmationNoButtonClass || "bg-gray-600 text-white hover:bg-gray-500"}
        />
      ) : (
        <button
          className={`${buttonClass} transition-all duration-200 px-6 py-2 rounded-md shadow-md`}
          onClick={handleClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default RectangleButton;






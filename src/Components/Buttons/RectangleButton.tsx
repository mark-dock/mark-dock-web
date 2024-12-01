import React, { useState } from "react";
import ConfirmChoiceButton from "./ConfirmChoiceButton";

interface ConfirmationProps {
  confirmationText: string;
  confirmationTextColor?: string;
  confirmationYesButtonColor?: string;
  confirmationYesTextColor?: string;
  confirmationNoButtonColor?: string;
  confirmationNoTextColor?: string;
}

interface RectangleButtonProps {
  buttonText: string;
  buttonTextColor: string;
  buttonColor: string;
  onPress: () => void;
  confirmation?: ConfirmationProps; // Optional confirmation prop
}

const RectangleButton: React.FC<RectangleButtonProps> = ({ 
  buttonText, 
  buttonTextColor, 
  buttonColor, 
  onPress, 
  confirmation 
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
          confirmationTextColor={confirmation.confirmationTextColor || "black"} // Default to black
          confirmationYesButtonColor={confirmation.confirmationYesButtonColor || "green"}  // Default to green
          confirmationYesTextColor={confirmation.confirmationYesTextColor || "blue"} // Default to white
          confirmationNoButtonColor={confirmation.confirmationNoButtonColor || "red"}  // Default to red
          confirmationNoTextColor={confirmation.confirmationNoTextColor || "white"} // Default to white
        />
      ) : (
        <button
        className={`bg-${buttonColor}-600 text-${buttonTextColor} hover:bg-${buttonColor}-500 hover:text-${buttonTextColor} transition-all duration-200 px-6 py-2 rounded-md shadow-md`}

          onClick={handleClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default RectangleButton;





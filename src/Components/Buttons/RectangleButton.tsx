import React, { useState } from "react";
import ConfirmChoiceButton from "./ConfirmChoiceButton";

interface RectangleButtonProps {
  buttonText: string;
  color: string;
  onPress: () => void;
  confirm?: boolean;
  confirmationText?: string;
}

const RectangleButton: React.FC<RectangleButtonProps> = ({ 
  buttonText, 
  color, 
  onPress, 
  confirm = false, 
  confirmationText 
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    if (confirm) {
      setShowConfirm(true); 
    } else {
      onPress(); 
    }
  };

  return (
    <div>
      {showConfirm ? (
        <ConfirmChoiceButton
          message={confirmationText!} // confirmationText must be provided if confirm is true
          onChoice={(choice) => {
            if (choice === "Yes") {
              onPress();
            }
            setShowConfirm(false); 
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


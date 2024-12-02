import React, { useState } from "react";
import RectangleButton from "./RectangleButton";

interface ConfirmChoiceButtonProps {
  message: string;
  onChoice: (choice: "Yes" | "No") => void;
  confirmationTextClass: string;
  confirmationYesButtonClass: string;
  confirmationNoButtonClass: string;
}

const ConfirmChoiceButton: React.FC<ConfirmChoiceButtonProps> = ({
  message,
  onChoice,
  confirmationTextClass,
  confirmationYesButtonClass,
  confirmationNoButtonClass,
}) => {
  const [choice, setChoice] = useState("");

  const handleChoiceClick = (selectedChoice: "Yes" | "No") => {
    setChoice(selectedChoice);
    onChoice(selectedChoice); // Call the passed function with the choice
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-scheme-400 bg-opacity-80">
      <div className="bg-scheme-250 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className={`text-lg font-bold mb-4 text-center ${confirmationTextClass}`}>
          {message}
        </div>
        <div className="flex justify-center space-x-4">
          <RectangleButton
            buttonText="Yes"
            buttonClass={confirmationYesButtonClass}
            onPress={() => handleChoiceClick("Yes")}
          />
          <RectangleButton
            buttonText="No"
            buttonClass={confirmationNoButtonClass}
            onPress={() => handleChoiceClick("No")}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmChoiceButton;




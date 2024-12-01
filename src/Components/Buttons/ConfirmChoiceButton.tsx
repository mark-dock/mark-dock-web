import React, { useState } from 'react';
import RectangleButton from './RectangleButton';

interface ConfirmChoiceButtonProps {
    message: string;
    onChoice: (choice: 'Yes' | 'No') => void;
    confirmationYesButtonColor: string;
    confirmationYesTextColor: string;
    confirmationNoButtonColor: string;
    confirmationNoTextColor: string;
}

const ConfirmChoiceButton: React.FC<ConfirmChoiceButtonProps> = ({
  message, 
  onChoice, 
  confirmationYesButtonColor, 
  confirmationYesTextColor, 
  confirmationNoButtonColor, 
  confirmationNoTextColor 
}) => {
    const [choice, setChoice] = useState('');

    const handleChoiceClick = (selectedChoice: 'Yes' | 'No') => {
        setChoice(selectedChoice);
        onChoice(selectedChoice); // Call the passed function with the choice
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-scheme-200 bg-opacity-80">
            <div className="bg-scheme-250 p-6 rounded-lg shadow-lg max-w-sm w-full">
                <div className="text-lg font-bold mb-4 text-center text-scheme-100">{message}?</div>
                <div className="flex justify-center space-x-4">
                    <RectangleButton
                        buttonText="Yes"
                        buttonTextColor={confirmationYesTextColor}  // Use provided Yes button text color
                        buttonColor={confirmationYesButtonColor}  // Use provided Yes button color
                        onPress={() => handleChoiceClick('Yes')}
                    />
                    <RectangleButton
                        buttonText="No"
                        buttonTextColor={confirmationNoTextColor}  // Use provided No button text color
                        buttonColor={confirmationNoButtonColor}  // Use provided No button color
                        onPress={() => handleChoiceClick('No')}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfirmChoiceButton;



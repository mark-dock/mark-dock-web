import React, { useState } from 'react';
import RectangleButton from './RectangleButton';

interface ConfirmChoiceButtonProps {
    message: string;
    onChoice: (choice: 'Yes' | 'No') => void;
}

const ConfirmChoiceButton: React.FC<ConfirmChoiceButtonProps> = ({ message, onChoice }) => {
    const [choice, setChoice] = useState('');

    const handleChoiceClick = (selectedChoice: 'Yes' | 'No') => {
        setChoice(selectedChoice);
        onChoice(selectedChoice); // Call the passed function with the choice
    };

    return (
        <div className="space-y-4">
            <p className="text-lg">{message}?</p>
            <div className="flex space-x-4">
                <RectangleButton
                    buttonText="Yes"
                    color="green"
                    onPress={() => handleChoiceClick('Yes')}
                />
                <RectangleButton
                    buttonText="No"
                    color="red"
                    onPress={() => handleChoiceClick('No')}
                />
            </div>
            {choice && <p className="text-gray-600">Choice: {choice}</p>}
        </div>
    );
};

export default ConfirmChoiceButton;


import React, { useState } from 'react';

const CreateOrg = () => {
    const [orgName, setOrgName] = useState('');

    const handleOrgNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrgName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('http://127.0.0.1:8080/organization/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: orgName }),
        });
        if (response.ok) {
            // Handle successful response
            console.log('Organization created successfully');
        } else {
            // Handle error response
            console.error('Failed to create organization');
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Create Organization</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="orgName" className="block text-gray-700 font-bold mb-2">Organization Name:</label>
                    <input
                        type="text"
                        id="orgName"
                        value={orgName}
                        onChange={handleOrgNameChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateOrg;
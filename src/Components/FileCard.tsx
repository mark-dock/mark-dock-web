import { useState } from 'react';
import axiosInstance from '../Config/axiosInstance';

export default function FileCard() {
    const openFile = async () => {
        const response = await axiosInstance.get('/file/read');
        const data = await response.data;
        console.log(data);
    }
    return (
        <button
            onClick={() => openFile()}
            className="bg-scheme-500 p-4 rounded-lg shadow"
        >
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-medium">README.md</h3>
                    <p className="text-sm text-gray-600">/docs/project-a/</p>
                </div>
                <img src="/api/placeholder/32/32" alt="Author Avatar" className="w-8 h-8 rounded-full" />
            </div>
            <div className="text-sm text-gray-600 pt-8">
                <p>Last updated by Sarah Smith</p>
                <p>2 hours ago</p>
            </div>
        </button>
    );
}

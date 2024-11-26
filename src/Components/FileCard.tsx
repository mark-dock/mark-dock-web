import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Config/axiosInstance';

export default function FileCard() {
    const navigate = useNavigate();
    const cardInfo = {
        name: 'README.md',
        path: '/docs/project-a/',
        updatedBy: 'Sarah Smith',
        updatedAt: '2 hours ago'
    }

    const openFile = async () => {
        navigate('/editor');
        // const response = await axiosInstance.get('/file/read');
        // const data = await response.data;
        // console.log(data);
    }
    return (
        <button
            onClick={() => openFile()}
            className="bg-scheme-500 p-4 rounded-lg shadow hover:bg-white transition-colors duration-200"
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col items-start">
                    <h3 className="font-medium">{cardInfo?.name}</h3>
                    <p className="text-sm text-gray-600">{cardInfo?.path}</p>
                </div>
                <img src="/images/avatar.jpg" alt="Author Avatar" className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex flex-col justify-between items-start text-sm text-gray-600 pt-8">
                <p>{('Updated by ').concat(cardInfo?.updatedBy)}</p>
                <p>{cardInfo?.updatedAt}</p>
            </div>
        </button>
    );
}

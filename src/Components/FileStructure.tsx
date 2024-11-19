import { useState } from 'react';
import axiosInstance from '../Config/axiosInstance';

export default function FileStructure() {
    return (
        <div className="bg-scheme-200 rounded-lg shadow p-6">
            <div className="space-y-3 text-scheme-500">
                {/* Root Folder */}
                <div className="flex items-center">
                    <svg className="w-6 h-6 text-scheme-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                    </svg>
                    <span className="ml-2 font-medium">docs</span>
                </div>

                {/* Nested Items */}
                <div className="ml-6 space-y-3">
                    {/* Project A Folder */}
                    <div className="flex items-center">
                        <svg className="w-6 h-6 text-scheme-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        <span className="ml-2">project-a</span>
                    </div>

                    {/* Project B Folder */}
                    <div className="flex items-center">
                        <svg className="w-6 h-6 text-scheme-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        <span className="ml-2">project-b</span>
                    </div>

                    {/* API Folder */}
                    <div className="ml-6 space-y-3">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-scheme-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                            </svg>
                            <span className="ml-2">api</span>
                        </div>

                        {/* API Version Folder */}
                        <div className="ml-6">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-scheme-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                </svg>
                                <span className="ml-2">v2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

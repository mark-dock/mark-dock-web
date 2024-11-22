import { useState } from 'react';
import axiosInstance from '../Config/axiosInstance';

export default function FileStructure() {
    return (
        <div className="mx-16 p-6 bg-scheme-200 rounded-lg shadow">
            <div className="text-scheme-500">
                {/* Root Folder */}
                <button className="flex w-full p-2 items-center hover:bg-scheme-250">
                    <svg className="w-6 h-6 text-scheme-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                    </svg>
                    <span className="ml-2 font-medium">docs</span>
                </button>

                <hr className="border border-scheme-250" />

                {/* Nested Items */}
                <div className="ml-6">
                    {/* Project A Folder */}
                    <button className="flex items-center w-full p-2 hover:bg-scheme-250">
                        <svg className="w-6 h-6 text-scheme-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        <span className="ml-2">project-a</span>
                    </button>

                    <hr className="border border-scheme-250" />

                    {/* Project B Folder */}
                    <button className="flex items-center w-full p-2 hover:bg-scheme-250">
                        <svg className="w-6 h-6 text-scheme-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        <span className="ml-2">project-b</span>
                    </button>

                    <hr className="border border-scheme-250" />

                    {/* API Folder */}
                    <div className="ml-6">
                        <button className="flex w-full p-2 items-center hover:bg-scheme-250">
                            <svg className="w-6 h-6 text-scheme-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                            </svg>
                            <span className="ml-2">api</span>
                        </button>

                        <hr className="border border-scheme-250" />

                        {/* API Version Folder */}
                        <div className="ml-6">
                            <button className="flex w-full p-2 items-center hover:bg-scheme-250">
                                <svg className="w-6 h-6 text-scheme-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                </svg>
                                <span className="ml-2">v2</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

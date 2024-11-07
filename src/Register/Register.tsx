import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Config/axiosInstance";

interface AxiosError {
    config: any;
    response?: {
        status: number;
    };
}

const handleResponse = (response: any, navigate: any, setShowError: any) => {
    if (response.status === 201) {
        navigate('/dashboard');
    } else {
        setShowError(true);
    }
};

const handleError = (error: AxiosError, setShowError: any) => {
    if (error.response && error.response.status === 403) {
        setShowError(true);
    } else {
        console.error("An unexpected error occurred:", error);
    }
};

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axiosInstance.post("/auth/register", {
                name,
                email,
                password,
                provider: "LOCAL"
            });

            handleResponse(response, navigate, setShowError);
        } catch (error: any) {
            handleError(error as AxiosError, setShowError);
        }
    };

    return (
        <>
            <div className="flex text-white bg-scheme-100 min-h-screen w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 pb-64">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-scheme-500">
                        Create an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-scheme-500">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block bg-scheme-500 w-full rounded-md border-0 py-1.5 px-3 text-scheme-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-scheme-500">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block bg-scheme-500 w-full rounded-md border-0 py-1.5 px-3 text-scheme-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-scheme-500">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block bg-scheme-500 w-full rounded-md border-0 py-1.5 px-3 text-scheme-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-scheme-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-scheme-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                            >
                                Register
                            </button>
                        </div>

                        {showError && (
                            <div className="text-sm text-center text-red-400">
                                User already exists or an error occurred. Please try again.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

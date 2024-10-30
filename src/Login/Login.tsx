import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axiosInstance from "../Config/axiosInstance";

interface AxiosError {
    config: any;
    response?: {
        status: number;
    };
}

const handleResponse = (response: any, navigate: any, setShowError: any) => {
    if (response.status === 202) {
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

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axiosInstance.post("/auth/login", {
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
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>

                        <div className="text-sm text-center text-blue-500">
                            <a href="/register"> Dont have an account? Register here. </a>
                        </div>

                        {showError && (
                            <div className="text-sm text-center text-red-400">
                                Email or password incorrect. Please try again.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

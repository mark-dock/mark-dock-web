import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Home() {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handleSignUpRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center relative overflow-hidden">
            {/* Background markdown documents */}
            <div className="bg-docs absolute inset-0" />

            {/* Main content */}
            <main className="relative z-10 w-full max-w-md px-6">
                <div className="flex flex-col items-center text-center space-y-6">
                    {/* Logo and title */}
                    <div className="flex items-center space-x-3">
                        <img
                            src="/images/logo.png"
                            alt="MarkDock Logo"
                            className="w-10 h-10"
                        />
                        <h1 className="text-3xl font-bold">MarkDock</h1>
                    </div>

                    {/* Subtitle */}
                    <p className="text-lg text-gray-300">
                        Group documentation, the easy way.
                    </p>

                    {/* Buttons */}
                    <div className="w-full space-y-3">
                        <button
                            onClick={handleLoginRedirect}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded transition-colors"
                        >
                            Log In
                        </button>
                        <button
                            onClick={handleSignUpRedirect}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

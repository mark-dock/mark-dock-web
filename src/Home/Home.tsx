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
        <div className="min-h-screen bg-scheme-100 text-white flex items-center relative overflow-hidden justify-start">
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/docblur.jpg"
                    alt="Background"
                    className="w-half h-full object-cover"
                    style={{
                        transform: 'rotate(-8deg) scale(1.4) translateX(120%) translateY(20%)',
                        filter: 'blur(3px)'
                    }}
                />
            </div>
            {/* Main content */}
            <main className="relative z-10 w-1/4 px-6 ml-48"> {/* Changed from w-half max-w-md */}
                <div className="flex flex-col text-left space-y-1 mb-32"> {/* Removed items-center */}
                    {/* Logo and title */}
                    <div className="flex items-left justify-left space-x-3"> {/* Added justify-center */}
                        <img
                            src="/images/logo.png"
                            alt="MarkDock Logo"
                            className="w-12 h-13"
                        />
                        <h1 className="text-6xl font-bold text-scheme-500">MarkDock</h1>
                    </div>

                    {/* Subtitle */}
                    <p className="text-lg text-scheme-300">
                        Group documentation, the easy way.
                    </p>

                    {/* Buttons */}
                    <div className="w-1/2 space-y-3 py-8">
                        <button
                            onClick={handleLoginRedirect}
                            className="w-full bg-scheme-300 hover:bg-scheme-400 text-left text-scheme-500 hover:text-scheme-500 px-6 py-2 rounded transition-colors"
                        >
                            Log In
                        </button>
                        <button
                            onClick={handleSignUpRedirect}
                            className="w-full bg-scheme-200 hover:bg-scheme-500 text-left text-scheme-500 hover:text-scheme-100 px-6 py-2 rounded transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

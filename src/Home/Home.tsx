import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    MarkDock
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 max-w">
                    Group documentation, the way it d be.
                </p>
                <button
                    onClick={handleLoginRedirect}
                    className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
}
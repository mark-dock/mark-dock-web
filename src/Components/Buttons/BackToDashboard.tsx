import { useNavigate } from "react-router-dom";

export default function BackToDashboard() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  }

  return (
    <div>
      <button
        onClick={() => { goToDashboard() }}
        className="flex px-8 items-center bg-backRed hover:bg-scheme-300 rounded-lg p-2 transition-colors duration-200 text-scheme-100"
      >
        <svg className="w-5 h-8" fill="none" stroke="black" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="ml-3 text-medium font-medium">Back</span>
      </button>
    </div>
  );
}

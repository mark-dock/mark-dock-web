import { useNavigate } from 'react-router-dom';
import FileCard from '../../Types/file_card';
import TimeAgo from '../../Util/TimeStringConverter';

export default function FileCardComponent({ file_card_info }: { file_card_info: FileCard }) {
    const navigate = useNavigate();

    const openFile = async () => {
        navigate('/editor');
    };

    return (
        <button
            onClick={() => openFile()}
            className="bg-scheme-500 p-4 rounded-lg shadow hover:bg-white transition-colors duration-200"
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col items-start">
                    <h3 className="font-medium">{file_card_info?.name}</h3>
                    <p className="text-sm text-gray-600">/docs/project</p>
                </div>
                <img src="/images/avatar.jpg" alt="Author Avatar" className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex flex-col justify-between items-start text-sm text-gray-600 pt-8">
                {file_card_info?.updated_user_name && (
                    <p>{('Updated by ').concat(file_card_info.updated_user_name)}</p>
                )}
                <p>{TimeAgo(file_card_info.updated_at)}</p>
            </div>
        </button>
    );
};

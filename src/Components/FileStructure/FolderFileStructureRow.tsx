import { Folder as FolderIcon, FileText as FileIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FolderFileStructureInfo } from '../../Types/FileStructure/FolderFileStructureInfo';
import TimeAgo from "../../Util/TimeStringConverter";

export default function FolderFileStructureRow({ id, name, updatedAt, type }: FolderFileStructureInfo) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (type === 'File') {
            navigate(`/editor/${id}`);
        } else if (type === 'Folder') {
            console.log(`Folder clicked: ${id}`);
        }
    };

    return (
        <button
            className="flex w-full p-2 items-center justify-between hover:bg-scheme-250 transition-colors duration-100 rounded-md"
            onClick={handleClick}
        >
            <div className="flex items-center">
                {type === 'Folder' ? (
                    <FolderIcon className="w-6 h-6 text-scheme-400" />
                ) : (
                    <FileIcon className="w-6 h-6 text-scheme-400" />
                )}
                <span className="ml-2 font-medium text-scheme-700">{name}</span>
            </div>

            <div className="text-right text-scheme-500">
                <div className="text-xs">Last Updated: {TimeAgo(updatedAt.toString())}</div>
            </div>
        </button>
    );
}

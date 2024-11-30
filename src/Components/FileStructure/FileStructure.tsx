import { useState, useEffect } from 'react';
import axiosInstance from '../../Config/axiosInstance';
import FolderFileStructureRow from './FolderFileStructureRow';
import { FileStructureData } from '../../Types/FileStructure/FolderFileStructureInfo';

export default function FileStructure() {
    const [data, setData] = useState<FileStructureData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const organizationId = localStorage.getItem('selectedOrgId');
                const endpoint = organizationId
                    ? `/folder/root/organization/${organizationId}/structure`
                    : `/folder/root/user/structure`;

                const response = await axiosInstance.get(endpoint);
                setData(response.data);
            } catch (err) {
                console.error('Error fetching folder/file structure:');
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-scheme-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error fetching structure.</div>;
    }

    return (
        <div className="mx-16 p-6 bg-scheme-200 rounded-lg shadow">
            <div className="text-scheme-500">
                {data && (
                    <>
                        {data.folders.length === 0 && data.files.length === 0 ? (
                            <div className="text-center text-scheme-500">
                                <p className="font-medium">No folders or files found.</p>
                                <p className="text-sm text-gray-600">Start by creating a file or uploading a file!</p>
                            </div>
                        ) : (
                            <>
                                {data.folders.map((folder) => (
                                    <FolderFileStructureRow
                                        key={folder.id}
                                        id={folder.id}
                                        name={folder.name}
                                        updatedAt={folder.updatedAt}
                                        type="Folder"
                                    />
                                ))}

                                {data.files.map((file) => (
                                    <FolderFileStructureRow
                                        key={file.id}
                                        id={file.id}
                                        name={file.name}
                                        updatedAt={file.updatedAt}
                                        type="File"
                                    />
                                ))}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>

    );
}

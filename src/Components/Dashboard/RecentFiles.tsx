import { useState, useEffect } from "react";
import FileCardComponent from "./FileCard";
import FileCard from "../../Types/file_card";
import axiosInstance from "../../Config/axiosInstance";

export default function RecentFiles() {
    const [documents, setDocuments] = useState<FileCard[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const getBaseURL = (): string => {
        const selectedOrgId = localStorage.getItem("selectedOrgId");
        return selectedOrgId
            ? `/document/organization/${selectedOrgId}/recent`
            : `/document/user/recent`;
    };

    const fetchDocuments = async (currentPage: number) => {
        setIsLoading(true);
        try {
            const baseURL = getBaseURL();
            const response = await axiosInstance.get(`${baseURL}?page=${currentPage}`);
            const data = response.data;

            const content = data.documents.content.map((doc: any) => ({
                id: doc.fileId,
                name: doc.name,
                folder_name: doc.folderName,
                updated_user_name: doc.updatedUserId || null,
                updated_at: doc.updatedAt,
            }));

            setDocuments(content);
            setPage(data.documents.pageable.pageNumber);

            if (data.documents.totalPages >= 2) {
                setTotalPages(2);
            } else {
                setTotalPages(1)
            }
        } catch (error) {
            console.error("Error fetching documents:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments(0);
    }, []);

    const loadNextPage = () => {
        if (page + 1 < totalPages) {
            fetchDocuments(page + 1);
        }
    };

    const loadPreviousPage = () => {
        if (page > 0) {
            fetchDocuments(page - 1);
        }
    };

    return (
        <div>
            {documents.length > 0 && (
                <section className="mb-8 px-16">
                    <h2 className="text-xl font-semibold mb-4 text-scheme-500">Recent Files</h2>
                    <div className="relative flex items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 flex-grow">
                            {documents.map((doc) => (
                                <FileCardComponent
                                    key={doc.id}
                                    file_card_info={{
                                        id: doc.id,
                                        name: doc.name,
                                        folder_name: doc.folder_name,
                                        updated_user_name: doc.updated_user_name,
                                        updated_at: doc.updated_at,
                                    }}
                                />
                            ))}

                            {(page === 0 && page + 1 < totalPages)  && (
                                <button
                                    onClick={loadNextPage}
                                    disabled={isLoading}
                                    className={`col-start-6 flex justify-center items-center h-auto bg-scheme-200 p-4 rounded-lg shadow ${
                                        isLoading ? "cursor-not-allowed" : "hover:bg-scheme-250 transition-colors duration-200"
                                    }`}
                                >
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="white"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        ></path>
                                    </svg>
                                </button>
                            )}

                            {page === 1 && (
                                <button
                                    onClick={loadPreviousPage}
                                    disabled={isLoading}
                                    className={`col-start-6 flex justify-center items-center bg-scheme-200 p-4 rounded-lg shadow hover:bg-scheme-250 transition-colors duration-200 ${
                                        isLoading ? "cursor-not-allowed opacity-50" : ""
                                    }`}
                                >
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="white"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 19l-7-7 7-7"
                                        ></path>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

import { useState, useEffect } from "react";
import FileCardComponent from "./FileCard";
import FileCard from "../../Types/file_card";
import axiosInstance from "../../Config/axiosInstance";

export default function RecentFiles() {
    const [documents, setDocuments] = useState<FileCard[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const getBaseURL = (): string => {
        const selectedOrgId = localStorage.getItem("selectedOrgId");
        if (selectedOrgId) {
            return `/document/organization/${selectedOrgId}/recent`;
        } else {
            return `/document/user/recent`;
        }
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
                updated_user_name: doc.updatedUserId || null,
                updated_at: doc.updatedAt,
            }));

            setDocuments(content);
            setPage(data.documents.pageable.pageNumber);
            setTotalPages(data.documents.totalPages);
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

    if (!isLoading && documents.length === 0) {
        return <div></div>;
    }

    return (
        <div>
            <section className="mb-8 px-16">
                <h2 className="text-xl font-semibold mb-4 text-scheme-500">Recent Files</h2>
                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                        {documents.map((doc) => (
                            <FileCardComponent
                                key={doc.id}
                                file_card_info={{
                                    id: doc.id,
                                    name: doc.name,
                                    updated_user_name: doc.updated_user_name,
                                    updated_at: doc.updated_at,
                                }}
                            />
                        ))}
                    </div>
                    <button
                        onClick={loadNextPage}
                        disabled={isLoading || page + 1 >= totalPages}
                        className={`absolute right-0 top-0 mt-4 p-4 rounded-lg shadow transition-colors duration-200 ${
                            isLoading || page + 1 >= totalPages
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-scheme-200 hover:bg-scheme-250 text-scheme-500"
                        }`}
                    >
                        <svg
                            className="w-10 h-10"
                            fill="none"
                            stroke="currentColor"
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
                </div>
            </section>
            <hr className="border border-scheme-200 mb-4 mx-8"/>
        </div>
    );
}

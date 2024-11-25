import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../Config/axiosInstance";

interface EditorProps {
    initialValue?: string;
    onChange?: (value: string) => void;
}

export default function Editor({ initialValue = "", onChange }: EditorProps) {
    const [content, setContent] = useState(initialValue);
    const [preview, setPreview] = useState("");

    // Function to convert markdown to HTML-like preview
    const parseMarkdown = (text: string): string => {
        // Helper function to escape HTML special characters
        const escapeHtml = (unsafe: string) => {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        // Split into blocks for processing
        const blocks = text.split(/\n\s*\n/).map((block) => {
            // If block is special (header, list, etc.), keep single line breaks
            if (/^(#{1,6} |[-*+] |\d+\.\s|```)/.test(block)) {
                return block;
            }
            // For normal text, join lines within a block
            return block.replace(/\n/g, " ");
        });

        // Rejoin blocks with double newlines and process markdown
        let html = blocks.join('\n\n')
            // Math blocks ($$...$$)
            .replace(/\$\$([\s\S]*?)\$\$/g, '<div class="math-block">$1</div>')

            // Code blocks
            .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
                const escapedCode = escapeHtml(code.trim());
                const languageDisplay = lang ? `<div class="bg-neutral-900 text-neutral-500 px-4 text-sm font-medium">${lang}</div>` : '';
                return `<div class="rounded-lg bg-neutral-900 overflow-hidden mt-4">
                    ${languageDisplay}
                    <pre class="bg-neutral-900 px-4 text-scheme-500"><code>${escapedCode}</code></pre>
                </div>`;
            })

            // Headers with proper sizing
            .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold my-6">$1</h1>')
            .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold my-5">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-bold my-4">$1</h3>')
            .replace(/^#### (.*$)/gm, '<h4 class="text-xl font-bold my-3">$1</h4>')
            .replace(/^##### (.*$)/gm, '<h5 class="text-lg font-bold my-2">$1</h5>')
            .replace(/^###### (.*$)/gm, '<h6 class="text-base font-bold my-2">$1</h6>')

            // Lists (improved)
            .replace(/^\s*[-*+]\s+(.*)$/gm, '<li class="ml-4">$1</li>')
            .replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="list-disc my-4 ml-4">$&</ul>')

            // Links (fixed square brackets format)
            .replace(/\[([^\]]+)\]\[([^\]]+)\]/g, '<a href="$2" class="text-blue-400 hover:underline">$1</a>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:underline">$1</a>')

            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')

            // Italic
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

            // Paragraphs (only for lines that aren't already wrapped in HTML tags)
            .replace(/^(?!<[^>]*>)(.*$)/gm, (match) => {
                return match.trim() ? `<p class="my-4">${match}</p>` : '';
            })

            // Clean up empty paragraphs
            .replace(/<p>\s*<\/p>/g, '');

        return html;
    };

    useEffect(() => {
        const previewHtml = parseMarkdown(content);
        setPreview(previewHtml);
        onChange?.(content);
    }, [content, onChange]);

    return (
        <div className="flex flex-col h-screen bg-scheme-100">
            {/* Top Bar */}
            <div className="flex px-16 py-6 justify-between items-center bg-scheme-200 shadow-md">
                {/* Organization Info */}
                <button
                    className="flex items-center hover:bg-scheme-250 rounded-lg p-2 transition-colors duration-200"
                >
                    <img src="/images/org.jpg" alt="Organization Logo" className="w-10 h-10 rounded-full" />
                    <div className="ml-3 flex flex-col items-start">
                        <h1 className="text-xl font-bold text-scheme-500">Organization Name</h1>
                        <p className="text-sm text-scheme-400">Access Level</p>
                    </div>
                </button>

                {/* User Info */}
                <div className="flex items-center justify-between space-x-8">
                    <button
                        className="flex items-center hover:bg-scheme-250 rounded-lg p-2 transition-colors duration-200">
                        <img src="/images/avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full" />
                    </button>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Preview Panel */}
                <div
                    className="w-1/2 px-24 py-8 mt-4 text-scheme-500 bg-scheme-200 overflow-y-auto shadow-md prose prose-lg"
                    dangerouslySetInnerHTML={{ __html: preview }}
                />
                {/* Editor Panel */}
                <div className="w-1/2 px-8 py-4 bg-scheme-100 text-scheme-500">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-full resize-none p-4 font-mono text-base bg-scheme-100 focus:outline-none focus:ring-2 focus:ring-scheme-250"
                        placeholder="Type your markdown here..."
                    />
                </div>
            </div>
        </div>
    );
}

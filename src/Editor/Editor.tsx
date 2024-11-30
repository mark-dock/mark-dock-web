import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../Config/axiosInstance";
import HeaderUserButton from "../Components/Buttons/HeaderUserButton";
import BackToDashboard from "../Components/Buttons/BackToDashboard";
import katex from "katex";
import 'katex/dist/katex.min.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
// Import language support as needed
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';

interface EditorProps {
    initialValue?: string;
    onChange?: (value: string) => void;
}

export default function Editor({ initialValue = "", onChange }: EditorProps) {
    const { documentId } = useParams();
    const [content, setContent] = useState(initialValue);
    const [preview, setPreview] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Function to convert markdown to HTML-like preview
    const parseMarkdown = (text: string): string => {
        // Escape HTML special characters
        const escapeHtml = (unsafe: string) => {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        // Reduce line breaks
        const reduceLineBreaks = (text: string) => {
            // Split into paragraphs
            const paragraphs = text.split(/\n\s*\n/);
            // Reduce line breaks: 1 break -> 0, 2 breaks -> 1
            return paragraphs.map(p => p.trim()).filter(p => p).join('\n\n');
        };

        // First, reduce line breaks
        const reducedText = reduceLineBreaks(text);

        // Split into blocks for processing
        const blocks = reducedText.split(/\n\s*\n/).map((block) => {
            // If block is special (header, list, etc.), keep single line breaks
            if (/^(#{1,6} |[-*+] |\d+\.\s|```)/.test(block)) {
                return block;
            }
            // For normal text, join lines within a block
            return block.replace(/\n/g, " ");
        });

        // Rejoin blocks with adjusted newlines and process markdown
        let html = blocks.join('\n')
            // Math blocks ($$...$$)
            .replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
                try {
                    return `<div class="math-block my-4">${katex.renderToString(math, { displayMode: true })}</div>`;
                } catch (e) {
                    return `<div class="text-red-500">Error rendering math: ${math}</div>`;
                }
            })
            // Inline math ($...$)
            .replace(/\$([^\$]*?)\$/g, (_, math) => {
                try {
                    return katex.renderToString(math, { displayMode: false });
                } catch (e) {
                    return `<span class="text-red-500">Error rendering math: ${math}</span>`;
                }
            })

            // Code blocks with syntax highlighting
            .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
                // Function to decode HTML entities
                const decodeHtmlEntities = (text: string) => {
                    const textArea = document.createElement('textarea');
                    textArea.innerHTML = text;
                    return textArea.value;
                };

                const escapedCode = decodeHtmlEntities(code.trim());

                // Validate and sanitize language
                const validLang = lang && Prism.languages[lang] ? lang : 'javascript';

                // Fallback to unhighlighted if language is not supported
                const highlightedCode = Prism.languages[validLang]
                    ? Prism.highlight(escapedCode, Prism.languages[validLang], validLang)
                    : escapedCode;

                const languageDisplay = lang ? `<div class="bg-neutral-900 text-neutral-400 px-4 text-sm font-medium">${lang}</div>` : '';
                return `<div class="rounded-lg bg-neutral-900 overflow-hidden mt-4">
            ${languageDisplay}
            <pre class="bg-neutral-900 text-white px-4 text-sm leading-snug"><code class="language-${validLang}">${highlightedCode}</code></pre>
        </div>`;
            })

            // Headers with proper sizing
            .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold my-3">$1</h1>')
            .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold my-2">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-bold my-2">$1</h3>')
            .replace(/^#### (.*$)/gm, '<h4 class="text-xl font-bold my-2">$1</h4>')
            .replace(/^##### (.*$)/gm, '<h5 class="text-lg font-bold my-2">$1</h5>')
            .replace(/^###### (.*$)/gm, '<h6 class="text-base font-bold my-2">$1</h6>')

            // Lists (improved)
            .replace(/^\s*[-*+]\s+(.*)$/gm, '<li class="ml-6">$1</li>')
            .replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="list-disc my-2 ml-6">$&</ul>')

            // Links
            .replace(/\[([^\]]+)\]\[([^\]]+)\]/g, '<a href="$2" class="text-blue-400 hover:underline">$1</a>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:underline">$1</a>')

            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')

            // Italic
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

            // Paragraphs (adjust line breaks)
            .replace(/^(?!<[^>]*>)(.*$)/gm, (match) => {
                return match.trim() ? `<p>${match}</p>` : '';
            })

            // Clean up empty paragraphs
            .replace(/<p>\s*<\/p>/g, '');

        return html;
    };

    // Fetch document effect
    useEffect(() => {
        const fetchDocument = async () => {
            if (!documentId) {
                setError("No document ID provided");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const response = await axiosInstance.get(`/document/${documentId}/view`);

                // API returns the document content
                setContent(response.data.content || "");
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to fetch document:", err);
                setError("Failed to load document");
                setIsLoading(false);
            }
        };

        fetchDocument();
    }, [documentId]);

    // Existing preview effect
    useEffect(() => {
        const previewHtml = parseMarkdown(content);
        setPreview(previewHtml);
        onChange?.(content);
    }, [content, onChange]);

    // If loading, return loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If error, return error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Save document function
    const saveDocument = async () => {
        try {
            await axiosInstance.patch(`/document/${documentId}/content`,
                {
                    content: content
                }
            );
            alert("Document saved successfully!");
        } catch (err) {
            console.error("Failed to save document:", err);
            alert("Failed to save document");
        }
    };

    return (
        <div className="flex flex-col h-screen bg-scheme-100">
            {/* Top Bar */}
            <div className="flex px-16 py-6 justify-between items-center bg-scheme-200 shadow-md">
                <div className="flex items-center space-x-8">
                    {/* Back Button */}
                    <BackToDashboard />
                    {/* Save Document */}
                    <button
                        onClick={saveDocument}
                        className="flex px-8 py-3 items-center bg-saveGreen hover:bg-scheme-300 rounded-lg p-2 transition-colors duration-200 text-scheme-100"
                    >
                        <Save size={24} />
                        <span className="ml-4 text-medium font-medium">Save</span>
                    </button>
                </div>
                {/* User Info */}
                <HeaderUserButton />
            </div>

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Preview Panel */}
                <div
                    className="w-1/2 px-32 mt-4 text-scheme-500 bg-scheme-200 overflow-y-auto shadow-md prose prose-lg"
                    dangerouslySetInnerHTML={{ __html: preview }}
                />
                {/* Editor Panel */}
                <div className="w-1/2 px-8 py-4 bg-scheme-100 text-scheme-500">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-full resize-none p-4 font-mono text-base bg-scheme-100 focus:outline-none focus:ring-2 focus:ring-scheme-300"
                        placeholder="Type your markdown here..."
                    />
                </div>
            </div>
        </div>
    );
}

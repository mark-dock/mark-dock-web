import { Save, Trash2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
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
    const [title, setTitle] = useState("");
    const [preview, setPreview] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = useRef<HTMLDivElement>(null);

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

        let html = text;

        // Step 1: Extract and preserve code blocks
        const codeBlocks: string[] = [];
        html = html.replace(/```([a-zA-Z0-9]+)?\n([\s\S]*?)\n```/g, (fullMatch, lang, code) => {
            const decodeHtmlEntities = (text: string) => {
                const textArea = document.createElement('textarea');
                textArea.innerHTML = text;
                return textArea.value;
            };

            const escapedCode = decodeHtmlEntities(code.trim());

            // Validate language
            const validLang = lang && Prism.languages[lang] ? lang : 'javascript';

            // Fallback to javascript if language is not supported
            const highlightedCode = Prism.languages[validLang]
                ? Prism.highlight(escapedCode, Prism.languages[validLang], validLang)
                : escapedCode;

            const languageDisplay = lang ? `<div class="bg-neutral-900 text-neutral-400 px-4 text-sm font-medium">${lang}</div><hr class="border-neutral-800 border-opacity-50 border-t-2 mt-2 mb-2" />` : '';
            const processedBlock = `<div class="rounded-lg bg-neutral-900 overflow-hidden mt-4 pt-2 mb-4">
${languageDisplay}
<pre class="bg-neutral-900 text-white px-4 text-sm pb-6 -mt-2">
<code class="language-${validLang}">
${highlightedCode}
</code></pre></div>`;

            // Store the processed block and replace with a placeholder
            codeBlocks.push(processedBlock);
            return `[[CODEBLOCK_${codeBlocks.length - 1}]]`;
        });

        // Step 2: Process other Markdown elements
        html = html
            // Escape HTML special characters
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")

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

            // Headers with proper sizing
            .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold my-3">$1</h1>')
            .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold my-2">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-bold my-2">$1</h3>')
            .replace(/^#### (.*$)/gm, '<h4 class="text-xl font-bold my-2">$1</h4>')
            .replace(/^##### (.*$)/gm, '<h5 class="text-lg font-bold my-2">$1</h5>')
            .replace(/^###### (.*$)/gm, '<h6 class="text-base font-bold my-2">$1</h6>')

            .replace(/((?:^\d+\.\s.+$\n?)+)/gm, (match) => {
                // Process ordered list items (only lines with text after the number)
                const items = match
                    .trim()
                    .split("\n")
                    .map(item => `<li class="py-1">${item.replace(/^\d+\.\s/, '')}</li>`)
                    .join('');
                return `<ol class="list-decimal ml-12 py-2">${items}</ol>`;
            })
            .replace(/((?:^\-\s.+$\n?)+)/gm, (match) => {
                // Process unordered list items (only lines with text after the dash)
                const items = match
                    .trim()
                    .split("\n")
                    .map(item => `<li class="py-1">${item.replace(/^\-\s/, '')}</li>`)
                    .join('');
                return `<ul class="list-disc ml-12 py-2">${items}</ul>`;
            })

            // Links
            .replace(/\[([^\]]+)\]\[([^\]]+)\]/g, '<a href="$2" class="text-blue-400 hover:underline">$1</a>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:underline">$1</a>')

            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')

            // Italic
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

            // Strikethrough
            .replace(/~~(.*?)~~/g, '<del>$1</del>')

            // Inline code
            .replace(/`(.*?)`/g, '<code class="bg-neutral-900 text-white px-2 py-1 rounded">$1</code>')

            // Horizontal rule
            .replace(/^\s*---\s*$/gm, '<hr class="border-scheme-500 border-opacity-50 border-t-2 mt-4 mb-4" />')

            // Replace double-newlines with <br> tags
            .replace(/\n\n/g, '<br>')

            // When the only content on the line is a double space, replace it with a <br> tag
            .replace(/^(  )$/gm, '<br><br>')

            // Replace two trailing spaces with <br> tags
            .replace(/  $/gm, '<br>')
            ;

        // Step 3: Reinsert code blocks
        codeBlocks.forEach((block, index) => {
            html = html.replace(`[[CODEBLOCK_${index}]]`, block);
        });

        return html;
    }

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
                setTitle(response.data.name || "");
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

    // Save document function
    const saveDocument = async () => {
        try {
            const contentResponse = await axiosInstance.patch(`/document/${documentId}/content`,
                {
                    content: String(content)
                }
            );
            console.log("Document Content Response:", contentResponse.data);
            const nameResponse = await axiosInstance.patch(`/document/${documentId}/name`,
                {
                    newName: String(title)
                }
            );
            console.log("Document Name Response:", nameResponse.data);
        } catch (err) {
            console.error("Failed to save document:", err);
            alert("Failed to save document");
        }
    };

    // Delete document function
    const deleteDocument = async () => {
        try {
            const response = await axiosInstance.delete(`/document/${documentId}/delete`);
            console.log("Document Deletion Response:", response.data);
            window.location.href = "/dashboard";
        } catch (err) {
            console.error("Failed to delete document:", err);
            alert("Failed to delete document");
        }
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        const lineNumbers = lineNumbersRef.current;

        if (textarea && lineNumbers) {
            const syncScroll = () => {
                lineNumbers.scrollTop = textarea.scrollTop;
            };

            textarea.addEventListener('scroll', syncScroll);

            return () => {
                textarea.removeEventListener('scroll', syncScroll);
            };
        }
    }, []);

    return (
        <div className="flex flex-col h-screen bg-scheme-250">
            {/* Top Bar */}
            <div className="flex px-16 py-6 justify-between items-center bg-scheme-200 shadow-md">
                <div className="flex items-center space-x-8">
                    {/* Back Button */}
                    <BackToDashboard />
                    {/* Save Document */}
                    <button
                        onClick={saveDocument}
                        className="flex px-8 py-3 items-center bg-saveGreen hover:bg-scheme-500 rounded-lg p-2 transition-colors duration-200 text-scheme-100"
                    >
                        <Save size={24} />
                        <span className="ml-4 text-medium font-medium">Save</span>
                    </button>
                </div>
                {/* Editable Document Title */}
                <input
                    type="text"
                    className="w-1/2 px-4 py-2 bg-scheme-100 text-scheme-500 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-scheme-300"
                    placeholder="Document Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {/* Delete Document */}
                <button
                    onClick={() => deleteDocument()}
                    className="flex px-8 py-3 items-center bg-backRed hover:bg-scheme-500 rounded-lg p-2 transition-colors duration-200 text-scheme-100"
                >
                    <Trash2 size={24} />
                    <span className="ml-4 text-medium font-medium">Delete Document</span>
                </button>
                {/* User Info */}
                <HeaderUserButton />
            </div>

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Preview Panel */}
                <div
                    className="w-1/2 px-32 mt-4 pt-4 text-scheme-500 bg-scheme-200 overflow-y-auto shadow-md prose prose-lg"
                    dangerouslySetInnerHTML={{ __html: preview }}
                />
                {/* Editor Panel with Line Numbers */}
                <div className="w-1/2 flex bg-scheme-100 mt-4">
                    <div
                        ref={lineNumbersRef}
                        className="w-12 bg-scheme-250 text-right pr-2 py-4 select-none text-scheme-400 overflow-y-hidden"
                    >
                        {content.split('\n').map((_, index) => (
                            <div key={index} className="font-mono text-base h-[1.5rem]">
                                {index + 1}
                            </div>
                        ))}
                    </div>
                    <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="flex-1 resize-none p-4 font-mono text-base bg-scheme-100 text-scheme-500 focus:outline-none focus:ring-2 focus:ring-scheme-300 overflow-y-auto"
                        placeholder="Type your Markdown here..."
                    />
                </div>
            </div>
        </div>
    );
}

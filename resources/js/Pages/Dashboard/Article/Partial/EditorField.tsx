import { EditorContent } from '@tiptap/react';
import React, { useEffect, useRef, useState } from 'react';
import ArticleButton from './ArticleButton';

interface EditorFieldProps {
    editorId: 'title' | 'content';
    editor: any;
    activeEditor: string | null;
    setActiveEditor: (id: 'title' | 'content' | null) => void;
    onAddImage?: (file: File) => void;
}

const EditorField: React.FC<EditorFieldProps> = ({ editorId, editor, activeEditor, setActiveEditor, onAddImage }) => {
    const [toolbarActive, setToolbarActive] = useState<boolean>(true);
    const [hoverToolbar, setHoverToolbar] = useState<boolean>(false);
    const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

    const handleBlur = () => {
        if (!hoverToolbar) setActiveEditor(null);
    };

    useEffect(() => {
        if (!editor) return;

        const handleUpdate = () => {
            setToolbarActive(true);

            if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

            typingTimerRef.current = setTimeout(() => {
                if (!hoverToolbar) setToolbarActive(false);
            }, 500);
        };

        editor.on('update', handleUpdate);

        return () => {
            editor.off('update', handleUpdate);
            if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
        };
    }, [editor, hoverToolbar]);

    return (
        <div className="relative">
            {activeEditor === editorId && (
                <div
                    className={`absolute top-0 right-0 z-10 transition-all duration-300 ease-in-out
                         ${toolbarActive ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-2 pointer-events-none'}`}
                    onMouseEnter={() => setHoverToolbar(true)}
                    onMouseLeave={() => setHoverToolbar(false)}
                >
                    <ArticleButton editor={editor} onAddImage={onAddImage} />
                </div>
            )}

            <EditorContent
                editor={editor}
                onFocus={() => setActiveEditor(editorId)}
                onBlur={handleBlur}
                className={`editor-no-outline w-full px-2 py-2 ${
                    editorId === 'title' ? 'text-4xl min-h-[80px] leading-snug' : 'text-xl min-h-[200px] leading-relaxed'
                }`}
            />
        </div>
    );
};

export default EditorField;

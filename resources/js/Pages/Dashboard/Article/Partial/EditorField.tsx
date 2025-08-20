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
    const typingTimerRef = useRef<NodeJS.Timeout | null>(null)
    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null)

    const handleBlur = () => {
        if (!hoverToolbar) setActiveEditor(null);
    };

    useEffect(() => {
        if (!editor) return;

        const updateMenu = () => {
            setToolbarActive(true);

            if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
            typingTimerRef.current = setTimeout(() => {
                if (!hoverToolbar) setToolbarActive(false);
            }, 500);

            const { view } = editor;
            const { from, to } = view.state.selection;

            const start = view.coordsAtPos(from);
            const end = view.coordsAtPos(to);

            const box = {
                top: Math.min(start.top, end.top),
                bottom: Math.max(start.bottom, end.bottom),
                left: Math.min(start.left, end.left),
                right: Math.max(start.right, end.right),
            };

            const editorEl = view.dom as HTMLElement;
            const editorBox = editorEl.getBoundingClientRect();

            setMenuPosition({
                top: box.top - editorBox.top - 40,
                left: (box.left + box.right) / 2 - editorBox.left,
            });
        };

        editor.on("update", updateMenu);
        editor.on("selectionUpdate", updateMenu);

        return () => {
            editor.off("update", updateMenu);
            editor.off("selectionUpdate", updateMenu);
            if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
        };
    }, [editor, hoverToolbar]);

    return (
        <div className="relative">
            {activeEditor === editorId && menuPosition && (
                <div
                    className={`absolute z-50 -translate-x-1/2 transition-all duration-300 ease-in-out
                     ${toolbarActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                    style={{
                        top: menuPosition.top,
                        left: menuPosition.left,
                    }}
                    onMouseEnter={() => setHoverToolbar(true)}
                    onMouseLeave={() => setHoverToolbar(false)}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <ArticleButton editor={editor} onAddImage={onAddImage} editorId={editorId} />
                </div>
            )}

            <EditorContent
                editor={editor}
                onFocus={() => setActiveEditor(editorId)}
                onBlur={handleBlur}
                className={`editor-no-outline w-full px-2 py-2 ${editorId === 'title'
                    ? 'text-4xl min-h-[80px] leading-snug'
                    : 'text-xl min-h-[200px] leading-relaxed'
                    }`}
            />
        </div>
    );
};

export default EditorField;

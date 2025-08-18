import Button from '@/Components/Button'
import { Editor } from '@tiptap/react'
import React, { useState } from 'react'
import { FaBold, FaItalic, FaPlus } from 'react-icons/fa6'
import { IoMdImage } from 'react-icons/io'
import { RxCross1 } from 'react-icons/rx'

interface ToolbarButtonProps {
    index: number
    active: boolean
    onClick: () => void
    children: React.ReactNode
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ index, active, onClick, children }) => (
    <Button
        onClick={onClick}
        type='button'
        className={`rounded-lg text-white transition-all duration-300 ease-in-out
      ${active ? 'opacity-100 scale-100 pointer-events-auto ' : 'opacity-0 scale-0 pointer-events-none'}`}
        style={{ transitionDelay: `${index * 50}ms` }}
    >
        {children}
    </Button>
)

interface ArticleButtonProps {
    editor: Editor | null;
    index?: number;
    onAddImage?: (file: File) => void
}

const ArticleButton: React.FC<ArticleButtonProps> = ({ editor, index, onAddImage }) => {
    const [toolbar, setToolbar] = useState(false);

    const handleToolButton = () => setToolbar(!toolbar);

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;

            const tempUrl = URL.createObjectURL(file);
            editor?.chain().focus().setImage({ src: tempUrl }).run();

            onAddImage?.(file);
        };

        input.click();
    };

    return (
        <div className='flex flex-row-reverse items-center gap-9'>
            <Button
                type='button'
                className={`font-bold flex py-2 px-2 rounded-full transition-all duration-300 ease-in-out ${toolbar ? 'rotate-90 bg-white text-black' : 'text-white bg-black rotate-0 scale-100'
                    }`}
                onClick={handleToolButton}
            >
                {toolbar ? <RxCross1 /> : <FaPlus />}
            </Button>

            <ToolbarButton index={0} active={toolbar} onClick={() => editor?.chain().focus().toggleBold().run()}>
                <FaBold />
            </ToolbarButton>
            <ToolbarButton index={1} active={toolbar} onClick={() => editor?.chain().focus().toggleItalic().run()}>
                <FaItalic />
            </ToolbarButton>
            <ToolbarButton index={2} active={toolbar} onClick={handleImageUpload}>
                <IoMdImage />
            </ToolbarButton>
        </div>
    );
};

export default ArticleButton;

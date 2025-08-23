import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import Image from '@tiptap/extension-image'
import EditorField from './Partial/EditorField'
import { useState } from 'react'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { Link, useForm } from '@inertiajs/react'
import Button from '@/Components/Button'
import ArticleLayout from '@/Layouts/ArticleLayout'


const breadcrumbs = [
    { name: 'Articles', href: '/articles' },
    { name: 'Create' }
]

const Create = () => {
    const [activeEditor, setActiveEditor] = useState<'title' | 'content' | null>(null)
    const { data, setData, post, processing, errors } = useForm({
        title_article: '',
        article_text_content: '',
        images: [] as File[],
    });

    const titleEditor = useEditor({
        extensions: [StarterKit,
            Image,
            Placeholder.configure({ placeholder: 'Title' })],
        onUpdate: ({ editor }) => setData('title_article', editor.getText().trim())
    });

    const contentEditor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Placeholder.configure({ placeholder: 'Write content...' }),
        ],
        onUpdate: ({ editor }) => setData('article_text_content', editor.getHTML()),
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

         console.log("Submitting with data:", data)

        const formData = new FormData();
        formData.append('title_article', data.title_article);
        formData.append('article_text_content', data.article_text_content);

        data.images.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        post(route('articles.store'), {
            data: formData
        })
    }

    return (
        <ArticleLayout header={
            <div className="flex items-center justify-between ">
                <h2 className="font-semibold text-2xl text-gray-800">Create Article</h2>

                <div className='flex items-center gap-10 justify-end'>
                    <Button
                        type="submit"
                        form="articleForm"
                        process={processing}
                        className="px-6 py-2 rounded-lg bg-black text-white hover:bg-fuchsia-400 transition"
                    >
                        Save
                    </Button>
                    <Link href={route('articles.index')} className="text-gray-600">
                        Cancel
                    </Link>
                </div>
            </div>
        } breadcrumbs={breadcrumbs}>
            <div className='w-full '>
                <form onSubmit={submit} id='articleForm' className='space-y-10'>
                    <EditorField
                        editorId="title"
                        editor={titleEditor}
                        activeEditor={activeEditor}
                        setActiveEditor={setActiveEditor}
                    />

                    <EditorField
                        editorId="content"
                        editor={contentEditor}
                        activeEditor={activeEditor}
                        setActiveEditor={setActiveEditor}
                        onAddImage={(file) => setData('images', [...data.images, file])}
                    />
                </form>
            </div>
        </ArticleLayout >
    )
}

export default Create

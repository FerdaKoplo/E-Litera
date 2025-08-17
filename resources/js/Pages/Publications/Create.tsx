import Input from '@/Components/Input'
import Label from '@/Components/Label'
import Button from '@/Components/Button'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { useForm, Link } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { Alert, AlertTitle, AlertDescription } from '@/Components/ui/alert'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

interface Props {
    categories: { id: number; name: string }[]
    locations: { id: number; name: string }[]
}

const breadcrumbs = [
    { name: 'Publications', href: '/publications' },
    { name: 'Create' }
]

const Create: React.FC<Props> = ({ categories, locations }) => {
    const [showDraftAlert, setShowDraftAlert] = useState(false)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const { data, setData, post, processing, errors } = useForm<{
        title: string
        author: string
        type: string
        category_id: string
        location_id: string
        download_count: string
        pdf_url: string | File
        image_url: string | File
    }>({
        title: '',
        author: '',
        type: '',
        category_id: '',
        location_id: '',
        download_count: '',
        pdf_url: '',
        image_url: ''
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('publications.store'), {
            onSuccess: () => localStorage.removeItem('publicationDraft'),
            forceFormData: true,
        })
    }

    const saveDraft = () => {
        localStorage.setItem('publicationDraft', JSON.stringify(data))
        setShowDraftAlert(true)
        setTimeout(() => setShowDraftAlert(false), 3000)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setData("image_url", file)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        const savedDraft = localStorage.getItem('publicationDraft')
        if (savedDraft) setData(JSON.parse(savedDraft))
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem('publicationDraft', JSON.stringify(data))
            setShowDraftAlert(true)
            const hideTimeoutAlert = setTimeout(() => setShowDraftAlert(false), 5000)
            return () => clearTimeout(hideTimeoutAlert)
        }, 5000)

        return () => clearTimeout(timeout)
    }, [data])

    return (
        <DashboardLayout header={<h2 className="font-semibold text-2xl text-gray-800">Create Publication</h2>} breadcrumbs={breadcrumbs}>
            {showDraftAlert && (
                <Alert className="fixed top-4 right-4 w-80 bg-black text-white border-none shadow-lg">
                    <AlertTitle>Draft Saved</AlertTitle>
                    <AlertDescription>Your draft has been saved automatically.</AlertDescription>
                </Alert>
            )}

            <form onSubmit={submit} className="space-y-10 w-full">
                {/* Title */}
                <div className='flex gap-10 w-full max-w-5xl'>
                    <div className='flex-1 max-w-xl space-y-6'>
                        <div className="flex flex-col gap-2">
                            <Label forInput="title" value="Title" />
                            <Input
                                id="title"
                                name="title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-fuchsia-400" isFocused={false} />
                            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                        </div>

                        {/* Author */}
                        <div className="flex flex-col gap-2">
                            <Label forInput="author" value="Author" />
                            <Input
                                id="author"
                                name="author"
                                value={data.author}
                                onChange={e => setData('author', e.target.value)}
                                className="w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-fuchsia-400" isFocused={false} />
                            {errors.author && <div className="text-red-500 text-sm mt-1">{errors.author}</div>}
                        </div>

                        {/* Type */}
                        <div className="flex flex-col gap-2">
                            <Label forInput="type" value="Type" />
                            <Select
                                value={data.type}
                                onValueChange={value => setData('type', value)}
                            >
                                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-fuchsia-400">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ebook">Ebook</SelectItem>
                                    <SelectItem value="physical">Physical</SelectItem>
                                    <SelectItem value="journal">Journal</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
                        </div>

                        {/* Category */}
                        <div className="flex flex-col gap-2">
                            <Label forInput="category_id" value="Category" />
                            <Select
                                value={data.category_id || ""}
                                onValueChange={value => setData('category_id', value)}
                            >
                                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-fuchsia-400">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(categories ?? []).map(category => (
                                        <SelectItem key={category.id} value={String(category.id)}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>

                            </Select>
                            {errors.category_id && <div className="text-red-500 text-sm mt-1">{errors.category_id}</div>}
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-2">
                            <Label forInput="location_id" value="Location (optional)" />
                            <Select
                                value={data.location_id || ""}
                                onValueChange={value => setData('location_id', value)}
                            >
                                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-fuchsia-400">
                                    <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(locations ?? []).map(location => (
                                        <SelectItem key={location.id} value={String(location.id)}>
                                            {location.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.location_id && <div className="text-red-500 text-sm mt-1">{errors.location_id}</div>}
                        </div>
                    </div>
                    <div className='flex-1 max-w-xl gap-5 space-y-6'>
                        {/* PDF URL */}
                        <div className="flex flex-col gap-2">
                            <Label forInput="pdf_url" value="PDF File (for Ebook/Journal)" />
                            <Input
                                id="pdf_url"
                                type="file"
                                accept="application/pdf"
                                onChange={e => setData('pdf_url', e.target.files ? e.target.files[0] : '')}
                                className="  w-full border border-gray-300 rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                                     file:text-sm file:font-semibold file:bg-fuchsia-100 file:text-fuchsia-700 hover:file:bg-fuchsia-200 transition"
                                isFocused={false} />
                            {errors.pdf_url && <div className="text-red-500 text-sm mt-1">{errors.pdf_url}</div>}
                        </div>

                        {/* Image Upload + Preview */}
                        <div className="flex flex-col gap-2">
                            <Label forInput="image_url" value="Cover Image" />
                            <Input
                                id="image_url"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full border border-gray-300 rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm
                                    file:font-semibold file:bg-fuchsia-100 file:text-fuchsia-700 hover:file:bg-fuchsia-200 transition"
                                isFocused={false}
                            />
                            {previewImage && (
                                <div className="mt-4">
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-full h-64 object-cover rounded-lg border shadow"
                                    />
                                </div>
                            )}
                            {errors.image_url && <div className="text-red-500 text-sm mt-1">{errors.image_url}</div>}
                        </div>
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <Button
                        type="button"
                        process={processing}
                        className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                        onClick={saveDraft}
                    >
                        Save Draft
                    </Button>

                    <Button
                        type="submit"
                        process={processing}
                        className="px-6 py-2 rounded-lg bg-black text-white hover:bg-fuchsia-400 transition"
                    >
                        Save
                    </Button>

                    <Link href={route('publications.index')} className="text-gray-600">
                        Cancel
                    </Link>
                </div>
            </form>
        </DashboardLayout>
    )
}

export default Create

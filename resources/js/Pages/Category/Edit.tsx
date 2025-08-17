import Input from '@/Components/Input'
import Label from '@/Components/Label'
import Button from '@/Components/Button'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { useForm, Link } from '@inertiajs/react'
import React, { useState, useEffect } from 'react'
import { Alert, AlertTitle, AlertDescription } from '@/Components/ui/alert'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

interface Props {
    category: {
        id: number
        name: string
        type: string
        parent_category_id?: number | null
    }
    categories: { id: number; name: string }[]
}

const breadcrumbs = [
    { name: 'Categories', href: '/categories' },
    { name: 'Edit' }
]

const Edit: React.FC<Props> = ({ category, categories }) => {

    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        type: category.type || 'book',
        parent_category_id: category.parent_category_id || ''
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('categories.update', category.id))
    }

    return (
        <DashboardLayout header={<h2 className="font-semibold text-2xl text-gray-800">Edit Category</h2>} breadcrumbs={breadcrumbs}>
            <form onSubmit={submit} className="space-y-6 max-w-xl">
                {/* Name */}
                <div className='flex flex-col gap-2'>
                    <Label forInput="name" value="Name" />
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        isFocused
                        className='w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-fuchsia-400'
                    />
                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                </div>

                {/* Type */}
                <div className='flex flex-col gap-2'>
                    <Label forInput="type" value="Type" />
                    <Select
                        value={data.type}
                        onValueChange={value => setData('type', value)}
                    >
                        <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-fuchsia-400">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="book">Book</SelectItem>
                            <SelectItem value="journal">Journal</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
                </div>

                {/* Parent Category */}
                <div className='flex flex-col gap-2'>
                    <Label forInput="parent_category_id" value="Parent Category (optional)" />
                    <Select
                        value={data.parent_category_id ? String(data.parent_category_id) : ""}
                        onValueChange={value => setData('parent_category_id', Number(value))}
                    >
                        <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-fuchsia-400">
                            <SelectValue placeholder="None" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(cat => (
                                <SelectItem key={cat.id} value={String(cat.id)}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.parent_category_id && <div className="text-red-500 text-sm mt-1">{errors.parent_category_id}</div>}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <Button
                        type="submit"
                        process={processing}
                        className="px-6 py-2 rounded-lg bg-black text-white hover:bg-fuchsia-400 transition"
                    >
                        Save Changes
                    </Button>

                    <Link href={route('categories.index')} className="text-gray-600 ">
                        Cancel
                    </Link>
                </div>
            </form>
        </DashboardLayout>
    )
}

export default Edit

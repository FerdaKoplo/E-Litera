import Input from '@/Components/Input'
import Label from '@/Components/Label'
import Button from '@/Components/Button'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { useForm, Link } from '@inertiajs/react'
import React from 'react'

interface Props {
    categories: { id: number; name: string }[]
}

const breadcrumbs = [
    { name: 'Categories', href: '/categories' },
    { name: 'Create', href: '/categories/create' }
]

const Create: React.FC<Props> = ({ categories }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'book',
        parent_category_id: ''
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('categories.store'))
    }

    return (
        <DashboardLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Category</h2>} breadcrumbs={breadcrumbs}>
            <form onSubmit={submit} className="space-y-6 max-w-xl">
                <div>
                    <Label forInput="name" value="Name" />
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        isFocused
                    />
                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                </div>

                <div>
                    <Label forInput="type" value="Type" />
                    <select
                        id="type"
                        name="type"
                        value={data.type}
                        onChange={e => setData('type', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
                    >
                        <option value="book">Book</option>
                        <option value="journal">Journal</option>
                    </select>
                    {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
                </div>

                <div>
                    <Label forInput="parent_category_id" value="Parent Category (optional)" />
                    <select
                        id="parent_category_id"
                        name="parent_category_id"
                        value={data.parent_category_id}
                        onChange={e => setData('parent_category_id', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
                    >
                        <option value="">None</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.parent_category_id && (
                        <div className="text-red-500 text-sm mt-1">{errors.parent_category_id}</div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <Button type="submit" process={processing} className="bg-blue-600 text-white hover:bg-blue-700">
                        Save
                    </Button>
                    <Link href={route('categories.index')} className="text-gray-600 hover:underline">
                        Cancel
                    </Link>
                </div>
            </form>
        </DashboardLayout>
    )
}

export default Create

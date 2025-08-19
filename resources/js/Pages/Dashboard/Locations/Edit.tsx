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
    location: {
        id: number
        name: string
    }
}

const breadcrumbs = [
    { name: 'Locations', href: '/locations' },
    { name: 'Edit' }
]

const Edit: React.FC<Props> = ({ location} ) => {

    const { data, setData, put, processing, errors } = useForm({
        name: location.name || '',
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('locations.update', location.id))
    }

    return (
        <DashboardLayout header={<h2 className="font-semibold text-2xl text-gray-800">Edit Category</h2>} breadcrumbs={breadcrumbs}>
            <form onSubmit={submit} className="space-y-6 max-w-xl">
                {/* Name */}
                <div className='flex flex-col gap-2'>
                    <Label forInput="name" value="Bookshelf Location Name" />
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


                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <Button
                        type="submit"
                        process={processing}
                        className="px-6 py-2 rounded-lg bg-black text-white hover:bg-fuchsia-400 transition"
                    >
                        Save Changes
                    </Button>

                    <Link href={route('locations.index')} className="text-gray-600 ">
                        Cancel
                    </Link>
                </div>
            </form>
        </DashboardLayout>
    )
}

export default Edit

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


const breadcrumbs = [
    { name: 'Locations', href: '/locations' },
    { name: 'Create' }
]

const Create = () => {
    const [showDraftAlert, setShowDraftAlert] = useState(false)
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('locations.store'), {
            onSuccess: () => localStorage.removeItem('locationDraft')
        })
    }

    const saveDraft = () => {
        localStorage.setItem('locationDraft', JSON.stringify(data))
        setShowDraftAlert(true)
        setTimeout(() => setShowDraftAlert(false), 3000)
    }

    useEffect(() => {
        const savedDraft = localStorage.getItem('locationDraft')
        if (savedDraft) setData(JSON.parse(savedDraft))
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem('locationDraft', JSON.stringify(data))
            setShowDraftAlert(true)
            const hideTimeoutAlert = setTimeout(() => setShowDraftAlert(false), 5000)
            return () => clearTimeout(hideTimeoutAlert)
        }, 5000)

        return () => clearTimeout(timeout)
    }, [data])

    return (
        <DashboardLayout header={<h2 className="font-semibold text-2xl text-gray-800">Create Location</h2>} breadcrumbs={breadcrumbs}>
            {showDraftAlert && (
                <Alert className="fixed top-4 right-4 w-80 bg-black text-white border-none shadow-lg">
                    <AlertTitle>Draft Saved</AlertTitle>
                    <AlertDescription>Your draft has been saved automatically.</AlertDescription>
                </Alert>
            )}
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

                    <Link href={route('locations.index')} className="text-gray-600">
                        Cancel
                    </Link>
                </div>
            </form>
        </DashboardLayout>
    )
}

export default Create

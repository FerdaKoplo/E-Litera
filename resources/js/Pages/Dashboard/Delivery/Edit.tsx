import Input from '@/Components/Input'
import Label from '@/Components/Label'
import Button from '@/Components/Button'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { useForm, Link } from '@inertiajs/react'
import React from 'react'
import { Alert, AlertTitle, AlertDescription } from '@/Components/ui/alert'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { Card, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { toast } from 'sonner'

interface Props {
    delivery: {
        id: number
        status: string
        courier?: string | null
        tracking_number?: string | null
        loan: {
            user: {
                id: number
                name: string
                email: string
                address?: {
                    full_address?: string

                    province_name?: string

                    city_name?: string

                    district_name?: string

                    sub_district_name?: string

                    postal_code?: string

                    created_at: string
                    updated_at: string
                }
            }
            publication: {
                id: number
                title: string
            }
        }
    }
}

const breadcrumbs = [
    { name: 'Deliveries', href: '/delivery' },
    { name: 'Edit' }
]

const Edit: React.FC<Props> = ({ delivery }) => {

    const { data, setData, put, processing, errors } = useForm({
        status: delivery.status || 'pending',
        courier: delivery.courier || '',
        tracking_number: delivery.tracking_number || ''
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('delivery.update', delivery.id), {
            onSuccess: () => toast.success("Delivery updated successfully"),
        })
    }

    return (
        <DashboardLayout header={<h2 className="font-semibold text-2xl text-gray-800">Edit Delivery</h2>} breadcrumbs={breadcrumbs}>
            <div className="space-y-6 max-w-2xl">
                {/* Delivery Information Card */}
                <Card className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <CardHeader>
                        <CardTitle>
                            <h3 className="text-lg font-medium text-gray-900 ">Delivery Information</h3>
                        </CardTitle>
                    </CardHeader>
                    <CardHeader>
                        <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
                            <CardDescription className='space-y-2'>
                                <CardTitle>
                                    <span className="font-medium text-gray-800">User:</span>
                                </CardTitle>
                                <p className="">{delivery.loan.user.name}</p>
                                <p className="">{delivery.loan.user.email}</p>

                            </CardDescription>
                            <CardDescription className='space-y-2'>
                                <CardTitle>
                                    <span className="text-gray-800 font-medium">Publication:</span>
                                </CardTitle>

                                <p className="">{delivery.loan.publication.title}</p>
                            </CardDescription>

                            <CardDescription className='space-y-2'>
                                <CardTitle>
                                    <span className="text-gray-800 font-medium">Address:</span>
                                </CardTitle>
                                <p>
                                    {delivery.loan?.user?.address?.full_address ?? ''}, {delivery.loan?.user?.address?.district_name ?? ''}, {delivery.loan?.user?.address?.city_name ?? ''}, {delivery.loan?.user?.address?.province_name ?? ''}
                                </p>
                            </CardDescription>

                        </div>
                    </CardHeader>

                </Card>

                <form onSubmit={submit} className="space-y-6">
                    {/* Status */}
                    <div className='flex flex-col gap-2'>
                        <Label forInput="status" value="Status" />
                        <Select
                            value={data.status}
                            onValueChange={value => setData('status', value)}
                        >
                            <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-fuchsia-400">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
                    </div>

                    {/* Courier */}
                    <div className='flex flex-col gap-2'>
                        <Label forInput="courier" value="Courier (optional)" />
                        <Input
                            id="courier"
                            name="courier"
                            value={data.courier}
                            onChange={e => setData('courier', e.target.value)}
                            placeholder="e.g., JNE, J&T, SiCepat"
                            className='w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-fuchsia-400'
                        />
                        {errors.courier && <div className="text-red-500 text-sm mt-1">{errors.courier}</div>}
                    </div>

                    {/* Tracking Number */}
                    <div className='flex flex-col gap-2'>
                        <Label forInput="tracking_number" value="Tracking Number (optional)" />
                        <Input
                            id="tracking_number"
                            name="tracking_number"
                            value={data.tracking_number}
                            onChange={e => setData('tracking_number', e.target.value)}
                            placeholder="Enter tracking number"
                            className='w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-fuchsia-400'
                        />
                        {errors.tracking_number && <div className="text-red-500 text-sm mt-1">{errors.tracking_number}</div>}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-4">
                        <Button
                            type="submit"
                            process={processing}
                            className="px-6 py-2 rounded-lg bg-black text-white hover:bg-fuchsia-400 transition"
                        >
                            Update Delivery
                        </Button>

                        <Link href={route('delivery.index')} className="text-gray-600">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}

export default Edit

import Button from '@/Components/Button'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import { locationColumns } from '@/Constant/columns'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const breadcrumbs = [
    { name: 'Locations', href: '/locations' },
]


const Index = () => {

    const { locations } = usePage<
        PageProps<{ locations: LaravelPagination<Location> }>
    >().props

    return (
        <DashboardLayout header={
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Location</h1>
                <Link href="/locations/create">
                    <Button type="button" className="text-white rounded-lg">
                        + Add Location
                    </Button>
                </Link>
            </div>
        } breadcrumbs={breadcrumbs} >
            <div>
                <DataTable columns={locationColumns} data={locations} />
            </div>
        </DashboardLayout>
    )
}

export default Index

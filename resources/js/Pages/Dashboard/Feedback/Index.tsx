import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import { feedbackColumns } from '@/Constant/columns'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import React from 'react'

const breadcrumbs = [
    { name: 'Feedback', href: '/feedback' },
]

const Index = () => {
    const { feedbacks } = usePage<
        PageProps<{ feedbacks: LaravelPagination<Feedback> }>
    >().props

    return (
        <DashboardLayout header={
            <h1 className="text-2xl font-semibold">Feedback</h1>
        } breadcrumbs={breadcrumbs}>
            <div>
                <DataTable data={feedbacks} columns={feedbackColumns} />
            </div>

        </DashboardLayout>
    )
}

export default Index

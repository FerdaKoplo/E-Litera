import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import { loanColumns } from '@/Constant/columns'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import React from 'react'

const breadcrumbs = [
    { name: 'Loans', href: '/loans' },
]

const Index = () => {

    const { loans } = usePage<
        PageProps<{ loans: LaravelPagination<Loan> }>
    >().props


    return (
        <DashboardLayout header={
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Loans</h1>
            </div>
        } breadcrumbs={breadcrumbs}>
            <div>
                <div>
                    <DataTable columns={loanColumns} data={loans} />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Index

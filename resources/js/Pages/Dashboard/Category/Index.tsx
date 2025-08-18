import Button from '@/Components/Button'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import DataTable, { LaravelPagination } from './Partial/DataTable'
import { categoryColumns } from '@/Constant/columns'

const breadcrumbs = [
    { name: 'Categories', href: '/categories' },
]

const Index = () => {
    const { categories } = usePage<
        PageProps<{ categories: LaravelPagination<Category> }>
    >().props

    return (
        <div>
            <DashboardLayout
                header={
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">Categories</h1>
                        <Link href="/categories/create">
                            <Button type="button" process={false} className="text-white rounded-lg">
                                + Add Category
                            </Button>
                        </Link>
                    </div>
                }

                breadcrumbs={breadcrumbs}>

                <div className='flex flex-col  items-center w-full'>

                    {/* Table */}
                    <DataTable<Category>
                        columns={categoryColumns}
                        data={categories}
                    />
                </div>
            </DashboardLayout>
        </div>
    )
}

export default Index

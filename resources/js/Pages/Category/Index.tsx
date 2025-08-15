import Button from '@/Components/Button'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import DataTable, { LaravelPagination } from './Partial/DataTable'
import { categoryColumns } from '@/types/columns'

const Index = () => {
    const { categories } = usePage<
        PageProps<{ categories: LaravelPagination<Category> }>
    >().props
    return (
        <div>
            <DashboardLayout header={<h1>Categories</h1>} >
                <div className='flex flex-col  items-center w-full'>

                    {/* Button Navigate */}
                    <Link href={'/categories/create'}>
                        <Button type='button' process={false} className='text-white'>
                            + Add Category
                        </Button>
                    </Link>

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

import Button from '@/Components/Button'
import { PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { categoryColumns } from '@/Constant/columns'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import DashboardLayout from '@/Layouts/DasboardLayout'

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

                <div className='flex flex-col  '>

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

import Button from '@/Components/Button'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { Link, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import DataTable, { LaravelPagination } from './Partial/DataTable'
import { publicationsColumns } from '../Constant/columns'


const breadcrumbs = [
    { name: 'Publications', href: '/publications' },
]

const Index = () => {
     const { publications } = usePage<
            PageProps<{ publications: LaravelPagination<Publications> }>
        >().props

    return (
        <DashboardLayout header={<div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Publications</h1>
            <Link href="/publications/create">
                <Button type="button" process={false} className="text-white">
                    + Add Publications
                </Button>
            </Link>
        </div>} breadcrumbs={breadcrumbs}>
            <DataTable columns={publicationsColumns} data={publications} />
        </DashboardLayout>
    )
}

export default Index

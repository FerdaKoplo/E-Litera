import Button from '@/Components/Button'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import { articleColumns } from '@/Constant/columns'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'

const breadcrumbs = [
    { name: 'Articles', href: '/articles' },
]

const Index = () => {
    const { articles } = usePage<
                PageProps<{ articles: LaravelPagination<Article> }>
            >().props

    return (
        <DashboardLayout header={<div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Articles</h1>
            <Link  href={route('articles.create')}>
                <Button  type="button"  className="bg-white border-violet-400 border-2 font-semibold hover:bg-violet-50 text-violet-400 rounded-lg">
                    + Add Article
                </Button>
            </Link>
        </div>} breadcrumbs={breadcrumbs}>
            <div>
                <DataTable columns={articleColumns} data={articles} />
            </div>
        </DashboardLayout>
    )
}

export default Index

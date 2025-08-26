import Button from '@/Components/Button'
import { PageProps } from '@/types'
import { Link, useForm, usePage } from '@inertiajs/react'
import { categoryColumns } from '@/Constant/columns'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import DashboardLayout from '@/Layouts/DasboardLayout'
import SearchBar from '@/Components/SearchInput'

const breadcrumbs = [
    { name: 'Categories', href: '/categories' },
]

const Index = () => {
    const { categories } = usePage<
        PageProps<{ categories: LaravelPagination<Category> }>
    >().props
    const { data, setData, get, processing } = useForm({
        search: '',
    })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        get(route('categories.index'), {
            preserveState: true,
            preserveScroll: true,
            data: { search: data.search, page: 1 }
        })
    }


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

                breadcrumbs={breadcrumbs} >

                <div className='flex flex-col gap-10'>

                    <SearchBar
                        onChange={(val) => setData("search", val)}
                        value={data.search}
                        onSubmit={handleSearch}
                        placeholder='Search Category...'
                        className=''
                        buttonLabel='Search' />

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

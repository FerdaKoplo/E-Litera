import Button from '@/Components/Button'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { Link, useForm, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import { publicationsColumns } from '@/Constant/columns'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import SearchBar from '@/Components/SearchInput'


const breadcrumbs = [
    { name: 'Publications', href: '/publications' },
]

const Index = () => {
    const { publications } = usePage<
        PageProps<{ publications: LaravelPagination<Publications> }>
    >().props

    const { data, setData, get, processing } = useForm({
        search: '',
    })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        get(route('publications.index'), {
            preserveState: true,
            preserveScroll: true,
            data: { search: data.search, page: 1 }
        })
    }

    return (
        <DashboardLayout header={<div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Publications</h1>
            <Link href="/publications/create">
                <Button type="button" process={false} className="text-white rounded-lg">
                    + Add Publications
                </Button>
            </Link>
        </div>} breadcrumbs={breadcrumbs}>

            <div className='flex flex-col gap-10'>
                <SearchBar
                    onChange={(val) => setData("search", val)}
                    value={data.search}
                    onSubmit={handleSearch}
                    placeholder='Search Publication...'
                    className=''
                    buttonLabel='Search' />
                <DataTable columns={publicationsColumns} data={publications} />
            </div>

        </DashboardLayout>
    )
}

export default Index

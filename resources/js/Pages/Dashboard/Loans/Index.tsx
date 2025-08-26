import SearchBar from '@/Components/SearchInput'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import { loanColumns } from '@/Constant/columns'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import React from 'react'

const breadcrumbs = [
    { name: 'Loans', href: '/loans' },
]

const Index = () => {

    const { loans } = usePage<
        PageProps<{ loans: LaravelPagination<Loan> }>
    >().props

    const { data, setData, get, processing } = useForm({
        search: '',
    })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        get(route('loans.index'), {
            preserveState: true,
            preserveScroll: true,
            data: { search: data.search, page: 1 }
        })
    }

    return (
        <DashboardLayout header={
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Loans</h1>
            </div>
        } breadcrumbs={breadcrumbs}>
            <div className='flex flex-col gap-10'>
                <SearchBar
                    onChange={(val) => setData("search", val)}
                    value={data.search}
                    onSubmit={handleSearch}
                    placeholder='Search By Name or Publication...'
                    className=''
                    buttonLabel='Search' />

                <DataTable columns={loanColumns} data={loans} />
            </div>
        </DashboardLayout>
    )
}

export default Index

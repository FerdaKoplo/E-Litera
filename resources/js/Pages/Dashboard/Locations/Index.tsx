import Button from '@/Components/Button'
import SearchBar from '@/Components/SearchInput'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import { locationColumns } from '@/Constant/columns'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { Link, useForm, usePage } from '@inertiajs/react'
import React from 'react'

const breadcrumbs = [
    { name: 'Locations', href: '/locations' },
]


const Index = () => {

    const { locations } = usePage<
        PageProps<{ locations: LaravelPagination<Location> }>
    >().props

    const { data, setData, get, processing } = useForm({
        search: '',
    })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        get(route('locations.index'), {
            preserveState: true,
            preserveScroll: true,
            data: { search: data.search, page: 1 }
        })
    }

    return (
        <DashboardLayout header={
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Location</h1>
                <Link href="/locations/create">
                    <Button type="button" className="text-white rounded-lg">
                        + Add Location
                    </Button>
                </Link>
            </div>
        } breadcrumbs={breadcrumbs}>
            <div className='flex flex-col gap-10'>
                <SearchBar
                    onChange={(val) => setData("search", val)}
                    value={data.search}
                    onSubmit={handleSearch}
                    placeholder='Search Location...'
                    className=''
                    buttonLabel='Search' />
                <DataTable columns={locationColumns} data={locations} />
            </div>
        </DashboardLayout>
    )
}

export default Index

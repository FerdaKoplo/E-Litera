import Button from '@/Components/Button'
import SearchBar from '@/Components/SearchInput'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import { locationColumns } from '@/Constant/columns'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { Link, useForm, usePage } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

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

    const [liveQuery, setLiveQuery] = useState<string>('');
    const [liveResults, setLiveResults] = useState<{ id: number; name: string; }[]>([]);
    const [showLiveResults, setShowLiveResults] = useState<boolean>(false);

    useEffect(() => {
        if (liveQuery.length === 0) {
            setLiveResults([]);
            setShowLiveResults(false);
            return;
        }

        const timeout = setTimeout(() => {
            axios
                .get('/locations/search', { params: { q: liveQuery } })
                .then((res) => {
                    setLiveResults(res.data);
                    setShowLiveResults(true);
                })
                .catch(() => {
                    setLiveResults([]);
                    setShowLiveResults(false);
                });
        }, 300);

        return () => clearTimeout(timeout);
    }, [liveQuery])

    return (
        <DashboardLayout header={
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Location</h1>
                <Link href="/locations/create">
                    <Button type="button" className="bg-white border-violet-400 border-2 hover:bg-violet-50 font-semibold text-violet-400 rounded-lg">
                        + Add Location
                    </Button>
                </Link>
            </div>
        } breadcrumbs={breadcrumbs}>
            <div className='flex flex-col gap-10'>
                <SearchBar
                    value={liveQuery}
                    onChange={(val) => {
                        setLiveQuery(val)
                        setData("search", val)
                    }}
                    onSubmit={handleSearch}
                    liveResults={liveResults}
                    showLiveResults={showLiveResults}
                    onSelectLiveResult={(item) => {
                        setData("search", item.name);
                        get(route('locations.index'), {
                            preserveState: true,
                            preserveScroll: true,
                            data: { search: item.name, page: 1 },
                        });
                        setLiveQuery('');
                    }}
                    renderResult={(item) => (
                        <>
                            {item.name}
                        </>
                    )}
                />
                <DataTable columns={locationColumns} data={locations} />
            </div>
        </DashboardLayout>
    )
}

export default Index

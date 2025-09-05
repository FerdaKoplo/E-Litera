import Label from '@/Components/Label'
import SearchBar from '@/Components/SearchInput'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import { Card, CardTitle } from '@/Components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/Components/ui/toggle-group'
import { feedbackColumns } from '@/Constant/columns'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { FiClock } from 'react-icons/fi'

const breadcrumbs = [
    { name: 'Feedback', href: '/feedback' },
]

const Index = () => {
    const { feedbacks } = usePage<
        PageProps<{ feedbacks: LaravelPagination<any> }>
    >().props

    const { data, setData, get } = useForm<{
        search: string
        page: number
        timeFilter: string | null
    }>({
        search: '',
        page: 1,
        timeFilter: null,
    })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        get(route('feedback.index'), {
            preserveState: true,
            preserveScroll: true,
            data: { search: data.search, page: 1 },
        })
    }

    const goToPage = (url: string | null) => {
        if (!url) return
        const query = url.includes('?') ? url.split('?')[1] : ''
        const params = new URLSearchParams(query)
        const nextPage = Number(params.get('page') || 1)
        setData('page', nextPage)
        get(route('feedback.index'), {
            preserveState: true,
            preserveScroll: true,
            data: { ...data, page: nextPage },
        })
    }

    const applyFilter = (overrideData?: typeof data) => {
        const payload = overrideData || data
        get(route('feedback.index'), {
            preserveState: true,
            preserveScroll: true,
            data: payload,
        })
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            applyFilter()
        }, 100)

        return () => clearTimeout(timeoutId)
    }, [data.timeFilter, data.page])

    return (
        <DashboardLayout
            header={<h1 className="text-2xl font-semibold">Feedback</h1>}
            breadcrumbs={breadcrumbs}
        >
            <div className="flex flex-col gap-5">
                <SearchBar
                    onChange={(val) => setData('search', val)}
                    value={data.search}
                    onSubmit={handleSearch}
                    placeholder="Search Feedback..."
                    buttonLabel="Search"
                />

                <Card className="p-4 bg-gradient-to-l from-violet-100 to-indigo-50 border shadow-sm rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <CardTitle className="text-xl">Time Filter</CardTitle>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-xs text-gray-500 font-medium flex items-center gap-2">
                            <FiClock className="text-gray-400" /> Time
                        </Label>
                        <ToggleGroup
                            type="single"
                            value={data.timeFilter ?? ''}
                            onValueChange={(val) => {
                                setData('timeFilter', val || null)
                                applyFilter()
                            }}
                            className="inline-flex bg-white border rounded-lg overflow-hidden"
                        >
                            <ToggleGroupItem
                                value="newest"
                                className="px-4 py-2 text-sm font-medium bg-white"
                            >
                                Newest
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="24h"
                                className="px-4 py-2 text-sm font-medium bg-white"
                            >
                                Last 24h
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </Card>

                <DataTable
                    data={feedbacks}
                    columns={feedbackColumns}
                    onPageChange={goToPage}
                />
            </div>
        </DashboardLayout>
    )
}

export default Index

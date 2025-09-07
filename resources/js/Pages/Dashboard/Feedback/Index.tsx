import Button from '@/Components/Button'
import Label from '@/Components/Label'
import SearchBar from '@/Components/SearchInput'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import { Card, CardTitle } from '@/Components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/Components/ui/toggle-group'
import { feedbackColumns } from '@/Constant/columns'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiClock } from 'react-icons/fi'
import { TbClock24, TbClockExclamation } from 'react-icons/tb'

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


    const [liveQuery, setLiveQuery] = useState<string>('');
    const [liveResults, setLiveResults] = useState<{ id: number; title: string; author: string; name: string; email: string; review: string }[]>([]);
    const [showLiveResults, setShowLiveResults] = useState<boolean>(false);

    useEffect(() => {
        if (liveQuery.length === 0) {
            setLiveResults([]);
            setShowLiveResults(false);
            return;
        }

        const timeout = setTimeout(() => {
            axios
                .get('/feedbacks/search', { params: { q: liveQuery } })
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
                    value={liveQuery}
                    onChange={(val) => {
                        setLiveQuery(val)
                        setData("search", val)
                    }}
                    onSubmit={handleSearch}
                    liveResults={liveResults}
                    showLiveResults={showLiveResults}
                    onSelectLiveResult={(item) => {
                        setData("search", item.title);
                        get(route('loans.index'), {
                            preserveState: true,
                            preserveScroll: true,
                            data: { search: item.title, page: 1 },
                        });
                        setLiveQuery('');
                    }}
                    renderResult={(item) => (
                        <div className="flex flex-col gap-1">
                            <div className="font-medium text-gray-900">
                                {item.title}
                                {item.author && (
                                    <span className="text-gray-500 text-sm ml-2">by {item.author}</span>
                                )}
                            </div>

                            <div className="text-sm text-gray-800">
                                {item.name}
                                {item.email && (
                                    <span className="text-gray-500 ml-2">({item.email})</span>
                                )}
                            </div>

                             <div className="text-xs italic text-gray-800">
                                Review :  {item.review}
                            </div>
                        </div>
                    )}
                />

                <Card className="p-4 bg-gradient-to-l from-violet-100 to-indigo-50 border shadow-sm rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <CardTitle className="text-xl">Time Filter</CardTitle>
                        {data.timeFilter && (
                            <Button
                                onClick={() => setData({ ...data, timeFilter: null })}
                                className="text-sm text-red-500 bg-white border border-red-300 hover:bg-red-50"
                            >
                                Clear all
                            </Button>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-xs text-gray-500 font-medium flex items-center gap-2">
                            <FiClock className="text-gray-400" /> Time
                        </Label>
                        <ToggleGroup
                            type="single"
                            value={data.timeFilter ?? ""}
                            onValueChange={(val) => {
                                setData("timeFilter", val || null)
                                applyFilter()
                            }}
                            className="inline-flex bg-white border rounded-lg overflow-hidden"
                        >
                            {[

                                { key: "newest", label: "Newest", icon: <TbClockExclamation className="text-black" /> },
                                { key: "24h", label: "Last 24 Hours", icon: <TbClock24 className="text-purple-500" /> },

                            ].map((item) => (
                                <ToggleGroupItem
                                    key={item.key}
                                    value={item.key}
                                    className={`px-4 py-2 text-sm font-medium flex items-center gap-2 bg-white
                                     ${data.timeFilter === item.key ? "bg-violet-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                                >
                                    {item.icon}
                                    {item.label}
                                </ToggleGroupItem>
                            ))}
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

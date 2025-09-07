import Button from '@/Components/Button'
import { PageProps } from '@/types'
import { Link, useForm, usePage } from '@inertiajs/react'
import { categoryColumns } from '@/Constant/columns'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import DashboardLayout from '@/Layouts/DasboardLayout'
import SearchBar from '@/Components/SearchInput'
import { Card, CardTitle } from '@/Components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/Components/ui/toggle-group'
import { FaTag } from 'react-icons/fa6'
import { RxCross2 } from 'react-icons/rx'
import { useEffect, useState } from 'react'
import { MdLibraryBooks } from 'react-icons/md'
import { IoDocumentText } from 'react-icons/io5'
import Label from '@/Components/Label'
import axios from 'axios'

const breadcrumbs = [
    { name: 'Categories', href: '/categories' },
]

const Index = () => {
    const { categories } = usePage<
        PageProps<{ categories: LaravelPagination<Category> }>
    >().props
    const { data, setData, get } = useForm<{
        search: string;
        page: number;
        type: string | null;
    }>({
        search: '',
        page: 1,
        type: null,
    })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        get(route('categories.index'), {
            preserveState: true,
            preserveScroll: true,
            data: { search: data.search, page: 1 }
        })
    }

    const [liveQuery, setLiveQuery] = useState<string>('');
        const [liveResults, setLiveResults] = useState<{ id: number; name: string; type: string }[]>([]);
        const [showLiveResults, setShowLiveResults] = useState<boolean>(false);

        useEffect(() => {
            if (liveQuery.length === 0) {
                setLiveResults([]);
                setShowLiveResults(false);
                return;
            }

            const timeout = setTimeout(() => {
                axios
                    .get('/categories/search', { params: { q: liveQuery } })
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

    const applyFilter = (overrideData?: typeof data) => {
        const payload = overrideData || data;
        get(route('publications.index'), {
            preserveState: true,
            preserveScroll: true,
            data: payload,
        })
    }

     const goToPage = (url: string | null) => {
        if (!url) return
        const query = url.includes("?") ? url.split("?")[1] : ""
        const params = new URLSearchParams(query)
        const nextPage = Number(params.get("page") || 1)
        setData("page", nextPage)
        get(route('loans.index'), {
            preserveState: true,
            preserveScroll: true,
            data: {
                ...data,
                page: nextPage,
            },
        })
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            get(route('categories.index'), {
                preserveState: true,
                preserveScroll: true,
                data
            })
        }, 100)

        return () => clearTimeout(timeoutId);
    }, [data.type , data.page])



    return (
        <div>
            <DashboardLayout
                header={
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">Categories</h1>
                        <Link href="/categories/create">
                            <Button type="button" process={false} className="bg-white border-violet-400 border-2 hover:bg-violet-50 font-semibold text-violet-400 rounded-lg">
                                + Add Category
                            </Button>
                        </Link>
                    </div>
                }

                breadcrumbs={breadcrumbs} >

                <div className='flex flex-col gap-10'>
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
                                get(route('categories.index'), {
                                    preserveState: true,
                                    preserveScroll: true,
                                    data: { search: item.name, page: 1 },
                                });
                                setLiveQuery('');
                            }}
                            renderResult={(item) => (
                                <>
                                    {item.name} <span className="text-gray-400 text-sm">type : {item.type}</span>
                                </>
                            )}
                            />
                        {/* Active Filter Chips */}
                        {data.type && (
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    className={`px-3 py-1 rounded-full flex items-center gap-2 border-2 bg-white
                                      ${data.type === "book" ? "border-violet-500 text-violet-500" : "border-sky-400 text-sky-400"}`}
                                >
                                    {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                                    <RxCross2
                                        className="cursor-pointer"
                                        onClick={() => { setData("type", null); applyFilter() }}
                                    />
                                </Button>
                            </div>
                        )}

                        {/* Filters */}
                        <Card className="p-4 bg-gradient-to-l from-violet-100 to-indigo-50 border shadow-sm rounded-xl">
                            <div className="flex justify-between items-center mb-4">
                                <CardTitle className="text-xl">Filters</CardTitle>
                                {data.type && (
                                    <Button
                                        onClick={() => setData({ ...data, type: null })}
                                        className="text-sm text-red-500 bg-white border border-red-300 hover:bg-red-50"
                                    >
                                        Clear all
                                    </Button>
                                )}
                            </div>

                            {/* Status Filter */}
                            <div className="flex flex-col gap-1">
                                <Label className="text-xs text-gray-500 font-medium flex gap-2 items-center">
                                    <FaTag className="text-gray-400" />Type
                                </Label>
                                <ToggleGroup
                                    type="single"
                                    value={data.type ?? ""}
                                    onValueChange={(val) => {
                                        setData("type", val || null)
                                        applyFilter()
                                    }}
                                    className="inline-flex bg-white border rounded-lg overflow-hidden"
                                >
                                    {[
                                        { key: "book", label: "Book", icon: <MdLibraryBooks className="text-violet-500" /> },
                                        { key: "journal", label: "Journal", icon: <IoDocumentText className="text-sky-400" /> },
                                    ].map((item) => (
                                        <ToggleGroupItem
                                            key={item.key}
                                            value={item.key}
                                            className={`px-4 py-2 text-sm font-medium flex items-center gap-2 bg-white
                                              ${data.type === item.key ? "bg-violet-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                            </div>
                        </Card>
                    </div>


                    {/* Table */}
                    <DataTable<Category>
                        columns={categoryColumns}
                        data={categories}
                        onPageChange={goToPage}
                    />
                </div>
            </DashboardLayout>
        </div>
    )
}

export default Index

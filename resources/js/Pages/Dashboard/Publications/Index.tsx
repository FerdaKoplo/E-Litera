import DashboardLayout from '@/Layouts/DasboardLayout'
import { Link, useForm, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import { publicationsColumns } from '@/Constant/columns'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import SearchBar from '@/Components/SearchInput'
import { RxCross2 } from 'react-icons/rx'
import { FaMapMarkerAlt, FaTag } from 'react-icons/fa'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/Components/ui/toggle-group'
import { IoBookSharp, IoDocumentText, IoLibrary } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle } from '@/Components/ui/card'
import Label from '@/Components/Label'
import Button from '@/Components/Button'
import axios from 'axios'


const breadcrumbs = [
    { name: 'Publications', href: '/publications' },
]

const Index = () => {
    const { publications, locations, categories } = usePage<
        PageProps<{
            publications: LaravelPagination<Publications>,
            categories: Category[],
            locations: Location[],
        }>
    >().props

    const { data, setData, get } = useForm<{
        search: string;
        page: number;
        category_id: string | null;
        type: string | null;
        location_id: string | null;
    }>({
        search: '',
        page: 1,
        category_id: null,
        type: null,
        location_id: null,
    })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        get(route('publications.index'), {
            preserveState: true,
            preserveScroll: true,
            data: { search: data.search, page: 1 }
        })
    }

    const [liveQuery, setLiveQuery] = useState<string>('');
    const [liveResults, setLiveResults] = useState<{ id: number; title: string; author: string }[]>([]);
    const [showLiveResults, setShowLiveResults] = useState<boolean>(false);

    useEffect(() => {
        if (liveQuery.length === 0) {
            setLiveResults([]);
            setShowLiveResults(false);
            return;
        }

        const timeout = setTimeout(() => {
            axios
                .get('/publications/search', { params: { q: liveQuery } })
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


    const goToPage = (url: string | null) => {
        if (!url) return
        const query = url.includes("?") ? url.split("?")[1] : ""
        const params = new URLSearchParams(query)
        const nextPage = Number(params.get("page") || 1)
        setData("page", nextPage)
        get(route('publications.index'), {
            preserveState: true,
            preserveScroll: true,
            data: {
                ...data,
                page: nextPage,
            },
        })
    }

    const applyFilter = (overrideData?: typeof data) => {
        const payload = overrideData || data;
        get(route('publications.index'), {
            preserveState: true,
            preserveScroll: true,
            data: payload,
        })
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            get(route('publications.index'), {
                preserveState: true,
                preserveScroll: true,
                data
            })
        }, 100)

        return () => clearTimeout(timeoutId);
    }, [data.category_id, data.type, data.location_id, data.page])


    return (
        <DashboardLayout header={<div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Publications</h1>
            <Link href="/publications/create">
                <Button type="button" process={false} className="bg-white border-violet-400 border-2 font-semibold hover:bg-violet-50 text-violet-400 rounded-lg">
                    + Add Publications
                </Button>
            </Link>
        </div>} breadcrumbs={breadcrumbs}>
            <div className='flex flex-col gap-10'>
                <div className="flex flex-col gap-6">
                    {/* Search Bar */}
                    <div className="flex justify-between items-center">
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
                                get(route('publications.index'), {
                                    preserveState: true,
                                    preserveScroll: true,
                                    data: { search: item.title, page: 1 },
                                });
                                setLiveQuery('');
                            }}
                            renderResult={(item) => (
                                <>
                                    {item.title} <span className="text-gray-400 text-sm">by {item.author}</span>
                                </>
                            )}
                        />
                    </div>

                    {/* Active Filter Chips */}
                    {(data.category_id || data.type || data.location_id) && (
                        <div className="flex flex-wrap gap-2">
                            {data.category_id && (
                                <Button className="border-violet-500 border-2 hover:bg-violet-50 bg-white text-violet-500 px-2 py-1 rounded-full flex items-center gap-1">
                                    {categories.find(c => c.id.toString() === data.category_id)?.name}
                                    <RxCross2
                                        className="cursor-pointer"
                                        onClick={() => { setData("category_id", null), applyFilter() }}
                                    />
                                </Button>
                            )}
                            {data.type && (
                                <Button className="border-sky-500 border-2 bg-white text-sky-500 px-2 py-1 rounded-full flex items-center gap-1">
                                    {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                                    <RxCross2
                                        className="cursor-pointer"
                                        onClick={() => { setData("type", null), applyFilter() }}
                                    />
                                </Button>
                            )}
                            {data.location_id && (
                                <Button className="border-zinc-800 border-2 bg-white text-zinc-800 px-2 py-1 rounded-full flex items-center gap-1">
                                    {locations.find(l => l.id.toString() === data.location_id)?.name}
                                    <RxCross2
                                        className="cursor-pointer"
                                        onClick={() => { setData("location_id", null), applyFilter() }}
                                    />
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Filters */}
                    <Card className="p-4 bg-gradient-to-l from-violet-100 to-indigo-50 border shadow-sm rounded-xl">
                        <div className="flex justify-between items-center mb-4">
                            <CardTitle className="text-xl">Filters</CardTitle>
                            {(data.category_id || data.type || data.location_id) && (
                                <Button
                                    onClick={() => setData({ ...data, category_id: null, type: null, location_id: null })}
                                    className="text-sm text-red-500 bg-white border border-red-300 hover:bg-red-50"
                                >
                                    Clear all
                                </Button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Category Filter */}
                            <div className="flex flex-col gap-1">
                                <Label className="text-xs text-gray-500 font-medium flex items-center gap-2">
                                    <FaTag className="text-gray-400" /> Category
                                </Label>
                                <Select
                                    value={data.category_id ?? ""}
                                    onValueChange={(val) => {
                                        setData("category_id", val || null)
                                        applyFilter()
                                    }}
                                >
                                    <SelectTrigger className="w-full bg-white">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Type Filter */}
                            <div className="flex flex-col gap-1">
                                <Label className="text-xs text-gray-500 font-medium flex gap-2 items-center">
                                    <IoBookSharp className="text-gray-400" />
                                    Type
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
                                        { key: "ebook", label: "Ebook", icon: <IoBookSharp className="text-violet-500" /> },
                                        { key: "physical", label: "Physical", icon: <IoLibrary className="text-zinc-700" /> },
                                        { key: "journal", label: "Journal", icon: <IoDocumentText className="text-sky-500" /> },
                                    ].map((item) => (
                                        <ToggleGroupItem
                                            key={item.key}
                                            value={item.key}
                                            className="px-4 py-2 text-sm font-medium flex items-center gap-2 bg-white"
                                        >
                                            {item.icon}
                                            {item.label}
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                            </div>

                            {data.type === "physical" && (
                                <div className="flex flex-col gap-1">
                                    <Label className="text-xs text-gray-500 font-medium flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-gray-400" /> Location
                                    </Label>
                                    <Select
                                        value={data.location_id ?? ""}
                                        onValueChange={(val) => {
                                            setData("location_id", val || null)
                                            applyFilter()
                                        }}
                                    >
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Select Location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {locations.map((loc) => (
                                                <SelectItem key={loc.id} value={loc.id.toString()}>
                                                    {loc.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
                <DataTable columns={publicationsColumns} data={publications} onPageChange={goToPage} />
            </div>

        </DashboardLayout>
    )
}

export default Index

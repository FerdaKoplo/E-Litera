import Button from '@/Components/Button';
import LaravelPagination from '@/Components/LaravelPagination';
import SearchInput from '@/Components/SearchInput';
import { Card, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/Components/ui/toggle-group';
import HomeLayout from '@/Layouts/HomeLayout'
import { PageProps } from '@/types'
import { Inertia } from '@inertiajs/inertia';
import { Link, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaFilter, FaTag, FaUserPen } from 'react-icons/fa6';
import { GiWhiteBook } from "react-icons/gi";
import { IoBookSharp, IoDocumentText, IoLibrary } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { Label } from 'recharts';

const breadcrumbs = [
    { name: 'Publications', href: '/member/publications' },
]

const Index = () => {

    const { publications, categories, locations } = usePage<PageProps<{
        publications: PaginatedResponse<Publications>
        categories: Category[],
        locations: Location[]
    }>>().props


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
        get(route('publications.member.index'), {
            preserveState: true,
            preserveScroll: true,
            data: { search: data.search, page: 1 }
        })
    }


    const applyFilter = (overrideData?: typeof data) => {
        const payload = overrideData || data;
        setData("page", 1)
        get(route('publications.member.index'), {
            preserveState: true,
            preserveScroll: true,
            data: {
                search: payload.search,
                page: 1,
                category_id: payload.category_id,
                type: payload.type,
                location_id: payload.location_id
            }
        })
    }

    const goToPage = (url: string | null) => {
        if (!url) return
        const query = url.includes("?") ? url.split("?")[1] : ""
        const params = new URLSearchParams(query)
        const nextPage = Number(params.get("page") || 1)
        setData("page", nextPage)
        get(route('publications.member.index'), {
            preserveState: true,
            preserveScroll: true,
            data: {
                ...data,
                page: nextPage,
            },
        })
    }

    // debouncing because of the async ahh
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            get(route('publications.member.index'), {
                preserveState: true,
                preserveScroll: true,
                data
            })
        }, 300)

        return () => clearTimeout(timeoutId);
    }, [data.category_id, data.type, data.location_id, data.page])

    return (
        <HomeLayout header={
            <div className='flex justify-between'>
                <h2 className="font-semibold text-4xl text-gray-800">
                    Publications
                </h2>

                <SearchInput placeholder='Search publication...'
                    buttonLabel='Search'
                    value={data.search}
                    onChange={(val) => setData("search", val)}
                    onSubmit={handleSearch} />
            </div>
        } breadcrumbs={breadcrumbs} >

            <div className='flex flex-col gap-10'>
                <div className="flex flex-col gap-6">
                    {/* Active Filter Chips */}
                    {(data.category_id || data.type || data.location_id) && (
                        <div className="flex flex-wrap gap-2">
                            {data.category_id && (
                                <Button className="border-violet-500 border-2 bg-white text-violet-500 px-2 py-1 rounded-full flex items-center gap-1">
                                    {categories.find(c => c.id.toString() === data.category_id)?.name}
                                    <RxCross2
                                        className="cursor-pointer"
                                        onClick={() => { setData("category_id", null); applyFilter() }}
                                    />
                                </Button>
                            )}
                            {data.type && (
                                <Button className="border-sky-500 border-2 bg-white text-sky-500 px-2 py-1 rounded-full flex items-center gap-1">
                                    {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                                    <RxCross2
                                        className="cursor-pointer"
                                        onClick={() => { setData("type", null); applyFilter() }}
                                    />
                                </Button>
                            )}
                            {data.location_id && (
                                <Button className="border-zinc-800 border-2 bg-white text-zinc-800 px-2 py-1 rounded-full flex items-center gap-1">
                                    {locations.find(l => l.id.toString() === data.location_id)?.name}
                                    <RxCross2
                                        className="cursor-pointer"
                                        onClick={() => { setData("location_id", null); applyFilter() }}
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
                <div className="grid grid-cols-4 gap-10 rounded-xl ">
                    {publications.data.map((pub, index) => (
                        <Link href={`/member/publication/${pub.id}`} key={index} className={`flex flex-col  shadow-md rounded-xl bg-gradient-to-br from-fuchsia-100 to-violet-100 text-white hover:shadow-lg gap-5 hover:scale-[1.02] transition-all duration-700 `}>
                            {pub.image_url && (
                                <div className="overflow-hidden relative ">
                                    <div className="absolute left-[-40px] top-4 rotate-[-45deg] bg-violet-500 text-white text-lg font-semibold px-12 py-1 shadow-md">
                                        {pub.type}
                                    </div>
                                    <img
                                        loading="lazy"
                                        src={`${pub.image_url}`}
                                        alt={pub.title}
                                        className="w-full aspect-[3/4] object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex bg-white  text-black  flex-col flex-grow p-5 rounded-xl">
                                <div className="flex flex-col gap-3 flex-grow">
                                    <p className="bg-slate-100 text-slate-700 text-sm font-medium w-fit px-3 py-1 rounded-full">
                                        {pub.category?.name}
                                    </p>

                                    <h1 className="font-semibold text-lg line-clamp-2 group-hover:text-violet-700">
                                        {pub.title}
                                    </h1>

                                    <h2 className='line-clamp-3 text-slate-400'>
                                        {pub.publication_description}
                                    </h2>

                                    <p className="flex items-center gap-2 text- text-sm">
                                        by {pub.author}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <LaravelPagination
                    links={publications.links}
                    onNavigate={goToPage}
                />
            </div>
        </HomeLayout >
    )
}

export default Index

import LaravelPagination from '@/Components/LaravelPagination';
import SearchInput from '@/Components/SearchInput';
import { Button } from '@/Components/ui/button';
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
import { IoBookSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

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
        if (!url)
            return
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
                <div className="flex flex-col sm:flex-row md:flex-col sm:items-end md:items-start gap-4 flex-wrap">
                    <div className='p-5 bg-white shadow-sm rounded-xl border flex flex-wrap gap-6 items-center'>
                        <div className='flex items-center gap-3'>
                            <FaTag className='text-gray-400' />
                            <Select
                                value={data.category_id ?? ''}
                                onValueChange={(val) => {
                                    setData('category_id', val || null)
                                    applyFilter()
                                }}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id.toString()}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='flex items-center gap-7'>
                            <div className='flex items-center gap-3'>
                                <IoBookSharp className='text-gray-400' />
                                <ToggleGroup
                                    type="single"
                                    value={data.type ?? ''}
                                    onValueChange={(val) => {
                                        setData('type', val || null)
                                        applyFilter()
                                    }}
                                    className="inline-flex border rounded-lg overflow-hidden">
                                    {['ebook', 'physical', 'journal'].map((t) => (
                                        <ToggleGroupItem
                                            key={t}
                                            value={t}
                                            className={`px-4 py-2 text-sm font-medium transition-colors
                                             ${data.type === t ? 'bg-violet-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                                            {t.charAt(0).toUpperCase() + t.slice(1)}
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                            </div>
                        </div>

                        {data.type === 'physical' && (
                            <div className='flex items-center gap-3'>
                                <FaMapMarkerAlt className='text-gray-400' />
                                <Select
                                    value={data.location_id ?? ''}
                                    onValueChange={(val) => {
                                        setData('location_id', val || null)
                                        applyFilter()
                                    }}
                                >
                                    <SelectTrigger className="w-full sm:w-48">
                                        <SelectValue placeholder="Location" />
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

                        {(data.category_id || data.type || data.location_id) && (
                            <button
                                onClick={() => setData({ ...data, category_id: null, type: null, location_id: null })}
                                className="text-sm text-red-500  font-semibold  ml-2"
                            >
                                Clear all
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-5">
                        {data.category_id && (
                            <span className="border-violet-500 border-2 text-violet-500 flex-row-reverse  px-3 py-1 rounded-full flex items-center gap-2">
                                {categories.find(c => c.id.toString() === data.category_id)?.name}
                                <button
                                    type="button"
                                    onClick={() => { setData('category_id', null); applyFilter() }}
                                    className="l-1 font-bold"
                                >
                                    <RxCross2 className=' font-bold' />
                                </button>
                            </span>
                        )}

                        {data.type && (
                            <span className="border-sky-500 border-2 text-sky-500  px-3 py-1 rounded-full flex items-center gap-2">
                                {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                                <button type="button" onClick={() => { setData('type', null); applyFilter() }}>
                                    <RxCross2 />
                                </button>
                            </span>
                        )}

                        {data.location_id && (
                            <span className="border-zinc-800 border-2 text-zinc-800 px-3 py-1 rounded-full flex items-center gap-2">
                                {locations.find(l => l.id.toString() === data.location_id)?.name}
                                <button type="button" onClick={() => { setData('location_id', null); applyFilter() }}>
                                    <RxCross2 />
                                </button>
                            </span>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-10 rounded-xl ">
                    {publications.data.map((pub, index) => (
                        <Link href={`/member/publication/${pub.id}`} key={index} className={`flex flex-col  shadow-md rounded-xl bg-slate-800 text-white hover:shadow-lg gap-5 hover:scale-[1.02] transition-all duration-700 `}>
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
                            <div className="flex flex-col flex-grow p-5">
                                <div className="flex flex-col gap-3 flex-grow">
                                    <p className="bg-slate-100 text-slate-700 text-sm font-medium w-fit px-3 py-1 rounded-full">
                                        {pub.category?.name}
                                    </p>

                                    <h1 className="font-semibold text-lg line-clamp-2 group-hover:text-violet-700">
                                        {pub.title}
                                    </h1>

                                    <h2 className='line-clamp-3 text-slate-300'>
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

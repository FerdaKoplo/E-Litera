import HomeLayout from '@/Layouts/HomeLayout'
import { PageProps } from '@/types'
import { Link, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import DOMPurify from "dompurify"
import Button from '@/Components/Button'
import { IoEyeSharp } from 'react-icons/io5'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination"
import { Inertia } from '@inertiajs/inertia'
import Input from '@/Components/Input'
import { IoIosSearch } from 'react-icons/io'
import { IoChevronBack, IoChevronForward } from "react-icons/io5"
import LaravelPagination from '@/Components/LaravelPagination'

const breadcrumbs = [
    { name: 'Articles', href: '/member/articles' },
]


const Index = () => {

    const { articles } = usePage<PageProps<{ articles: PaginatedResponse<Article> }>>().props
    const { data, setData, get, processing } = useForm({
        search: '',
    })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        get(route('articles.member.index'), {
            preserveState: true,
            preserveScroll: true,
            data: { search: data.search, page: 1 }
        })
    }

    const goToPage = (url: string | null) => {
        if (!url)
            return
        Inertia.get(url, {}, { preserveScroll: true, preserveState: true });
    }


    return (
        <HomeLayout header={
            <div className='flex justify-between'>
                <h2 className="font-semibold text-4xl text-gray-800">
                    Article
                </h2>

                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full max-w-lg">
                    <div className="relative flex-1">
                        <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search articles..."
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            className="pl-10 pr-3 py-2 !rounded-full w-full focus:outline-none focus:ring-2 focus:ring-violet-200"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-violet-400 transition h-full sm:h-auto"
                    >
                        Search
                    </Button>
                </form>
            </div>
        } breadcrumbs={breadcrumbs} >
            <div className='flex flex-col gap-10'>
                <div className="grid grid-cols-4 gap-10 rounded-xl ">
                    {articles.data.map((arti, index) => (
                        <Link href={`/member/articles/${arti.id}`} key={index} className={`p-6 flex flex-col shadow-md rounded-xl bg-slate-800 hover:shadow-lg gap-5 hover:scale-[1.02] transition-all duration-700 text-white`}>
                            {arti.images && arti.images.length > 0 && (
                                <img
                                    loading='lazy'
                                    src={`/storage/${arti.images[arti.images.length - 1]}`}
                                    alt="article-image"
                                    className="w-full aspect-video object-cover rounded-lg shadow-md"
                                />
                            )}

                            <div className="flex flex-col flex-grow">
                                <div className="flex flex-col gap-4 flex-grow">
                                    <h1 className="font-bold text-xl line-clamp-2">
                                        {arti.title_article}
                                    </h1>
                                    <p
                                        className="line-clamp-3 text-sm"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(arti.article_text_content, {
                                                ALLOWED_TAGS: ["p", "b", "i", "u", "a", "ul", "ol", "li", "img", "h1", "h2", "h3", "blockquote", "code", "pre"],
                                                ALLOWED_ATTR: ["href", "target", "src", "alt", "title", "width", "height"],
                                            }),
                                        }}
                                    />

                                    <div className='flex flex-col text-sm'>
                                        <p className='font-bold'>by {arti.user?.name ?? "null"}</p>

                                        <p title={new Date(arti.created_at).toLocaleString()}>
                                            {new Date(arti.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <LaravelPagination
                    links={articles.links}
                    onNavigate={goToPage}
                />
            </div>

        </HomeLayout>
    )
}

export default Index

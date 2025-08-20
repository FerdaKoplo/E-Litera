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

const breadcrumbs = [
    { name: 'Articles', href: '/member/articles' },
]


const Index = () => {

    const { articles } = usePage<PageProps<{ articles: PaginatedResponse<Article> }>>().props
    const { data, setData, get, processing } = useForm({
        search: '',
        page: 1,
    })

    const currentPage = articles.meta?.current_page ?? 1
    const totalPages = articles.meta?.last_page ?? 1
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setData('page', 1)
        get(route('articles.member.index'), {
            preserveState: true,
            preserveScroll: true,
        })
    }

    const goToPage = (pageNumber: number) => {
        Inertia.get(route('articles.member.index'), { search: data.search, page: pageNumber }, {
            preserveState: true,
            preserveScroll: true,
        })
    }


    return (
        <HomeLayout header={
            <div className='flex justify-between'>
                <h2 className="font-semibold text-4xl text-gray-800">
                    Article
                </h2>

                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative w-full">
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
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                    >
                        Search
                    </Button>
                </form>
            </div>
        } breadcrumbs={breadcrumbs} >
            <div className="grid grid-cols-4 gap-10 rounded-xl ">
                {articles.data.map((arti, index) => (
                    <Link href={`/member/articles/${arti.id}`} key={index} className={`p-6 flex flex-col shadow-md rounded-xl bg-gradient-to-l from-white to-violet-50 hover:shadow-lg gap-5 hover:scale-[1.02] transition-all duration-700 text-gray-800`}>
                        {arti.images && arti.images.length > 0 && (
                            <img
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

            {totalPages > 1 && (
                <div className="mt-10 flex justify-center">
                    <Pagination>
                        <PaginationContent>

                            <PaginationItem>
                                <PaginationPrevious
                                    className={`hover:cursor-pointer ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
                                    onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                                />
                            </PaginationItem>


                            {pageNumbers.map((num) => (
                                <PaginationItem key={num}>
                                    <PaginationLink
                                        className={num === currentPage ? "bg-purple-300 text-white" : "bg-white"}
                                        onClick={() => goToPage(num)}
                                    >
                                        {num}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}


                            <PaginationItem>
                                <PaginationNext
                                    className={`hover:cursor-pointer ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
                                    onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </HomeLayout>
    )
}

export default Index

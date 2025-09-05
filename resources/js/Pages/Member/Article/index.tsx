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
import SearchInput from '@/Components/SearchInput'
import axios from 'axios'

const breadcrumbs = [
    { name: 'Articles', href: '/member/articles' },
]


const Index = () => {

    const { articles } = usePage<PageProps<{ articles: PaginatedResponse<Article> }>>().props
    // const { data, setData, get, processing } = useForm({
    //     search: '',
    // })

    const [liveQuery, setLiveQuery] = useState<string>('');
    const [liveResults, setLiveResults] = useState<{ id: number; title_article: string; }[]>([]);
    const [showLiveResults, setShowLiveResults] = useState<boolean>(false);

    // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     get(route('articles.member.index'), {
    //         preserveState: true,
    //         preserveScroll: true,
    //         data: { search: data.search, page: 1 }
    //     })
    // }

    useEffect(() => {
        if (liveQuery.length === 0) {
            setLiveResults([]);
            setShowLiveResults(false);
            return;
        }

        const timeout = setTimeout(() => {
            axios
                .get('/member/articles/search', { params: { q: liveQuery } })
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

                <SearchInput placeholder="Search article..."
                    buttonLabel="Search"
                    value={liveQuery}
                    onChange={setLiveQuery}
                    liveResults={liveResults}
                    showLiveResults={showLiveResults}
                    onSelectLiveResult={(item) => {
                        Inertia.visit(`/member/articles/${item.id}`);
                        setLiveQuery('');
                    }}
                     renderResult={(item) => (
                        <>
                            {item.title_article}
                        </>
                    )}
                />
            </div>
        } breadcrumbs={breadcrumbs} >
            <div className='flex flex-col gap-10'>
                <div className="grid grid-cols-4 gap-10 rounded-xl ">
                    {articles.data.map((arti, index) => (
                        <Link href={`/member/articles/${arti.id}`} key={index} className={` flex flex-col shadow-md rounded-xl bg-gradient-to-br from-indigo-100 to-fuchsia-100 hover:shadow-lg gap-5 hover:scale-[1.02] transition-all duration-700 text-white`}>
                            {arti.images && arti.images.length > 0 && (
                                <img
                                    loading='lazy'
                                    src={`/storage/${arti.images[arti.images.length - 1]}`}
                                    alt="article-image"
                                    className="w-full aspect-video object-cover rounded-lg shadow-md"
                                />
                            )}

                            <div className="flex flex-col gap-4 p-5 flex-grow rounded-b-xl text-black bg-white">
                                <h1 className="font-bold text-xl line-clamp-2">
                                    {arti.title_article}
                                </h1>
                                <p
                                    className="line-clamp-3 text-slate-400 text-sm"
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

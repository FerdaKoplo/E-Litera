import Button from '@/Components/Button'
import SearchBar from '@/Components/SearchInput'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import { articleColumns } from '@/Constant/columns'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { Link, useForm, usePage } from '@inertiajs/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const breadcrumbs = [
    { name: 'Articles', href: '/articles' },
]

const Index = () => {
    const { articles } = usePage<
        PageProps<{ articles: LaravelPagination<Article> }>
    >().props

    const { data, setData, get, processing } = useForm({
        search: '',
    })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        get(route('articles.index'), {
            preserveState: true,
            preserveScroll: true,
            data: { search: data.search, page: 1 }
        })
    }

    const [liveQuery, setLiveQuery] = useState<string>('');
    const [liveResults, setLiveResults] = useState<{ id: number; title_article: string; }[]>([]);
    const [showLiveResults, setShowLiveResults] = useState<boolean>(false);

    useEffect(() => {
        if (liveQuery.length === 0) {
            setLiveResults([]);
            setShowLiveResults(false);
            return;
        }

        const timeout = setTimeout(() => {
            axios
                .get('/articles/search', { params: { q: liveQuery } })
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
        <DashboardLayout header={<div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Articles</h1>
            <Link href={route('articles.create')}>
                <Button type="button" className="bg-white border-violet-400 border-2 font-semibold hover:bg-violet-50 text-violet-400 rounded-lg">
                    + Add Article
                </Button>
            </Link>
        </div>} breadcrumbs={breadcrumbs}>
            <div className='flex gap-10 flex-col'>
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
                        setData("search", item.title_article);
                        get(route('articles.index'), {
                            preserveState: true,
                            preserveScroll: true,
                            data: { search: item.title_article, page: 1 },
                        });
                        setLiveQuery('');
                    }}
                    renderResult={(item) => (
                        <>
                            {item.title_article}
                        </>
                    )}
                />
                <DataTable columns={articleColumns} data={articles} />
            </div>
        </DashboardLayout>
    )
}

export default Index

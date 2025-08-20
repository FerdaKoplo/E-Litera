import Button from '@/Components/Button';
import ArticleLayout from '@/Layouts/ArticleLayout';
import DashboardLayout from '@/Layouts/DasboardLayout'
import { Link, usePage } from '@inertiajs/react'
import DOMPurify from "dompurify"

const breadcrumbs = [
    { name: 'Articles', href: '/articles' },
    { name: 'Show' }
]

const Show = () => {
    const { props } = usePage<{ article: Article }>()
    const { article } = props

    return (
        <ArticleLayout header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-2xl text-gray-800">

                    Show Article
                </h2>
                <Button className='rounded-lg text-white'>
                    <Link href={route('articles.index')} className="">
                        Return To Dashboard
                    </Link>
                </Button>
            </div>


        } breadcrumbs={breadcrumbs}>
            <div className='flex flex-col  justify-center min-h-screen items-center'>
                <div className='prose max-w-[680px] w-full px-4 py-4'>
                    <h1 className="text-5xl font-bold mb-4">{article.title_article}</h1>

                    <img
                        src={`/storage/${article.images}`}
                        alt="article-image"
                        className="w-full h-auto"
                    />

                    <div
                        className="prose"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(article.article_text_content, {
                                ALLOWED_TAGS: ["p", "b", "i", "u", "a", "ul", "ol", "li", "img", "h1", "h2", "h3", "blockquote", "code", "pre"],
                                ALLOWED_ATTR: ["href", "target", "src", "alt", "title", "width", "height"],
                            }),
                        }}
                    />

                </div>
            </div>
        </ArticleLayout>
    )
}

export default Show

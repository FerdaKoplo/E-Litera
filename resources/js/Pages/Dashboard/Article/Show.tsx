import DashboardLayout from '@/Layouts/DasboardLayout'
import { usePage } from '@inertiajs/react'

const breadcrumbs = [
    { name: 'Articles', href: '/articles' },
    { name: 'Create' }
]

const Show = () => {
    const { props } = usePage<{ article: Article }>()
    const { article } = props

    return (
        <DashboardLayout header={<h2 className="font-semibold text-2xl text-gray-800">Show Article</h2>} breadcrumbs={breadcrumbs}>
            <div>
                <h1 className="text-2xl font-bold mb-4">{article.title_article}</h1>

                <div className="prose">
                    {article.article_text_content ? (
                        <div
                            dangerouslySetInnerHTML={{ __html: article.article_text_content }}
                        />
                    ) : (
                        <p>No content available</p>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Show

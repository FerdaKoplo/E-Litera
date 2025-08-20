import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '@/Components/ui/breadcrumb'
import React from 'react'

interface Props {
    children: React.ReactNode,
    header: React.ReactNode
    breadcrumbs?: { name: string; href?: string }[]

}
const ArticleLayout: React.FC<Props> = ({ children, header, breadcrumbs }) => {
    return (
        <div className="min-h-screen">
            {header && (
                <header className="bg-white shadow sticky top-0 z-30">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                        {breadcrumbs && (
                            <Breadcrumb className='flex items-center gap-4'>
                                {breadcrumbs.map((crumb, index) => (
                                    <React.Fragment key={index}>
                                        <BreadcrumbItem>
                                            {crumb.href ? (
                                                <a href={crumb.href} className="text-textSecondary">
                                                    {crumb.name}
                                                </a>
                                            ) : (
                                                <span>{crumb.name}</span>
                                            )}
                                        </BreadcrumbItem>
                                        {index < breadcrumbs.length - 1 && (
                                            <BreadcrumbSeparator className='flex' />
                                        )}
                                    </React.Fragment>
                                ))}
                            </Breadcrumb>
                        )}

                    </div>
                </header>
            )}
            <div className="min-h-screen flex items-center justify-center">
                <main className="prose max-w-[680px] w-full px-4 py-4">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default ArticleLayout

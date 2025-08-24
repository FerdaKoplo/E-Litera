import Navbaritem from '@/Components/Navbaritem'
import ResponsiveNavbar from '@/Components/ResponsiveNavbar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '@/Components/ui/breadcrumb'
import React from 'react'
import { FaHome } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'
import { MdArticle, MdLibraryBooks } from 'react-icons/md'
import { Toaster } from 'sonner'

interface Props {
    children: React.ReactNode
    header?: React.ReactNode
    breadcrumbs?: { name: string; href?: string }[]
}

const HomeLayout: React.FC<Props> = ({ children, header, breadcrumbs }) => {
    return (
        <div>
            <ResponsiveNavbar>
                <Navbaritem href={'/member/home'} active={route().current('home')}>
                    <div className='flex flex-col items-center gap-3 '>
                        <FaHome size={20} />
                        <span className='font-semibold'>Home</span>
                    </div>
                </Navbaritem>

                <Navbaritem href={'/member/articles'} active={route().current('articles.member.index')}>
                    <div className='flex flex-col items-center gap-3 '>
                        <MdArticle size={20} />
                        <span className='font-semibold'>Article</span>
                    </div>
                </Navbaritem>

                <Navbaritem href={'/member/publications'} active={route().current('publications.member.index')}>
                    <div className='flex flex-col items-center gap-3 '>
                        <MdLibraryBooks size={20} />
                        <span className='font-semibold'>Publications</span>
                    </div>
                </Navbaritem>

                <Navbaritem href={''} active={false}>
                    <div className='flex flex-col items-center gap-3 '>
                        <FaUser size={20} />
                        <span className='font-semibold'>Profile</span>
                    </div>
                </Navbaritem>
            </ResponsiveNavbar>

            <div className='py-10 space-y-10'>
                <header>
                    <div className="space-y-3 mx-auto py-6 px-4 sm:px-6 lg:px-32">
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
                <main className='px-32'>
                    {children}
                    <Toaster position="top-right" richColors closeButton />
                </main>
            </div>
        </div>
    )
}

export default HomeLayout

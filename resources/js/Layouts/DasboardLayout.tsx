import ResponsiveSidebar from '@/Components/ResponsiveSidebar'
import SidebarItem from '@/Components/SidebarItem'
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '@/Components/ui/breadcrumb'
import { PageProps } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { BiSolidBookReader } from 'react-icons/bi'
import { FaFolder, FaHandHolding } from 'react-icons/fa6'
import { IoMdAnalytics } from 'react-icons/io'
import { RiBookShelfFill } from "react-icons/ri";
import { MdArticle, MdFeedback, MdLibraryBooks, MdPersonAdd } from 'react-icons/md'
import Button from '@/Components/Button'
import Notifications from '@/Components/Notifications'
import { BsBellFill } from 'react-icons/bs'
import { Toaster } from 'sonner'

interface Props {
    header: React.ReactNode
    children: React.ReactNode
    breadcrumbs?: { name: string; href?: string }[]
}

const DashboardLayout: React.FC<Props> = ({ children, header, breadcrumbs }) => {
    const { auth } = usePage<PageProps>().props
    const { post } = useForm()

    const handleLogout = () => {
        post(route('logout'))
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
                        <div>
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
                    </div>
                </header>
            )}
            <div className="flex">
                <ResponsiveSidebar>
                    <SidebarItem href="/dashboard" active={route().current('dashboard')}>
                        <div className='flex items-center gap-5'>
                            <IoMdAnalytics size={20} />
                            <span>Dashboard</span>
                        </div>
                    </SidebarItem>

                    <SidebarItem href="/categories" active={route().current('categories.index')}>
                        <div className='flex items-center gap-5'>
                            <FaFolder size={20} />
                            <span>Category</span>
                        </div>
                    </SidebarItem>

                    <SidebarItem href="/locations" active={route().current('locations.index')}>
                        <div className='flex items-center gap-5'>
                            <RiBookShelfFill size={20} />
                            <span>Location</span>
                        </div>
                    </SidebarItem>

                    <SidebarItem href="/publications" active={route().current('publications.index')}>
                        <div className='flex items-center gap-5'>
                            <MdLibraryBooks size={20} />
                            <span>Publications</span>
                        </div>
                    </SidebarItem>

                    <SidebarItem href="/loans" active={route().current('loans.index')}>
                        <div className='flex items-center gap-5 '>
                            <BiSolidBookReader size={20} />
                            <span>Loan</span>
                        </div>
                    </SidebarItem>

                    <SidebarItem href="/articles" active={route().current('articles.index')}>
                        <div className='flex items-center gap-5'>
                            <MdArticle size={20} />
                            <span>Article</span>
                        </div>
                    </SidebarItem>

                    <SidebarItem href="/feedbacks" active={route().current('feedbacks.index')}>
                        <div className='flex items-center gap-5'>
                            <MdFeedback size={20} />
                            <span>Feedback</span>
                        </div>
                    </SidebarItem>

                    {auth.user.role === 'super-admin' && (

                        <SidebarItem href="/librarians" active={route().current('librarians.index')}>
                            <div className='flex items-center gap-5'>
                                <MdPersonAdd size={20} />
                                <span>Librarian</span>
                            </div>
                        </SidebarItem>
                    )}

                    <Button className='text-white mt-auto w-full rounded-lg bg-red-400' onClick={() => handleLogout()}>
                        Logout
                    </Button>
                </ResponsiveSidebar>

                {/* Content area */}
                <main className="flex-1 p-6">
                    {children}
                    <Toaster position="top-right" richColors closeButton />
                </main>
            </div>
        </div >
    )
}

export default DashboardLayout

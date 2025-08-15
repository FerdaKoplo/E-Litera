import ResponsiveSidebar from '@/Components/ResponsiveSidebar'
import SidebarItem from '@/Components/SidebarItem'
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '@/Components/ui/breadcrumb'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import { ChevronRightIcon, SlashIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { FaFolder } from 'react-icons/fa6'
import { IoMdAnalytics } from 'react-icons/io'
import { MdLibraryBooks } from 'react-icons/md'

interface Props {
    header: React.ReactNode
    children: React.ReactNode
    breadcrumbs?: { name: string; href?: string }[]
}

const DashboardLayout: React.FC<Props> = ({ children, header, breadcrumbs }) => {
    const { auth } = usePage<PageProps>().props

    return (
        <div className="bg-gray-100 min-h-screen">
            {header && (
                <header className="bg-white shadow">
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
            <div className="flex">
                <ResponsiveSidebar>
                    <SidebarItem href="/dashboard" active={route().current('dashboard')}>
                        <div className='flex items-center gap-5'>
                            <IoMdAnalytics size={20} />
                            <span>Dashboard</span>
                        </div>
                    </SidebarItem>

                    {auth.user.role === 'super-admin' && (
                        <SidebarItem href="/publications" active={route().current('publications.index')}>
                            <div className='flex items-center gap-5'>
                                <MdLibraryBooks size={20} />
                                <span>Publications</span>
                            </div>
                        </SidebarItem>
                    )}

                    <SidebarItem href="/categories" active={route().current('categories.index')}>
                        <div className='flex items-center gap-5'>
                            <FaFolder size={20} />
                            <span>Category</span>
                        </div>
                    </SidebarItem>
                </ResponsiveSidebar>

                {/* Content area */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div >
    )
}

export default DashboardLayout

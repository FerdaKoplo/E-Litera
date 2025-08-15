import ResponsiveSidebar from '@/Components/ResponsiveSidebar'
import SidebarItem from '@/Components/SidebarItem'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'

interface Props {
    header: React.ReactNode
    children: React.ReactNode
}

const DashboardLayout: React.FC<Props> = ({ children, header }) => {
    const { auth } = usePage<PageProps>().props

    useEffect(() => {
        if (!auth) {

            console.log(auth)
        }
    }, [])
    return (
        <div className='bg-background'>
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}
            <main className='flex'>
                <div>
                    <ResponsiveSidebar>
                        <SidebarItem href="/dashboard" active={route().current('dashboard')}>
                            Dashboard
                        </SidebarItem>
                        {auth.user.role === 'super-admin' && (
                            <SidebarItem href="/publications" active={route().current('publications.index')}>
                                Publications
                            </SidebarItem>
                        )}
                        <SidebarItem href="/categories" active={route().current('categories.index')}>
                            Category
                        </SidebarItem>
                    </ResponsiveSidebar>
                </div>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout

import ResponsiveSidebar from '@/Components/ResponsiveSidebar'
import SidebarItem from '@/Components/SidebarItem'
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '@/Components/ui/breadcrumb'
import { PageProps } from '@/types'
import { Link, useForm, usePage } from '@inertiajs/react'
import { ChevronRightIcon, SlashIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { BiSolidBookReader } from 'react-icons/bi'
import { FaFolder, FaHandHolding, FaTruck, FaUser } from 'react-icons/fa6'
import { IoMdAnalytics } from 'react-icons/io'
import { FaHome } from "react-icons/fa";
import { RiBookShelfFill } from "react-icons/ri";
import { MdArticle, MdFeedback, MdLibraryBooks, MdPersonAdd } from 'react-icons/md'
import Button from '@/Components/Button'
import ProfileCard from '@/Components/ProfileCard'

interface Props {
    header: React.ReactNode
    children: React.ReactNode
    breadcrumbs?: { name: string; href?: string }[]
}

const MemberLayout: React.FC<Props> = ({ children, header, breadcrumbs}) => {
    const { auth } = usePage<PageProps>().props
    const { post } = useForm()

    const handleLogout = () => {
        post(route('logout'))
    }

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
                     <SidebarItem href="/member/articles" active={route().current('home')}>
                        <div className='flex items-center gap-5'>
                            <FaHome size={20}/>
                            <span>Home</span>
                        </div>
                    </SidebarItem>

                    <SidebarItem href="/member/dashboard" active={route().current('dashboard.member')}>
                        <div className='flex items-center gap-5'>
                            <IoMdAnalytics size={20} />
                            <span>Dashboard</span>
                        </div>
                    </SidebarItem>

                     <SidebarItem href="/member/loans" active={route().current('member.loans.view')}>
                        <div className='flex items-center gap-5'>
                            <BiSolidBookReader size={20} />
                            <span>My Loans</span>
                        </div>
                    </SidebarItem>


                    <SidebarItem href="/member/delivery" active={route().current('member.delivery.index')}>
                        <div className='flex items-center gap-5'>
                            <FaTruck size={20} />
                            <span>Delivery</span>
                        </div>
                    </SidebarItem>

                    <div className='mt-auto w-full flex flex-col gap-5'>
                         <Link href="/member/profile" >
                             <ProfileCard email={auth.user.email} profile='' fallback={auth.user.name} username={auth.user.name} />
                         </Link>

                          <Button className='text-white w-full  rounded-lg bg-red-400' onClick={() => handleLogout()}>
                                 Logout
                          </Button>
                     </div>
                </ResponsiveSidebar>

                {/* Content area */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div >
    )
}

export default MemberLayout

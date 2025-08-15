import { Link } from '@inertiajs/react'
import React from 'react'

interface Props {
    href: string
    children: React.ReactNode
    active: boolean
}

const SidebarItem: React.FC<Props> = ({ children, href, active }) => {
    return (
        <Link href={href} className={
            `px-2 py-2 text-sm rounded ${active ? 'bg-gray-200 font-medium text-gray-900' :
            'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }`}>
            {children}
        </Link>
    )
}

export default SidebarItem

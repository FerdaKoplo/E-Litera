import { Link } from '@inertiajs/react'
import React from 'react'

interface Props {
    href: string
    children: React.ReactNode
    active: boolean
}

const SidebarItem: React.FC<Props> = ({ children, href, active }) => {
    return (
        <Link
            href={href}
            className={`
                flex  items-center justify-center
                px-3 py-3 text-sm rounded-lg
                ${active
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-400 font-medium text-white'
                    : 'text-white hover:bg-violet-500 hover:text-white transition-all'}
                max-w-2xl
            `}
        >
            {children}
        </Link>
    )
}

export default SidebarItem

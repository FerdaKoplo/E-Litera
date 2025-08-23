import { Link } from '@inertiajs/react'
import React from 'react'

interface Props {
    href: string
    children: React.ReactNode
    active: boolean
}


const Navbaritem: React.FC<Props> = ({ active, children, href }) => {
    return (
        <Link
            href={href}
            className={`
                flex  items-center justify-center text-sm gap-5
                ${active
                    ? 'font-medium text-violet-400'
                    : ' hover:text-indigo-400 transition-all'}
            `}
        >
            {children}
        </Link>
    )
}

export default Navbaritem

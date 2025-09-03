import { Link } from '@inertiajs/react'
import React from 'react'

interface Props {
    children?: React.ReactNode
}

const ResponsiveSidebar: React.FC<Props> = ({  children }) => {
    return (
        <div className={`w-64 gap-3 p-5 min-h-screen flex flex-col bg-slate-800`}  >
            {children}
        </div>
    )
}

export default ResponsiveSidebar

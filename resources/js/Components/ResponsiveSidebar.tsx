import { Link } from '@inertiajs/react'
import React from 'react'

interface Props {
    children?: React.ReactNode
}

const ResponsiveSidebar: React.FC<Props> = ({  children }) => {
    return (
        <div className={`w-64 gap-3 p-5 h-screen flex flex-col bg-gray-900`}  >
            {children}
        </div>
    )
}

export default ResponsiveSidebar

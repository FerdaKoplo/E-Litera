import { Link } from '@inertiajs/react'
import React from 'react'

interface Props {
    children?: React.ReactNode
}

const ResponsiveSidebar: React.FC<Props> = ({  children }) => {
    return (
        <div className={`w-64 h-screen flex flex-col`}  >
            {children}
        </div>
    )
}

export default ResponsiveSidebar

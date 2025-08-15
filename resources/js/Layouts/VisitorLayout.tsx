import { Link } from '@inertiajs/react'
import React from 'react'

interface Props {
    children: React.ReactNode
}

const VisitorLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className='flex justify-center items-center flex-col min-h-screen bg-background'>
            <Link href={'/'}>
                E-Litera
            </Link>
            <div className="relative w-full sm:max-w-md mt-6">
                <div className="absolute top-7 left-12 w-full h-full opacity-15 bg-black rounded-lg"></div>

                <div className="relative px-6 py-4 bg-white shadow-md sm:rounded-lg border border-black">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default VisitorLayout

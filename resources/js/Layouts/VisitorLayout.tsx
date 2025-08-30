import { Link } from '@inertiajs/react'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { IoArrowForward, IoBookSharp } from 'react-icons/io5'
import { MdLibraryBooks } from 'react-icons/md'
import { Toaster } from 'sonner'

interface Props {
    children: React.ReactNode
}

const VisitorLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className='flex justify-center items-center flex-col min-h-screen bg-slate-50'>
            <Link href={'/'} className='flex items-center gap-1 text-2xl'>
                <h1 className='font-bold p-2 px-3 rounded-lg bg-fuchsia-400 text-white'>E</h1>
                <div className="px-1 py-1 rounded-lg bg-indigo-400 text-white text-lg">
                    <IoBookSharp />
                </div>
                <h2 className='font-semibold bg-violet-400 p-2 px-3 rounded-lg text-white text-3xl'>
                    Litera
                </h2>
            </Link>
            <div className="relative w-full sm:max-w-md mt-6">
                <div className="absolute top-7 left-12 w-full h-full opacity-15 bg-black rounded-lg"></div>
                <div className="relative px-6 py-4 bg-white shadow-md sm:rounded-lg border border-black">
                     <Toaster position="top-right" />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default VisitorLayout

import React from 'react'
import { motion } from "framer-motion"
import { NavConstant } from '@/Constant/landing'
import { Link } from '@inertiajs/react'
import { IoBookSharp } from 'react-icons/io5'
import Button from '@/Components/Button'

interface NavProps {
    navlist: Array<{ label: string, key: string }>,
    onNavClick: (sectionKey: string) => void
    onHomeClick: () => void
}


const Nav: React.FC<NavProps> = ({ navlist, onNavClick, onHomeClick }) => {

    return (
        <div className="sticky  top-0 bg-white z-50">
            <nav className="px-32 p-10 ">
                <div className="cursor-pointer flex justify-between font-medium items-center  gap-6 ">
                    <div  onClick={onHomeClick} className='flex items-center gap-1 text-sm'>
                        <h1 className='font-bold p-1 px-2 rounded-lg bg-fuchsia-400 text-white'>E</h1>
                        <div className="px-1 py-1 rounded-lg bg-indigo-400 text-white text-xs">
                            <IoBookSharp />
                        </div>
                        <h2 className='font-semibold bg-violet-400 p-1 px-2 rounded-lg text-white text-base'>
                            Litera
                        </h2>
                    </div>
                    <ul className="hidden lg:flex justify-center text-sm items-center gap-8  ">
                        {NavConstant.map((i) => (
                            <li key={i.key} className='flex items-center gap-5 cursor-pointer' onClick={() => onNavClick(i.key)}>
                                <p>
                                    {i.label}
                                </p>
                                <p className='text-violet-400 '>
                                    {i.icon}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className='flex gap-5'>
                        <Link href='/login'>
                            <Button className='px-4 py-2 rounded-full bg-white text-violet-400 border-violet-400 border-2 font-semibold'>
                                Login
                            </Button>
                        </Link>

                        <Link href='/register'>
                            <Button className='px-4 py-2 rounded-full bg-violet-400 border-2 border-violet-400   font-semibold'>
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav

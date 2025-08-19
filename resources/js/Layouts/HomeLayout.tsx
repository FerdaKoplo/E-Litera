import Navbaritem from '@/Components/Navbaritem'
import ResponsiveNavbar from '@/Components/ResponsiveNavbar'
import React from 'react'
import { FaHome } from 'react-icons/fa'
import { MdArticle } from 'react-icons/md'

interface Props {
    children: React.ReactNode
}

const HomeLayout: React.FC<Props> = ({ children }) => {
    return (
        <div>
            <ResponsiveNavbar>

                <Navbaritem href={'/member/home'} active={route().current('home')}>
                    <div className='flex items-center gap-5'>
                        <FaHome size={20} />
                        <span>Home</span>
                    </div>
                </Navbaritem>

                <Navbaritem href={''} active={false}>
                    <div className='flex items-center gap-5'>
                        <MdArticle size={20} />
                        <span>Article</span>
                    </div>
                </Navbaritem>
            </ResponsiveNavbar>
            <main>
                {children}
            </main>
        </div>
    )
}

export default HomeLayout

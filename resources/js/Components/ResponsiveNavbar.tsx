import React, { useEffect, useState } from 'react'

interface Props {
    children: React.ReactNode
}

const ResponsiveNavbar: React.FC<Props> = ({ children }) => {

    const [scrolled, setScrolled] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return (
        <nav className={`w-full bg-gradient-to-b  from-violet-50 to-slate-50  flex gap-10 px-8 py-4 items-center sticky top-0 z-50  justify-center duration-300 ease-out
        ${scrolled
                ? "shadow-md shadow-violet-200"
                : " text-xs"
            }`}>
            {children}
        </nav>
    )
}

export default ResponsiveNavbar

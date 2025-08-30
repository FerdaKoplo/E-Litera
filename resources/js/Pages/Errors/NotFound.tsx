import Button from '@/Components/Button'
import Eyes from '@/Components/Eyes';
import { PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import { IoReturnUpBackOutline } from "react-icons/io5";

const NotFound = () => {

    return (
        <div className="relative bg-slate-50 min-h-screen flex flex-col items-center justify-center overflow-hidden">

            {/* Decorative Eyes */}
            <div className="absolute opacity-30 z-10  w-full h-full">
                <Eyes />
            </div>

            {/* Floating Video */}
            <video
                className="relative w-[250px] md:w-[450px]  h-auto drop-shadow-md"
                autoPlay
                muted
                loop
                playsInline
                src="/assets/gif/floating.webm"
            />

            {/* Error Text */}
            <div className="relative  text-center z-20 px-4">
               <h1 className="font-black text-6xl md:text-8xl text-primary">
                    <span className='text-violet-400' >4</span>
                    <span className='text-fuchsia-400' >0</span>
                    <span className='text-indigo-400' >4</span>
                </h1>
                <p className="mt-2 text-xl font-semibold">Oops! Page not found</p>
                <h2 className="text-lg md:text-xl font-medium mt-2 text-muted-foreground">
                    We couldn’t find the knowledge you were looking for.
                </h2>

                {/* CTA */}
                <div className="mt-6">
                    <Link href="/" className="cursor-pointer  inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition">
                        <IoReturnUpBackOutline className="text-xl" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound

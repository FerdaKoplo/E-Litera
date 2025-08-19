import Button from '@/Components/Button'
import Eyes from '@/Components/Eyes';
import { PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import { IoReturnUpBackOutline } from "react-icons/io5";

const NotFound = () => {




    return (
        <div className="min-h-screen justify-center flex flex-col items-center bg-background relative overflow-hidden">

            <div className='absolute h-full w-full'>
                <Eyes />
            </div>

            {/* Circle background */}
            <div className="absolute w-[300px] md:w-[350px] h-[300px] md:h-[200px] rounded-full bg-gradient-to-tr from-fuchsia-400/45 to-violet-500/40 blur-3xl animate-pulse" />

            {/* Video */}
            <video
                className="relative z-10 w-[250px] md:w-[400px] h-auto"
                autoPlay
                muted
                loop
                playsInline
                src="/assets/gif/floating.webm"
            />

            <div className='relative flex flex-col justify-center items-center'>



                <div className="flex items-center flex-col gap-5 relative z-10">
                    <h1 className="font-black text-5xl">OOPS</h1>
                    <h2 className='text-xl font-semibold'>We cannot find the page you were looking for.</h2>
                </div>
            </div>
        </div>
    )
}

export default NotFound

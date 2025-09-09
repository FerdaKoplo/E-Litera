import Button from '@/Components/Button'
import { Link } from '@inertiajs/react'
import React from 'react'


type HeroProps = {
    onLearnMore: () => void
}


const Hero = ( { onLearnMore } : HeroProps ) => {
    return (
        <div className='flex items-center gap-12 justify-center min-h-screen'>
            <div className='flex flex-col gap-10'>
                <h1 className='w-[43rem]  text-6xl font-bold'>
                    <span className='text-fuchsia-400'>Discover</span>  All The <span className='text-violet-400'>Knowledges</span>  You
                    <span className='text-fuchsia-400'> Needed</span>  with
                    <span className='text-violet-400'> Us</span>
                </h1>
                <p className=" text-lg text-slate-400 max-w-xl">
                    Unlock endless resources, explore a world of knowledge designed to help you grow smarter, faster, and stronger in your journey of learning.
                </p>
                <div className='flex items-center gap-7'>
                    <Button     onClick={onLearnMore} className='px-4 py-3 bg-white text-purple-400 border-2 border-violet-400'>
                        Learn More
                    </Button>

                    <Link href='/login'>
                        <Button className='px-4 py-3 border-violet-400 border-2 bg-violet-400'>
                            To The World Of Knowledge
                        </Button>
                    </Link>
                </div>
            </div>

            <div>
                <img width={500} src="/assets/landing/Hero.png" loading='lazy' alt="" />
            </div>
        </div>
    )
}

export default Hero

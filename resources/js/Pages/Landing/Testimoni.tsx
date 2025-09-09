import React from 'react'
import SwipeCarousel from './Partial/SwipeableCarousel'
import { Testimonials } from '@/Constant/landing'
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri'

const Testimoni = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-20 min-h-screen'>
            <div className='flex flex-col gap-5 items-center'>
                <h1 className='text-4xl font-semibold'>
                    Their
                    <span className='text-violet-400'> Thoughts </span>
                     About
                     <span className='text-fuchsia-400'> Us </span>

                </h1>
                <p className="mt-4 text-gray-400 text-lg text-center w-[50rem]">
                    Hear what our students, developers, and designers have to say about their
                    learning journey with us. Every story reflects how our platform has helped
                    them grow, gain confidence, and achieve their goals. Real experiences, real
                    impact — straight from the people who matter most.
                </p>
            </div>
            <SwipeCarousel
                items={Testimonials}
                renderItem={(item) => (
                    <div className="flex flex-col p-6 w-[28rem] min-h-[20rem] mx-auto text-center gap-10">
                        <div className='flex flex-col gap-5 items-center'>
                            <RiDoubleQuotesR className="text-3xl text-violet-400" />
                            <p className="text-lg italic text-gray-500">{item.feedback}</p>
                            <RiDoubleQuotesL className="text-3xl text-violet-400" />
                        </div>
                        <div className='mt-5'>
                            <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                            <span className="text-sm text-gray-500">{item.role}</span>
                        </div>
                    </div>
                )}
            />
        </div>
    )
}

export default Testimoni

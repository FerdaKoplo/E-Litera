import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion'
import { Facts } from '@/Constant/landing'
import React from 'react'
import { IoBookSharp } from 'react-icons/io5'


const About = () => {



    return (
        <div className='flex items-center justify-around gap-10 min-h-screen'>
            <div>
                <img width={500} src="/assets/landing/About.png" loading='lazy' alt="" />
            </div>

            <div>
                <div className='flex flex-col items-center gap-10'>
                    <h1 className='text-5xl font-semibold'>
                        Several
                        <span className='text-violet-400'> Facts </span>
                        About
                    </h1>
                    <div className='flex items-center gap-1'>
                        <h1 className='font-bold p-1 px-2 rounded-lg bg-fuchsia-400 text-white text-3xl'>E</h1>
                        <div className="px-1 py-1 rounded-lg bg-indigo-400 text-white text-lg">
                            <IoBookSharp />
                        </div>
                        <h2 className='font-semibold bg-violet-400 p-1 px-2 rounded-lg text-white text-4xl'>
                            Litera
                        </h2>
                    </div>

                    <p className="text-center text-lg text-gray-400 max-w-2xl leading-relaxed">
                        E-Litera is a modern digital library that helps you explore, learn, and grow with ease.
                        From insightful articles to curated resources, we make knowledge accessible to everyone, anytime, anywhere.
                    </p>


                    <div>
                        <Accordion type="single" collapsible>
                            {Facts.map((fact, index) => (
                                <AccordionItem  className={`rounded-lg  px-10   shadow-sm mb-3 ${ index  % 2   ? 'bg-violet-50/65 ' : 'bg-white'}`} key={fact.id} value={fact.id}>
                                    <AccordionTrigger
                                        className="
                                          w-full text-left
                                          text-xl font-semibold text-gray-800
                                          hover:no-underline hover:text-violet-500
                                          py-4 border-b border-gray-200
                                          transition-colors
                                          [&>svg]:ml-4 [&>svg]:shrink-0
                                        ">
                                        {fact.question}
                                    </AccordionTrigger>

                                    <AccordionContent className='text-lg text-gray-600 leading-relaxed w-[50rem] max-w-full py-4 '>{fact.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About

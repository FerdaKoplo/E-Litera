import { Card } from '@/Components/ui/card'
import { FAQ } from '@/Constant/landing'
import React from 'react'

const Faq = () => {
    return (
        <div className='flex gap-20 items-center justify-around min-h-screen'>
            <div>
                <div className='flex font-semibold flex-col items-center text-4xl'>
                    <h1 >
                        Frequently
                        <span className='text-fuchsia-400'> Asked </span>
                    </h1>
                    <h1 className='text-6xl text-violet-400'>Questions</h1>
                </div>
            </div>
            <div className="flex flex-col gap-6 w-full max-w-3xl">
                {FAQ.map((item) => (
                    <div key={item.id} className="flex flex-col gap-3">
                        <div className="flex justify-start">
                            <Card className="px-4 py-3 max-w-[80%] bg-violet-100 text-violet-900 shadow-md rounded-2xl">
                                <p className="font-medium">Q: {item.question}</p>
                            </Card>
                        </div>

                        <div className="flex justify-end">
                            <Card className="px-4 py-3 max-w-[80%] bg-white shadow-md rounded-2xl border">
                                <p className="text-slate-600">A: {item.answer}</p>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Faq

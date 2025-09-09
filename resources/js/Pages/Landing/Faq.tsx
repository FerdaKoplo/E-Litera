import { Card } from '@/Components/ui/card'
import { FAQ } from '@/Constant/landing'
import React from 'react'
import { motion } from 'framer-motion'

const Faq = () => {
    return (
        <div className='flex gap-20 items-center justify-around min-h-screen'>
            <div>

                <div className="flex flex-col items-center text-4xl font-semibold">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    >
                        Frequently <span className="text-fuchsia-400"> Asked </span>
                    </motion.h1>

                    <motion.h1
                        className="text-6xl text-violet-400"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    >
                        Questions
                    </motion.h1>
                </div>
            </div>
            <div className="flex flex-col gap-6 w-full max-w-3xl">
                {FAQ.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2, ease: 'easeOut' }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="flex flex-col gap-3">
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
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Faq

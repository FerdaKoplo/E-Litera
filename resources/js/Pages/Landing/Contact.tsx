import { Card, CardContent } from '@/Components/ui/card'
import { ContactConstant } from '@/Constant/landing'
import React from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-20">
            <motion.div
                className="text-4xl items-center gap-5 font-semibold flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
            >
                <h1>
                    Have Another <span className="text-fuchsia-400"> Questions </span> in Mind <span className="text-violet-400"> ? </span>
                </h1>
                <h1 className="text-5xl">
                    Don't Hesitate to <span className="text-violet-400"> Reach </span>
                    <span className="text-fuchsia-400"> Us </span> !
                </h1>
                <p className="text-lg text-gray-400 italic">
                    The man who asks a question is a fool for a minute, the man who does not ask is a fool for life. — Confucius
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {ContactConstant.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2, ease: 'easeOut' }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <Card className="flex flex-col items-center justify-center p-6 text-center hover:shadow-lg transition-shadow duration-300 space-y-4">
                            <div className={`text-xl flex items-center justify-center font-bold ${index % 2 ? 'text-violet-400' : 'text-fuchsia-400'} mb-4`}>
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{item.label}</h3>
                                <CardContent className="p-0 mt-2">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item.value}
                                    </a>
                                </CardContent>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Contact

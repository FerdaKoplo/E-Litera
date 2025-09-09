import Button from '@/Components/Button'
import { Link } from '@inertiajs/react'
import React from 'react'
import { motion } from 'framer-motion'


type HeroProps = {
    onLearnMore: () => void
}


const Hero = ({ onLearnMore }: HeroProps) => {
    return (
        <div className="flex items-center gap-12 justify-center min-h-screen">
            <div
                className="flex flex-col gap-10"
            >
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="w-[43rem] text-6xl font-bold">
                    <span className="text-fuchsia-400">Discover</span> All The{' '}
                    <span className="text-violet-400">Knowledges</span> You
                    <span className="text-fuchsia-400"> Needed</span> with
                    <span className="text-violet-400"> Us</span>
                </motion.h1>
                <motion.p
                    className="text-lg text-slate-400 max-w-xl"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}

                >
                    Unlock endless resources, explore a world of knowledge designed to help you grow smarter, faster, and stronger in your journey of learning.
                </motion.p>
                <motion.div
                    className="flex items-center gap-7"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 , ease: 'easeOut' }}

                >
                    <Button onClick={onLearnMore} className="px-4 py-3 bg-white text-purple-400 border-2 border-violet-400">
                        Learn More
                    </Button>

                    <Link href="/login">
                        <Button className="px-4 py-3 border-violet-400 border-2 bg-violet-400">
                            To The World Of Knowledge
                        </Button>
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            >
                <img width={500} src="/assets/landing/Hero.png" loading="lazy" alt="Hero Illustration" />
            </motion.div>
        </div>
    )
}

export default Hero

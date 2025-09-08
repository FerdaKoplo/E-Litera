import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Nav from './Landing/Nav';
import { useSectionRefs } from '@/hook/useSection';
import { NavConstant } from '@/Constant/landing';
import Hero from './Landing/Hero';
import About from './Landing/About';

export default function Welcome() {

    const sectionRefs = useSectionRefs(NavConstant)

    const scrollToSection = (sectionKey: string) => {
        const sectionRef = sectionRefs[sectionKey]
        if (!sectionRef?.current) return

        const targetY = sectionRef.current.getBoundingClientRect().top + window.scrollY
        const startY = window.scrollY;
        const duration = 1000
        const startTime = performance.now();

        const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

        const animateScroll = (currentTime: number) => {
            const timeElapsed = currentTime - startTime
            const progress = Math.min(timeElapsed / duration, 1)
            const easedProgress = easeInOutCubic(progress)

            window.scrollTo(0, startY + (targetY - startY) * easedProgress)

            if (progress < 1) {
                requestAnimationFrame(animateScroll)
            }
        }
        requestAnimationFrame(animateScroll)
    }

    return (
        <div className='flex flex-col'>
            <Nav onNavClick={scrollToSection} navlist={NavConstant} />
            <div className='px-32'>
                <div ref={sectionRefs['home']}>
                    <Hero />
                </div>
                <div ref={sectionRefs['about']}>
                    <About />
                </div>
            </div>
        </div>
    )
}

import { useState } from "react"
import { motion } from "framer-motion"

interface SwipeCarouselProps<T> {
    items: T[]
    renderItem: (item: T, index: number) => React.ReactNode
    className?: string
}

const SwipeCarousel = <T,>({ items, renderItem, className }: SwipeCarouselProps<T>) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const swipeConfidenceThreshold = 50

    const handleSwipe = (direction: "left" | "right" | "top" | "bottom") => {
        if ((direction === "left" || direction === "top") && currentIndex < items.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else if ((direction === "right" || direction === "bottom") && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    if (items.length === 0) return null

    return (
        <motion.div
            key={currentIndex}
            className={`z-30 w-[28rem] min-h-[20rem] rounded-lg shadow-lg bg-white flex items-center justify-center`}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={(_, info) => {
                if (Math.abs(info.velocity.x) > swipeConfidenceThreshold) {
                    handleSwipe(info.velocity.x < 0 ? "left" : "right")
                } else if (Math.abs(info.velocity.y) > swipeConfidenceThreshold) {
                    handleSwipe(info.velocity.y < 0 ? "top" : "bottom")
                }
            }}
            initial={{ x: -50, y: 30, scale: 0.8, rotateZ: -10 }}
            animate={{ x: 0, y: 0, scale: 1, rotateZ: 0 }}
            exit={{ opacity: 0, x: 50, y: -30, scale: 0.6, rotateZ: -10 }}
            transition={{ duration: 0.7 }}
        >
            {renderItem(items[currentIndex], currentIndex)}
        </motion.div>
    )
}

export default SwipeCarousel

import React, { useCallback, useEffect, useState } from 'react'
import throttle from "lodash/throttle";

type Position = {
    x: number
    y: number
}

const Eyes = () => {

    const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

    const handleMouseMove = useCallback(
        throttle((e: React.MouseEvent<HTMLDivElement>) => {
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - left) / width - 0.5) * 2;
            const y = ((e.clientY - top) / height - 0.5) * 2;
            setPosition({ x, y });
        }, 50),
        []
    )

    return (
        <div
            className="flex justify-center items-center gap-10 w-full h-screen "
            onMouseMove={handleMouseMove}
        >
            {[0, 1].map((i) => (
                <div
                    key={i}
                    className="relative w-[200px] h-[200px] rounded-full bg-gray-200 flex justify-center items-center"
                >
                    <div
                        className="absolute w-12 h-12 bg-black rounded-full transition-transform duration-100"
                        style={{
                            transform: `translate(${position.x * 20}px, ${position.y * 20}px)`,
                        }}
                    />
                </div>
            ))}
        </div>
    )
}

export default Eyes

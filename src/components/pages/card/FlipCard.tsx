"use client";

import React, { FC, useState } from 'react'
import "./style.css"

interface IFlipCardProps {
    front?: React.ReactNode
    back?: React.ReactNode
}

const FlipCard: FC<IFlipCardProps> = ({ front, back }) => {
    const [isFlip, setIsFlip] = useState(false);

    return (
        <div className="group h-96 w-full [perspective:1000px]">
            <div className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${isFlip ? "[transform:rotateX(180deg)]" : ""}`}>
                <div className="absolute inset-0 h-full w-full rounded-xl text-center [backface-visibility:hidden] p-3 cursor-pointer" onClick={() => setIsFlip(prev => !prev)}>
                    {front}
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateX(180deg)] [backface-visibility:hidden] p-3 cursor-pointer" onClick={() => setIsFlip(prev => !prev)}>
                    {back}
                </div>
            </div>
        </div>
    )
}

export default FlipCard
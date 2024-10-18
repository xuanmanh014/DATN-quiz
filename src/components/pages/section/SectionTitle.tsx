import React, { FC } from 'react'

interface ISectionTitleProps {
    title?: string
    descriptions?: string | React.ReactNode
}

const SectionTitle: FC<ISectionTitleProps> = ({ title = "", descriptions = "" }) => {
    return (
        <section className='text-center py-[30px]'>
            <h2 className='text-[30px] font-semibold'>{title}</h2>
            <p className='my-5 w-[38%] m-auto'>{descriptions}</p>
        </section>
    )
}

export default SectionTitle
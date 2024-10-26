import { convertCamelCase } from '@/utils/utils'
import React, { FC } from 'react'

interface IInformationProps {
    title?: string
    dataSource?: Record<string, any>
}

const Information: FC<IInformationProps> = ({ title = "", dataSource = {} }) => {
    const keys = Object.keys(dataSource) as Array<keyof Record<string, any>>;

    return (
        <>
            <h1 className='text-[30px] font-medium mb-4'>{title}</h1>

            <table className='border-collapse border border-gray-300 w-full'>
                <tbody>
                    {keys.map((key, index) => {
                        return (
                            <tr key={index}>
                                <th className='text-start p-3 border'>{convertCamelCase(dataSource[key] as string)}</th>
                                <td className='w-[70%] border p-3'>{dataSource[key]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Information
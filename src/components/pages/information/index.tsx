import { convertCamelCase, isValidDate } from '@/utils/utils'
import React, { FC } from 'react'
import dayjs from "dayjs"
import { DATE_FORMAT } from '@/constant/constants'

interface IInformationProps {
    title?: string
    dataSource?: Record<string, any>
    extra?: React.ReactNode
}

const Information: FC<IInformationProps> = ({ title = "", dataSource = {}, extra = <></> }) => {
    const keys = Object.keys(dataSource) as Array<keyof Record<string, any>>;

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className='text-[30px] font-medium mb-4'>{title}</h2>
                {extra}
            </div>

            <table className='border-collapse border border-gray-300 w-full'>
                <tbody>
                    {keys.map((key, index) => {
                        return (
                            <tr key={index}>
                                <th className='text-start p-3 border'>{convertCamelCase(key)}</th>
                                <td className='w-[70%] border p-3'>{isValidDate(dataSource[key]) ? dayjs(dataSource[key]).format(DATE_FORMAT) : dataSource[key]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Information
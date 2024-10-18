import Link from 'next/link';
import React from 'react'

const LayoutFooter = () => {
    const navs = [
        { label: "All exercises", key: "/exercises" },
        { label: "Top users", key: "/top-users" },
        { label: "Help", key: "/support" },
    ];

    return (
        <footer className='border-t border-gray-300 pt-4 mt-5'>
            <div className="container m-auto grid grid-cols-4 gap-3 mb-4">
                <ul className="col-span-1">
                    {navs.map(nav => {
                        return (
                            <li key={nav.key}>
                                <Link href={`/${nav.key}`} className='text-blue-500 inline-block py-2'>{nav.label}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="bg-gray-800 text-center py-3 text-white">
                <p>© quizzes.com · since 2019</p>
            </div>
        </footer>
    )
}

export default LayoutFooter
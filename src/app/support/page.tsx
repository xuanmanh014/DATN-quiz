import { Separator } from '@/components/ui/separator'
import React from 'react'
import thankYou from "../../../assets/thank-you.jpg"
import Image from 'next/image'

const SupportPage = () => {
    return (
        <div>
            <h1 className='text-[30px] font-medium'>Support dailydictation.com</h1>

            <Separator className='my-4' />

            <div className="grid grid-cols-2 gap-6">
                <div className="shadow-xl col-span-1 rounded-lg p-4 leading-[25px]">
                    <p className='mb-4'>Hello friends! I'm Huy from Vietnam. I am the founder of dailydictation.com 🤗</p>

                    <p>As a person who has used many different methods to learn English, I realized that dictation is an amazing way to improve my English.</p>
                    <p>That's why I created this website to help all English learners practice easily and effectively.</p>

                    <p className='my-4'>Building and maintaining a website takes time, money and effort. I need your help to keep the site running and to add more useful features.</p>

                    <p className='my-4'>If you can help me with money, awesome 🤩! You can send me a donation to my PayPal / Bank accounts (see below).</p>

                    <p className='my-4'>Another great way to help me is to share this website with your friends. 😇</p>

                    <p className='my-4'>I sincerely appreciate your support!
                        Thank you!!!!</p>
                </div>

                <div className="col-span-1">
                    <Image src={thankYou} alt='Thank you' width={1000} height={1000} className='w-full h-full' />
                </div>
            </div>
        </div>
    )
}

export default SupportPage
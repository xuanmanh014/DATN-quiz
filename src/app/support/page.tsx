import { Separator } from '@/components/ui/separator'
import React from 'react'
import thankYou from "../../../assets/thank-you.jpg"
import Image from 'next/image'

// 
// 

// 

// 
// 

//     

// 

const SupportPage = () => {
    return (
        <div>
            <h1 className='text-[30px] font-medium'>Support dailydictation.com</h1>

            <Separator className='my-4' />

            <div className="grid grid-cols-2 gap-6">
                <div className="shadow-xl col-span-1 rounded-lg p-4 leading-[25px]">
                    <p className='mb-4'>Hello friends! I'm Manh, and I'm the 4th year student of Hanoi University of Mining and Geology. 🤗</p>

                    <p>As someone who has explored countless methods to learn English, I’ve discovered that dictation is a truly powerful way to improve listening, writing, and comprehension skills.That’s exactly why I built this website – to help English learners practice easily and effectively.</p>

                    <p className='my-4'>I believe there’s always room for improvement, and your feedback means a lot to me!</p>

                    <p className='my-4'>If you have any suggestions to make this platform better or ideas for new features, feel free to share them with me.Your input will help improve the experience for everyone.</p>

                    <p className='my-4'>Also, if you find this website helpful, please consider sharing it with your friends or anyone learning English.Together, we can grow a community of learners and make language learning even more enjoyable. 😇</p>

                    <p className='my-4'>Thank you so much for your support! 🙏</p>
                </div>

                <div className="col-span-1">
                    <Image src={thankYou} alt='Thank you' width={1000} height={1000} className='w-full h-full' />
                </div>
            </div>
        </div>
    )
}

export default SupportPage
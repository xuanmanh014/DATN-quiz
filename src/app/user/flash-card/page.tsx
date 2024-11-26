"use client";

import { FlashCardApis, ListFlashCardApis } from '@/apis/flash-card/index.api';
import FlipCard from '@/components/pages/card/FlipCard';
import CreateFlashCard from '@/components/pages/flash-card/CreateFlashCard';
import CreateFlashCardList from '@/components/pages/flash-card/CreateFlashCardList';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator'
import { useFetch } from '@/hooks/useFetch';
import { IFlashCard, IFlashCardList } from '@/types/flash-card/index.type';
import React, { useState } from 'react'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

const FlashCardPage = () => {
    const { data: flashCards, refetchData: refetchCard, setData: setDataCards } = useFetch<IFlashCard[]>(FlashCardApis.getAll);
    const { data: listFlashCards, refetchData: refetchCardList } = useFetch<IFlashCardList[]>(ListFlashCardApis.getAll);
    const [listIndex, setListIndex] = useState(0);
    const cardsData = flashCards?.filter(card => card.cardList?._id === listFlashCards?.[listIndex]?._id);
    const [cardIndex, setCardIndex] = useState(0);
    const cardData = cardsData?.[cardIndex];

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className='text-[30px] font-medium mb-4'>Your flash cards</h2>

                <div className="flex items-center gap-4">
                    <CreateFlashCardList refetchData={refetchCardList} />
                    <CreateFlashCard refetchData={refetchCard} />
                </div>
            </div>

            <Separator className='mt-4 mb-[50px]' />

            <div className="flex items-center gap-2 mb-6">
                {listFlashCards?.map((list, index) => {
                    return (
                        <div key={list._id} className={`p-2 rounded-lg ${listIndex === index ? "bg-black text-white" : "text-black"} font-medium text-[16px] cursor-pointer w-fit`}
                            onClick={() => {
                                setListIndex(index);
                                setCardIndex(0);
                            }}
                        >
                            {list.listName}
                        </div>
                    )
                })}
            </div>

            {cardsData?.length === 0
                ? <h2 className='text-[30px] font-medium mb-4'>You don't have any flash cards</h2>
                : <>
                    <FlipCard
                        front={
                            <>
                                <h3 className='font-medium text-[20px]'>{cardData?.cardName} {`(${cardData?.wordType})`}</h3>
                                <Separator className='my-2' />
                                <p><span>{cardData?.wordEMean}</span>{` (${cardData?.wordIPA})`}</p>
                                <p className='my-3 line-clamp-2'>Example: {cardData?.wordExample}</p>
                            </>
                        }
                        back={
                            <>
                                <h3 className='font-medium text-[20px]'>{cardData?.cardName} {`(${cardData?.wordType})`}</h3>
                                <Separator className='my-2' />
                                <p><span>{cardData?.wordVMean}</span></p>
                                <p className='my-3 line-clamp-2'>Ví dụ: {cardData?.wordExample}</p>
                            </>
                        }
                    />

                    <div className="flex items-center justify-center gap-[20px] mt-[40px]">
                        <Button
                            onClick={() => setCardIndex(prev => {
                                if (prev !== 0) {
                                    return prev - 1;
                                }

                                return prev;
                            })}
                            disabled={cardIndex === 0}
                        >
                            <FaArrowLeft />
                        </Button>
                        <p className='mx-[10px]'>{`${cardIndex + 1}/${cardsData?.length}`}</p>
                        <Button
                            onClick={() => setCardIndex(prev => {
                                if (prev < Number(cardsData?.length)) {
                                    return prev + 1;
                                }

                                return prev;
                            })}
                            disabled={cardIndex === Number(cardsData?.length) - 1}
                        >
                            <FaArrowRight />
                        </Button>
                    </div>
                </>
            }
        </div>
    )
}

export default FlashCardPage
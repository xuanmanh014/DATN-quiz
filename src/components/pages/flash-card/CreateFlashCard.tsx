"use client";

import { FlashCardApis, ListFlashCardApis } from '@/apis/flash-card/index.api';
import { Button } from '@/components/ui/button'
import Combobox, { IOption } from '@/components/ui/combobox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/contexts/app'
import { useFetch } from '@/hooks/useFetch';
import { IFlashCard, IFlashCardList } from '@/types/flash-card/index.type'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const flashCardSchema = z.object({
    cardName: z.string().min(1, {
        message: "Please type card's name!"
    }),
    wordEMean: z.string().min(1, {
        message: "Please type word's English mean!"
    }),
    wordVMean: z.string().min(1, {
        message: "Please type word's Vietnamese mean!"
    }),
    wordType: z.string().min(1, {
        message: "Please type word's type!"
    }),
    wordIPA: z.string().min(1, {
        message: "Please type word's IPA!"
    }),
    wordExample: z.string().min(1, {
        message: "Please type word's example!"
    }),
    cardList: z.string()
});

interface ICreateFlashCardProps {
    refetchData?: () => void
}

const CreateFlashCard: FC<ICreateFlashCardProps> = ({ refetchData = () => { } }) => {
    const form = useForm(
        {
            resolver: zodResolver(flashCardSchema),
            defaultValues: {
                cardName: "",
                wordEMean: "",
                wordVMean: "",
                wordType: "",
                wordIPA: "",
                cardList: "" as IFlashCardList,
                wordExample: "",
            },
        }
    );
    const { openNotiSuccess, openNotiError } = useAppContext();
    const [open, setOpen] = useState(false);
    const { data: cardList } = useFetch<IFlashCardList[]>(ListFlashCardApis.getAll);

    const mapDataCardList = (data?: IFlashCardList[]): IOption[] => {
        if (!data || data.length === 0) return [];

        return data.map(item => ({
            value: item._id,
            label: item.listName
        })) as IOption[];
    }

    const onSubmit = (values: IFlashCard) => {
        if (!values.cardList) {
            openNotiError("Create card list", "Please choose card's list");
            return;
        }
        FlashCardApis.create(values).then(() => {
            setOpen(false);
            form.reset();
            openNotiSuccess("Create flash card");
            refetchData();
        }).catch(error => {
            const { response } = error;
            openNotiError("Create flash card", response?.data?.message);
        });
    }

    return (
        <>
            <Dialog open={open} onOpenChange={(open) => {
                if (!open) {
                    form.reset();
                }
                setOpen(open);
            }}>
                <DialogTrigger asChild>
                    <Button className='bg-blue-500'>Create flash card</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Create flash card</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="cardName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Card name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Type card's name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="wordEMean"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Word's English mean</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Type word's English mean" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="wordVMean"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Word's Vietnamese mean</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Type word's Vietnamese mean" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="wordType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Word type</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Type word's type" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="wordIPA"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>IPA</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Type word's IPA" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="cardList"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Card's list</FormLabel>
                                                <FormControl>
                                                    <Combobox
                                                        placeholder="Choose word's list"
                                                        options={mapDataCardList(cardList)}
                                                        {...field}
                                                        className='w-full text-muted-foreground p-3 text-[16px] h-auto'
                                                        defaultValue={""}
                                                        onSelect={(value) => form.setValue("cardList", value as IFlashCardList)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="wordExample"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Example</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Type word's example" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="my-5 w-full h-[40px]">Submit</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateFlashCard
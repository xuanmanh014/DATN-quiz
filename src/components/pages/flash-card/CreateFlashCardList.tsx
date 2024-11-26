"use client";

import { ListFlashCardApis } from '@/apis/flash-card/index.api';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/contexts/app'
import { IFlashCardList } from '@/types/flash-card/index.type'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const flashCardListSchema = z.object({
    listName: z.string().min(1, {
        message: "Please type list's name!"
    }),
    listDescription: z.string().min(1, {
        message: "Please type list's description!"
    }),
});

interface ICreateFlashCardListProps {
    refetchData?: () => void
}

const CreateFlashCardList: FC<ICreateFlashCardListProps> = ({ refetchData = () => { } }) => {
    const form = useForm(
        {
            resolver: zodResolver(flashCardListSchema),
            defaultValues: {
                listName: "",
                listDescription: "",
            },
        }
    );
    const { openNotiSuccess, openNotiError } = useAppContext();
    const [open, setOpen] = useState(false);

    const onSubmit = (values: IFlashCardList) => {
        ListFlashCardApis.create(values).then(() => {
            setOpen(false);
            form.reset();
            openNotiSuccess("Create flash card list");
            refetchData();
        }).catch(error => {
            const { response } = error;
            openNotiError("Create flash card list", response?.data?.message);
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
                    <Button className='bg-blue-500'>Create flash card list</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Create flash card</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="listName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>List name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Type list's name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="listDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>List's description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Type list's description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="my-5 w-full h-[40px]">Submit</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateFlashCardList
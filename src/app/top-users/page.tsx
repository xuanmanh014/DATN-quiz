import { OnlineTimeApis } from '@/apis/online-time/index.api';
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ISession } from '@/types/session/index.type';
import { millisecondsToMinutes } from '@/utils/utils';
import React from 'react'

const fetchOnlineUser = async () => {
    const response = await OnlineTimeApis.getAllOnlineUser();

    return response.data || [];
}

const TopUsersPage = async () => {
    const users: ISession[] = await fetchOnlineUser();

    return (
        <div className='grid grid-cols-2 gap-10'>
            <div className="col-span-1 border border-gray-200 shadow-lg rounded-lg p-5">
                <h2 className='text-[25px] font-medium'>{"Top 30 users (last 7 days)"}</h2>
                <Separator className='my-4' />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead>User's name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Online time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => {
                            return (
                                <TableRow key={user._id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{user.userId?.firstName} {user.userId?.lastName}</TableCell>
                                    <TableCell>{user.userId?.email}</TableCell>
                                    <TableCell>{millisecondsToMinutes(user.duration || 0, true)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className="col-span-1 border border-gray-200 shadow-lg rounded-lg p-5">
                <h2 className='text-[25px] font-medium'>{"Top 30 users (last 30 days)"}</h2>
                <Separator className='my-4' />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead>User's name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Online time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => {
                            return (
                                <TableRow key={user._id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{user.userId?.firstName} {user.userId?.lastName}</TableCell>
                                    <TableCell>{user.userId?.email}</TableCell>
                                    <TableCell>{millisecondsToMinutes(user.duration || 0, true)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default TopUsersPage
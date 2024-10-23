import { UserApis } from '@/apis/user/index.api';
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IUser } from '@/types/user/index.type';
import React from 'react'

const fetchUsers = async () => {
    const response = await UserApis.getAll();

    return response.data || [];
}

const TopUsersPage = async () => {
    const users: IUser[] = await fetchUsers();

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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => {
                            return (
                                <TableRow key={user._id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => {
                            return (
                                <TableRow key={user._id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
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
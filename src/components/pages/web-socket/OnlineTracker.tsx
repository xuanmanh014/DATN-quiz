"use client";

import { getMe } from '@/apis/auth/index.api';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8888/online-time';

const OnlineTracker = () => {
    let socket: Socket;
    const tokenDecoded = getMe();

    useEffect(() => {
        if (tokenDecoded) {
            socket = io(SOCKET_URL, {
                query: { userId: tokenDecoded?._id },
            });

            socket.on('connect', () => {
                console.log('Connected to server');
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [tokenDecoded]);

    return <></>;
};

export default OnlineTracker;

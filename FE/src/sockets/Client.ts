import {useEffect} from 'react';
import {io} from 'socket.io-client';
import {useAppDispatch} from '@store/hooks';
import {setConnectedStatus} from '@store/sockets/socketSlice.ts';

export const socket = io(`${import.meta.env.VITE_SERVER_URL}`, {
    autoConnect: false,
});

export const Client = () => {
    const dispatch = useAppDispatch();

    const onConnect = () => {
        dispatch(setConnectedStatus({isConnected: true}));
    }

    const onDisconnect = () => {
        dispatch(setConnectedStatus({isConnected: false}));
    }

    useEffect(() => {
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);
};
import {useEffect} from 'react';
import {socket} from '@socket/Client';
import {useAppSelector} from '@store/hooks';
import {GetChatListParams} from '@interfaces/chat.ts';
import API from '@api';

export const useSocketSubscribe = () => {
    const isConnected = useAppSelector(state => state.socketIO.isConnected);
    const user = useAppSelector(state => state.user);
    const {supportRequestApi} = API();

    useEffect(() => {
        const query: GetChatListParams = {
            userId: user.id,
            isActive: true,
        }

        if (user.role === 'manager' || user.role === 'admin') {
            query.userId = null;
        }

        supportRequestApi.findRequests(query)
            .then(result => {
                const {data} = result;
                if (isConnected) {
                    data && data.forEach((el: any) => {
                        socket.emit('subscribeToChat', {chatId: el._id})
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [isConnected]);
};
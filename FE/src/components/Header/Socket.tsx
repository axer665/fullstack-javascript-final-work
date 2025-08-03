import iziToast from "izitoast";
import {useSocket} from "@hooks/useSocket.ts";
import {useSocketEvent} from "@hooks/useSocketEvent.ts";
import {useSocketSubscribe} from "@hooks/useSocketSubscribe.ts";
import {SocketDto} from "@interfaces/socket.ts";
import {useAppSelector} from "@store/hooks.ts";

function Socket() {
    const user = useAppSelector(state => state.user);
    useSocket();
    useSocketSubscribe();
    const listener = (socketDto: SocketDto) => {
        if (user.id !== socketDto.author.id) {
            iziToast.info({
                message: `Пользователь ${socketDto.author.name} написал сообщение`,
                position: 'topRight',
            });
        }
    };
    useSocketEvent('subscribeToChat', listener);
    useSocketEvent('newMessage', listener);

    return (
        <></>
    )
}

export default Socket;
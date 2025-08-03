import iziToast from "izitoast";
import {useEffect, useState} from "react";
import {Button, Col, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useSocketEvent} from "@hooks/useSocketEvent.ts";
import {useAppSelector} from "@store/hooks.ts";
import {SocketDto} from "@interfaces/socket.ts";

import API from "@api";

import Form from "@components/Chat/Form.tsx";
import Loader from "@components/Loader.tsx";
import Messages from "@components/Chat/Messages.tsx";

function Chat() {
    const user = useAppSelector(state => state.user);

    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [messages, setMessages] = useState<any>([]);

    const {supportRequestApi} = API();

    const listener = (socketDto: SocketDto) => {
        if (user.id !== socketDto.author.id) {
            setMessages([...messages, {
                _id: socketDto._id,
                authorId: socketDto.author.id,
                text: socketDto.text,
                sentAt: socketDto.sentAt,
            }])
        }
    };
    useSocketEvent('subscribeToChat', listener);

    useEffect(() => {
        // Если не хватает параметров - ошибка... дальше не работаем
        if (!queryParams.get('id') || !queryParams.get('email')) {
            navigate('/error');
            return;
        }

        const requestUserId: any = user.id;
        const supportRequestId: any = queryParams.get('id');

        supportRequestApi.getMessages(supportRequestId, requestUserId)
            .then(result => {
                setLoading(false);
                setMessages(result.data);
                supportRequestApi.readMessages({
                    userId: requestUserId,
                    supportRequestId,
                    createdBefore: new Date(),
                }).then(() => {
                });
            })
            .catch(err => {
                setError(true);
                iziToast.error({
                    message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
                    position: 'topRight',
                });
            });
    }, []);

    const closeRequest = () => {
        try {
            const supportRequestId: any = queryParams.get('id');

            supportRequestApi.closeRequest(supportRequestId)
                .then(() => {
                    iziToast.success({
                        message: 'Обращение закрыто. Вы хорошо поработали.',
                        position: 'topRight',
                    });
                    navigate(-1);
                })
                .catch(err => {
                    iziToast.error({
                        message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
                        position: 'topRight',
                    });
                });
        } catch (error) {
            console.error(error);
        }
    }

    const sendMessage = (text: string) => {
        try {
            const supportRequestId: any = queryParams.get('id');

            const sendMessageDto: any = {
                supportRequestId,
                authorId: user.id,
                text,
            }

            if (text.length === 0) {
                iziToast.warning({
                    message: 'Кажется, вы не ввели текст сообщения',
                    position: 'topRight',
                });
            }

            supportRequestApi.sendMessage(sendMessageDto)
                .then(result => {
                    setMessages([...messages, result.data]);
                })
                .catch(err => {
                    iziToast.error({
                        message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
                        position: 'topRight',
                    });
                });
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div>
            <Container className="bg-white rounded shadow-sm p-2 mb-3">
                <Col>
                    <p className="fs-2 fw-bold">Чат с пользователем</p>
                    <p className="text-muted">Пользователь: {queryParams.get('email')}</p>
                    {(user.role === 'admin' || user.role === 'manager') &&
                        <Button variant="danger" onClick={closeRequest}>Закрыть</Button>
                    }
                </Col>
            </Container>
            {loading ? (
                <Loader/>
            ) : (
                error ? (
                    <p className="text-center">Не удалось получить список сообщений</p>
                ) : (
                    <>
                        <Messages messages={messages}/>
                        <Form sendMessage={sendMessage}/>
                    </>
                )
            )}
        </div>
    )
}

export default Chat;

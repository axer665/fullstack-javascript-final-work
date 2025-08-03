import {MessageProps} from "@interfaces/chat.ts";
import MessageItem from "@components/Chat/MessageItem.tsx";
import {useEffect, useRef} from "react";

function Messages(data: MessageProps) {
    const {messages} = data;

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToEnd = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        scrollToEnd();
    }, [messages]);

    return (
        <div className="bg-white p-2 mb-3">
            <div
                style={{overflowY: "scroll", maxHeight: "400px"}}
                className="d-flex flex-column"
                ref={messagesEndRef}
            >
                {messages.length > 0 ? (
                    messages.map(elem =>
                        <MessageItem key={elem._id} message={elem}/>
                    )
                ) : (
                    <p className="text-muted text-center">Сообщений нет</p>
                )}
            </div>
        </div>
    )
}

export default Messages;
import {Card} from "react-bootstrap";
import {useAppSelector} from "@store/hooks.ts";
import {MessageItemProps} from "@interfaces/chat.ts";

function MessageItem(data: MessageItemProps) {
    const {message} = data;
    const user = useAppSelector(state => state.user);

    let background = '#F2994A';
    if (message.authorId !== user.id) {
        background = '#F2F2F7';
    }

    return (
        <Card style={{maxWidth: '300px', background}}
              className={message.authorId !== user.id ? "align-self-end m-3" : "align-self-start m-3"}>
            <Card.Body>
                <Card.Subtitle
                    className="mb-2 text-muted">{new Date(message.sentAt).toLocaleDateString()}</Card.Subtitle>
                <Card.Text>
                    {message.text}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default MessageItem;

import {useState} from "react";
import {Button} from "react-bootstrap";
import {formProps} from "@interfaces/chat";

function Form(data: formProps) {
    const {sendMessage} = data;
    const [text, setText] = useState<string>();

    return (
        <form>
            <input
                required
                className="mb-2 form-control"
                placeholder="Сообщение"
                aria-label="Сообщение"
                aria-describedby="send_message"
                onChange={(e) => setText(e.target.value)}
            />
            <Button id="send_message mt-1" onClick={() => sendMessage(text)} type="reset">
                Отправить
            </Button>
        </form>
    )
}

export default Form;

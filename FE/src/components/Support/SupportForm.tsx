import iziToast from "izitoast";
import {useState} from "react";
import {Button} from "react-bootstrap";
import {useAppSelector} from "@store/hooks";
import API from "@api";

function SupportForm() {
    const [message, setMessage] = useState<string>('');
    const userId = useAppSelector(state => state.user.id);
    const {supportRequestApi} = API();

    const onSubmit = async (e: any) => {
        try {
            e.preventDefault();

            if (message.length > 1000) {
                iziToast.warning({
                    message: 'Слишком объемное сообщение. Постарайтесь уместить всё в 1000 символов... не больше',
                    position: 'topRight',
                });
                return;
            }

            supportRequestApi.createRequest({userId, message})
                .then(() => {
                    iziToast.success({
                        message: 'Сообщение отправлено',
                        position: 'topRight',
                    });
                    window.location.reload();
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
        <form className="mb-3" onSubmit={onSubmit}>
            <div className="form-group mb-3">
                <label>Текст обращения</label>
                <textarea rows={7} className="form-control mb-3" maxLength={1000} placeholder="Сообщение"
                          onChange={(e) => setMessage(e.target.value)} required/>
            </div>

            <Button variant="success" type="submit" className="me-2">
                Создать
            </Button>
            <Button variant="secondary" type="reset">
                Очистить
            </Button>
        </form>
    )
}

export default SupportForm;

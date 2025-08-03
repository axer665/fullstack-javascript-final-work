import iziToast from "izitoast";
import {useState} from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import API from "@api";
import {useAppDispatch} from "@store/hooks.ts";
import {login} from "@store/users/userSlice.ts";

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {authUser} = API();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            if (email.length === 0) {
                iziToast.warning({
                    message: 'Поле E-mail обязательно для заполнения',
                    position: 'topRight',
                });
                return;
            }

            if (email.length === 0) {
                iziToast.warning({
                    message: 'E-mail не может быть пустым',
                    position: 'topRight',
                });
                return;
            }

            if (password.length < 6) {
                iziToast.warning({
                    message: 'Пароль не может быть короче 6 символов',
                    position: 'topRight',
                });
                return;
            }

            authUser.login(email, password)
                .then(result => {
                    console.log(result);
                    dispatch(login({token: result.data.token, role: result.data.role, id: result.data.id}));
                    iziToast.success({
                        message: 'Вы авторизовались в системе',
                        position: 'topRight',
                    });
                    navigate('/');
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
            <div className="mb-3">
                <label htmlFor="email">E-mail</label>
                <input id="email" className="form-control" type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required/>
            </div>

            <div className="mb-3">
                <label htmlFor="password">Пароль</label>
                <input id="password" className="form-control" type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <Button className="w-100" variant="primary" type="submit">
                Войти
            </Button>
        </form>
    )
}

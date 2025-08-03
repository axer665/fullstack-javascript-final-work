import iziToast from "izitoast";
import {useState} from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import API from "@api";
import {useAppDispatch} from "@store/hooks";
import {login} from "@store/users/userSlice.ts";
import {RegistrationData} from "@interfaces/auth.ts";

export default function Registration() {
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        email: '',
        name: '',
        password: '',
    });
    const {authUser} = API();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            if (registrationData.email.length === 0) {
                iziToast.warning({
                    message: 'Поле E-mail не может быть пустым',
                    position: 'topRight',
                });
                return;
            }

            if (registrationData.name.length === 0) {
                iziToast.warning({
                    message: 'Поле E-mail не может быть пустым',
                    position: 'topRight',
                });
                return;
            }

            if (registrationData.password.length < 6) {
                iziToast.warning({
                    message: 'Пароль не может быть короче 6 символов',
                    position: 'topRight',
                });
                return;
            }

            authUser.register(registrationData)
                .then(result => {
                    dispatch(login({token: result.data.token, role: result.data.role, id: result.data.id}));
                    iziToast.success({
                        message: 'Регистрация прошла успешно',
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
            <div className="form-group mb-3">
                <label htmlFor="email">E-mail</label>
                <input id="email" className="form-control" type="email" placeholder="E-mail"
                       onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})} required/>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="name">Имя</label>
                <input id="name" className="form-control" type="text" placeholder="Имя"
                       onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})} required/>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="phone">Телефон</label>
                <input id="phone" className="form-control" type="tel" placeholder="Контактный телефон"
                       onChange={(e) => setRegistrationData({...registrationData, contactPhone: e.target.value})}/>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="password">Пароль</label>
                <input id="password" className="form-control" type="password" placeholder="Пароль"
                       onChange={(e) => setRegistrationData({...registrationData, password: e.target.value})} required/>
            </div>

            <Button className="w-100" variant="primary" type="submit">
                Зарегистрироваться
            </Button>
        </form>
    )
}


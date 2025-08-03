import {useState} from "react";
import {Button, Container} from "react-bootstrap";
import {useAuth} from "@hooks/useAuth.ts";
import Login from "@components/Header/Forms/Login.tsx";
import Registration from "@components/Header/Forms/Registration";
import Profile from "@components/Header/Profile.tsx";

function Auth() {
    const isAuth = useAuth();
    const [authForm, setAuthForm] = useState(true);

    return (
        <Container>
            {isAuth ? (
                <Profile/>
            ) : (
                authForm ? (
                    <>
                        <Login/>
                        <div>
                            <Button className="w-100" variant="info" onClick={() => setAuthForm(!authForm)}>
                                Регистрация
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <Registration/>
                        <div>
                            <Button className="w-100" variant="info" onClick={() => setAuthForm(!authForm)}>
                                Авторизация
                            </Button>
                        </div>
                    </>
                )
            )}
        </Container>
    )
}

export default Auth;

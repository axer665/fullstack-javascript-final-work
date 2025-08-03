import {ListGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useAuth} from "@hooks/useAuth.ts";
import {useAppSelector} from "@store/hooks.ts";

function NavbarMenu() {
    const role = useAppSelector(state => state.user.role);
    const isAuth = useAuth();

    return (
        <ListGroup variant="flush" className="shadow-sm rounded text-center">
            <ListGroup.Item action>
                <NavLink className="text-decoration-none text-secondary fw-bold" to="/">
                    Поиск гостиницы
                </NavLink>
            </ListGroup.Item>
            {isAuth &&
                <ListGroup.Item action>
                    <NavLink className="text-decoration-none text-secondary fw-bold" to="/requests">
                        Обращения
                    </NavLink>
                </ListGroup.Item>
            }
            {role === 'admin' &&
                <ListGroup.Item action>
                    <NavLink className="text-decoration-none text-secondary fw-bold" to="/all-hotels">
                        Все гостиницы
                    </NavLink>
                </ListGroup.Item>
            }
            {(role === 'admin' || role === 'manager') &&
                <ListGroup.Item action>
                    <NavLink className="text-decoration-none text-secondary fw-bold" to="/users">
                        Пользователи
                    </NavLink>
                </ListGroup.Item>
            }
        </ListGroup>
    )
}

export default NavbarMenu

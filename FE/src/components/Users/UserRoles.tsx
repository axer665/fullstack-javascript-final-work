import iziToast from "izitoast";
import {Button, Dropdown, DropdownButton, Pagination} from "react-bootstrap";
import {Link} from "react-router-dom";

import API from "@api";
import {useAppDispatch, useAppSelector} from "@store/hooks.ts";
import {setUsersState} from "@store/users/usersSlice.ts";
import {UserProps} from "@interfaces/user.ts";

function UserRoles(data: UserProps) {
    const usersState = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();
    const {list} = data;
    const {usersApi} = API();

    const nextPage = (data: string) => {
        try {
            if (data === 'plus') {
                dispatch(setUsersState({offset: usersState.offset + usersState.limit}));
            } else if (data === 'minus') {
                dispatch(setUsersState({offset: usersState.offset - usersState.limit}));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const changeRole = async (id: string, role: string) => {
        try {
            usersApi.updateRole(id, role)
                .then(result => {
                    iziToast.success({
                        message: `Пользователю ${result.data.email} успешно установлена роль "${role}"`,
                        position: 'topRight',
                    });
                    dispatch(setUsersState({render: !usersState.render}));
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
            <table className="p-2 rounded text-center table table-striped">
                <thead className="table-dark">
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Телефон</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Роль</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {list.map(elem =>
                    <tr key={elem._id}>
                        <td>{elem.name}</td>
                        <td>{elem.contactPhone}</td>
                        <td>{elem.email}</td>
                        <td>{elem.role}</td>
                        <td>
                            <Link to={`/reservations?id=${elem._id}`}>
                                <Button variant="warning" className="mb-1">Бронирования</Button>
                            </Link>
                            <DropdownButton title="Выдать роль">
                                <Dropdown.Item
                                    onClick={() => changeRole(elem._id, 'client')}>Клиент</Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => changeRole(elem._id, 'manager')}>Менеджер</Dropdown.Item>
                                <Dropdown.Item onClick={() => changeRole(elem._id, 'admin')}>Админ</Dropdown.Item>
                                <Dropdown.Item onClick={() => changeRole(elem._id, 'test')}>Несуществующая роль</Dropdown.Item>
                            </DropdownButton>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <Pagination className="mt-3">
                {usersState.offset > 0 &&
                    <Pagination.Item onClick={() => nextPage('minus')}>
                        Назад
                    </Pagination.Item>
                }
                {usersState.list.length >= usersState.limit &&
                    <Pagination.Item onClick={() => nextPage('plus')}>
                        Далее
                    </Pagination.Item>
                }
            </Pagination>
        </div>
    )
}

export default UserRoles;

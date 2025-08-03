import iziToast from "izitoast";
import {useEffect, useState} from "react";
import API from "@api";
import {useAppDispatch, useAppSelector} from "@store/hooks.ts";
import {setUsersState} from "@store/users/usersSlice.ts";
import Loader from "@components/Loader.tsx";
import UserRoles from "@components/Users/UserRoles.tsx";

function List() {
    const usersState = useAppSelector(state => state.users);

    const [error, setError] = useState<boolean>(false);
    const {usersApi} = API();

    const dispatch = useAppDispatch();

    useEffect(() => {
        setError(false);

        dispatch(setUsersState({loading: true}));

        usersApi.search({
            limit: usersState.limit,
            offset: usersState.offset,
            email: usersState.email,
            name: usersState.name,
            contactPhone: usersState.contactPhone,
        })
            .then(result => {
                if (result.data.length > 0) {
                    dispatch(setUsersState({list: result.data, loading: false}));
                } else {
                    dispatch(setUsersState({offset: 0, loading: false}));
                }
            })
            .catch(err => {
                setError(true);
                iziToast.error({
                    message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
                    position: 'topRight',
                });
            });
    }, [usersState.offset, usersState.email, usersState.name, usersState.contactPhone, usersState.render]);

    return (
        <>
            {usersState.loading ? (
                <Loader/>
            ) : (
                error ? (
                    <p>Произошла ошибка при загрузке списка пользователей!</p>
                ) : (
                    <UserRoles list={usersState.list}/>
                )
            )}
        </>
    )
}

export default List
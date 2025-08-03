import {useEffect} from "react";
import {Container} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "@store/hooks.ts";
import {setUsersState} from "@store/users/usersSlice.ts";

import List from "@components/Users/List.tsx";
import SearchUser from "@components/Users/SearchUser.tsx";

function Users() {

    const usersState = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (usersState.offset !== 0 || usersState.email.length !== 0 || usersState.name.length !== 0 || usersState.contactPhone.length !== 0) {
            dispatch(setUsersState({offset: 0, email: '', name: '', contactPhone: ''}));
        }
    }, []);

    return (
        <Container className="bg-white">
            <div>
                <p className="fs-2 fw-bold">Пользователи</p>
                <SearchUser/>
            </div>
            <List/>
        </Container>
    )
}

export default Users
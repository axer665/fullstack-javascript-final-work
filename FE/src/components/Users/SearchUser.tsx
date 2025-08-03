import React, {useState} from "react";
import {useAppDispatch} from "@store/hooks.ts";
import {setUsersState} from "@store/users/usersSlice.ts";
import {SearchUsersDto} from "@interfaces/user.ts";

function SearchUser() {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const dispatch = useAppDispatch();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const searchData: Partial<SearchUsersDto> = {
                offset: 0,
                email,
                name,
                contactPhone: phone,
            };

            dispatch(setUsersState(searchData));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="mb-3" onSubmit={onSubmit}>
            <input type="text" className="mb-3 w-100 form-control" placeholder="Имя пользователя"
                          onChange={(e) => setName(e.target.value)}/>
            <input type="text" className="mb-3 w-100 form-control" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
            <input type="tel" className="mb-3 w-100 form-control" placeholder="Телефон" onChange={(e) => setPhone(e.target.value)}/>
            <button type="submit" className="mb-3 btn btn-primary">
                Поиск
            </button>
        </form>
    )
}

export default SearchUser

import iziToast from "izitoast";
import {useEffect, useState} from "react";
import API from "@api";
import {useAppSelector} from "@store/hooks.ts";
import {GetChatListParams} from "@interfaces/chat.ts";
import Loader from "@components/Loader.tsx";
import ListView from "@components/Support/ListView.tsx";

function List() {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [list, setList] = useState<any>([]);
    const user = useAppSelector(state => state.user);
    const {supportRequestApi} = API();

    useEffect(() => {
        setError(false);
        setLoading(true);

        const query: GetChatListParams = {
            userId: user.id,
            isActive: true,
        }

        if (user.role === 'manager' || user.role === 'admin') {
            query.userId = null;
        }

        supportRequestApi.findRequests(query)
            .then(result => {
                setList(result.data);
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                iziToast.error({
                    message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
                    position: 'topRight',
                });
            });
    }, []);

    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                error ? (
                    <p>Не удалось загрузить обращения</p>
                ) : (
                    <ListView list={list}/>
                )
            )}
        </>
    )
}

export default List;

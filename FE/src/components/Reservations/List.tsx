import iziToast from "izitoast";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "@api";
import {useAppSelector} from "@store/hooks.ts";
import Loader from "@components/Loader.tsx";
import ListView from "@components/Reservations/ListView.tsx";

function List() {
    const userId = useAppSelector(state => state.user.id);
    const queryParams = new URLSearchParams(location.search);
    const {reservationsApi} = API();
    const navigate = useNavigate();

    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [list, setList] = useState<any>([]);
    const [reload, setReload] = useState<boolean>(false);

    const handleDeleteReservation = (reservationId: string) => {
        try {
            reservationsApi.removeReservation(reservationId, userId)
                .then(() => {
                    iziToast.success({
                        message: 'Бронь удалена',
                        position: 'topRight',
                    });
                    setReload(!reload);
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

    useEffect(() => {
        setError(false);
        setLoading(true);

        if (!queryParams.get('id')) {
            navigate('/error');
            return;
        }

        const id: any = queryParams.get('id');

        reservationsApi.search({userId: id})
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
    }, [reload]);

    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                error ? (
                    <div> Что-то пошло не так при загрузке броней </div>
                ) : (
                    <ListView list={list} handleDelete={handleDeleteReservation}/>
                )
            )}
        </>
    )
}

export default List
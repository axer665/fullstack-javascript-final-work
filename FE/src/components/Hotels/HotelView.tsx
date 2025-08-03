import iziToast from "izitoast";
import {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import API from "@api";
import {useAppDispatch, useAppSelector} from "@store/hooks.ts";
import {setHotelsState} from "@store//hotels/hotelsSlice.ts";
import Loader from "@components/Loader.tsx";
import HotelRoomsList from "@components/Hotels/Rooms/RoomList.tsx";
import HotelsListItem from "@components/Hotels/HotelList/HotelListItem.tsx";

export default function HotelView() {
    // идёт ли подгрузка данных
    const [loading, setLoading] = useState<boolean>(true);
    // есть ли ошибки
    const [error, setError] = useState<boolean>(false);
    // роль пользователя
    const role = useAppSelector(state => state.user.role);
    // как там состояние отелей
    const hotelsState = useAppSelector(state => state.hotels);
    // Получаем api для отелей
    const {hotelsAPI} = API();

    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const dispatch = useAppDispatch();

    useEffect(() => {
        // пошла загрузка
        setLoading(true);
        // ошибок нет
        setError(false);

        // если в GET параметрах нет id, то что-то не так...
        if (!queryParams.get('id')) {
            // переходим на ошибку (и автоматом поймаем redirect на error404)
            navigate('/error');
            return;
        }

        const id: any = queryParams.get('id');

        // Обращаемся к API
        hotelsAPI.findById(id)
            .then(result => {
                // обновили состояние
                dispatch(setHotelsState({currentHotel: result.data}));
                // загрузка окончена
                setLoading(false);
            })
            .catch(err => {
                // схватили ошибку
                setError(true);
                // выдали сообщение об ошибке
                iziToast.error({
                    message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
                    position: 'topRight',
                });
            });
    }, []);

    return (
        <div>
            <Container className="bg-white rounded shadow-sm p-2 mb-3">
                <Container>
                    <p className="fs-2 fw-bold">Информация об отеле</p>
                    {role === 'admin' &&
                        <Link to={`/update-hotel`}>
                            <Button variant="warning" className="me-1 mb-2">Редактировать</Button>
                        </Link>
                    }
                </Container>
            </Container>
            {loading ? (
                <Loader/>
            ) : (
                error ? (
                    <p>Произошла ошибка при загрузке отеля!</p>
                ) : (
                    <>
                        <HotelsListItem hotel={hotelsState.currentHotel} showBtn={false}/>
                        {role === 'admin' &&
                            <Link to={`/add-room?${hotelsState.currentHotel._id}`}
                                  className="ms-auto text-decoration-none">
                                <div className="d-grid gap-2 mb-3">
                                    <Button variant="success" size="lg">Добавить номер</Button>
                                </div>
                            </Link>
                        }
                        <HotelRoomsList/>
                    </>
                )
            )}
        </div>
    )
}

import iziToast from "izitoast";
import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import API from "@api";
import {useAppDispatch, useAppSelector} from "@store/hooks.ts";
import {setRoomsState} from "@store/rooms/roomsSlice.ts";
import Loader from "@components/Loader.tsx";
import RoomItems from "@components/Hotels/Rooms/RoomItems.tsx";

function RoomList() {
    const dispatch = useAppDispatch();
    const [error, setError] = useState<boolean>(false);
    const {roomsApi} = API();

    const roomsState = useAppSelector(state => state.rooms);
    const currentHotel = useAppSelector(state => state.hotels.currentHotel);


    useEffect(() => {
        setError(false);

        dispatch(setRoomsState({loading: true}));

        roomsApi.search({
            limit: roomsState.limit,
            offset: roomsState.offset,
            title: roomsState.titleSearch,
            hotel: currentHotel._id,
            isEnabled: true
        })
            .then(result => {
                if (result.data.length > 0) {
                    dispatch(setRoomsState({list: result.data, loading: false}));
                } else {
                    dispatch(setRoomsState({offset: 0, loading: false, list: []}));
                }
            })
            .catch(err => {
                setError(true);
                iziToast.error({
                    message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
                    position: 'topRight',
                });
            });
    }, [roomsState.offset, roomsState.titleSearch]);

    return (
        <>
            <Container className="bg-white rounded shadow-sm p-2 mb-3 text-center">
                <Row>
                    <Col>
                        <p className="fs-4 fw-bold">Список номеров</p>
                    </Col>
                </Row>
            </Container>

            {roomsState.loading ? (
                <Loader/>
            ) : (
                error ? (
                    <p>Произошла ошибка при загрузке списка номеров!</p>
                ) : (
                    <RoomItems list={roomsState.list}/>
                )
            )}
        </>
    )
}

export default RoomList;

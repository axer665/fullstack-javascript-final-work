import {Container, Pagination} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "@store/hooks.ts";
import {setHotelsState} from "@store/hotels/hotelsSlice.ts";
import {RoomItemsProps} from "@interfaces/hotel.ts";
import RoomItem from "./RoomItem.tsx";

function RoomItems(data: RoomItemsProps) {
    const roomsState = useAppSelector(state => state.rooms);
    const dispatch = useAppDispatch();
    const {list} = data;

    const nextPage = async (data: string) => {
        try {
            if (data === 'plus') {
                dispatch(setHotelsState({offset: roomsState.offset + roomsState.limit}));
            } else if (data === 'minus') {
                dispatch(setHotelsState({offset: roomsState.offset - roomsState.limit}));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {list.length === 0 ? (
                <Container className="p-2 d-flex justify-content-center">
                    <span>Нет комнат для выбранного отеля</span>
                </Container>
            ) : (
                <>
                    {list.map(elem =>
                        <RoomItem key={elem._id} room={elem}/>
                    )}
                    <Pagination className="mt-3">
                        {roomsState.offset > 0 &&
                            <Pagination.Item onClick={() => nextPage('minus')}>
                                Назад
                            </Pagination.Item>
                        }
                        {roomsState.list.length >= roomsState.limit &&
                            <Pagination.Item onClick={() => nextPage('plus')}>
                                Дальше
                            </Pagination.Item>
                        }
                    </Pagination>
                </>

            )}

        </>
    )
}

export default RoomItems
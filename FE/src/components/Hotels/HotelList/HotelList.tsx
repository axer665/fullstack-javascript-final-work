import iziToast from "izitoast";
import {useEffect, useState} from "react";
import API from "@api";
import {useAppDispatch, useAppSelector} from "@store/hooks.ts";
import {setHotelsState} from "@store/hotels/hotelsSlice.ts";
import Loader from "@components/Loader.tsx";
import HotelListItems from "@components/Hotels/HotelList/HotelListItems.tsx";

function HotelList() {
    const [error, setError] = useState<boolean>(false);
    const {hotelsAPI} = API();
    const hotelsState = useAppSelector(state => state.hotels);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setError(false);

        dispatch(setHotelsState({loading: true}));

        hotelsAPI.search({
            limit: hotelsState.limit, offset: hotelsState.offset, title: hotelsState.titleSearch,
        })
            .then(result => {
                if (result.data.length > 0) {
                    dispatch(setHotelsState({list: result.data, loading: false}));
                } else {
                    dispatch(setHotelsState({offset: 0, loading: false}));
                }
            })
            .catch(err => {
                setError(true);
                iziToast.error({
                    message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
                    position: 'topRight',
                });
            });
    }, [hotelsState.offset, hotelsState.titleSearch]);

    return (
        <>
            {hotelsState.loading ? (
                <Loader/>
            ) : (
                error ? (
                    <p>Произошла ошибка при загрузке списка отелей!</p>
                ) : (
                    <HotelListItems list={hotelsState.list}/>
                )
            )}
        </>
    )
}

export default HotelList

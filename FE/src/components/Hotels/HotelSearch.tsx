import {Button, Container} from "react-bootstrap";
import HotelList from "@components/Hotels/HotelList/HotelList.tsx";
import {useState} from "react";
import {useAppDispatch} from "@store/hooks.ts";
import {setHotelsState} from "@store/hotels/hotelsSlice.ts";

function HotelSearch() {
    const [title, setTitle] = useState<string>('');
    const dispatch = useAppDispatch();

    const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            dispatch(setHotelsState({offset: 0, titleSearch: title}));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Container className="bg-white rounded shadow-sm p-2 mb-3">
                <h3 className="fs-2 fw-bold">Поиск гостиницы</h3>
                <form className="mb-3" onSubmit={searchHandler}>
                    <input type="text" className="form-control mb-3" placeholder="Название"
                           onChange={(e) => setTitle(e.target.value)}/>
                    <Button variant="primary" type="submit">
                        Искать
                    </Button>
                </form>
            </Container>
            <HotelList/>
        </>
    )
}

export default HotelSearch
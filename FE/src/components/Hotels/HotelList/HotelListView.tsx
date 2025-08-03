import {useEffect} from "react"
import {Button, Col, Container, Row, Stack} from "react-bootstrap"
import {Link} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "@store/hooks.ts"
import {setHotelsState} from "@store/hotels/hotelsSlice.ts"
import HotelList from "./HotelList"

function HotelListView() {
    const dispatch = useAppDispatch();
    const role = useAppSelector(state => state.user.role)

    useEffect(() => {
        dispatch(setHotelsState({offset: 0, titleSearch: ''}));
    }, []);

    return (
        <>
            <Container className="bg-white rounded p-2 mb-3">
                <Row>
                    <Col>
                        <Stack direction="horizontal" gap={2}>
                            <p className="fs-2 fw-bold">Все гостиницы</p>
                            {role === 'admin' &&
                                <Link to={'/add-hotel'} className="ms-auto">
                                    <Button variant="success">Добавить гостиницу</Button>
                                </Link>
                            }
                        </Stack>
                    </Col>
                </Row>
            </Container>
            <HotelList/>
        </>
    )
}

export default HotelListView
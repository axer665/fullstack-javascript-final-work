import {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import API from "@api";
import Chat from "./components/Chat/Chat.tsx";
import Error404 from "./components/Errors/Error404.tsx";
import Header from "@components/Header/Header.tsx";
import HotelView from "@components/Hotels/HotelView.tsx";
import RoomUpdate from "@components/Hotels/Rooms/RoomUpdate.tsx";
import HotelAdd from "@components/Hotels/HotelAdd.tsx";
import HotelListView from "@components/Hotels/HotelList/HotelListView.tsx";
import RoomAdd from "@components/Hotels/Rooms/RoomAdd.tsx";
import HotelSearch from "@components/Hotels/HotelSearch.tsx";
import HotelUpdate from "@components/Hotels/HotelUpdate.tsx";
import NavbarMenu from "@components/Menus/NavbarMenu.tsx";
import ReservationForm from "@components/Reservations/ReservationForm.tsx";
import Reservation from "@components/Reservations/Reservation.tsx";
import Support from "@components/Support/Support.tsx";
import Users from "@components/Users/Users.tsx";
import {get} from "@helpers/localStorage";
import {Client} from "@socket/Client.ts";
import {useAppDispatch} from "@store/hooks";
import {login, logout} from "@store/users/userSlice";

function App() {
    Client();
    const dispatch = useAppDispatch();
    const {authUser} = API();

    const checkAuth = async () => {
        const token = get('token');

        try {
            if (token) {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const {email} = JSON.parse(jsonPayload);
                authUser.getInfo(email)
                    .then(result => {
                        dispatch(login({token, role: result.data.role, id: result.data.id}));
                    })
                    .catch(() => {
                        dispatch(logout());
                    })
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <BrowserRouter>
            <Header/>
            <Container>
                <Row>
                    <Col sm={3}>
                        <NavbarMenu/>
                    </Col>
                    <Col sm={9}>
                        <Routes>
                            <Route path="/" element={<HotelSearch/>}/>

                            <Route path="/hotel" element={<HotelView/>}/>
                            <Route path="/all-hotels" element={<HotelListView/>}/>
                            <Route path="/add-hotel" element={<HotelAdd/>}/>
                            <Route path="/update-hotel" element={<HotelUpdate/>}/>

                            <Route path="/add-room" element={<RoomAdd/>}/>
                            <Route path="/update-room" element={<RoomUpdate/>}/>

                            <Route path="/reservations" element={<Reservation/>}/>
                            <Route path="/reserve-room" element={<ReservationForm/>}/>

                            <Route path="/users" element={<Users/>}/>
                            <Route path="/requests" element={<Support/>}/>

                            <Route path="/chat" element={<Chat/>}/>
                            <Route path="*" element={<Error404/>}/>
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>
    )
}

export default App

import {Col, Container, Row} from "react-bootstrap";
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
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
import AuthLayer from "app/AuthLayer.tsx";



function App() {
    return (
            <BrowserRouter>
                <AuthLayer>
                    <Header/>
                    <Container>
                        <Row>
                            <Col sm={3}>
                                <NavbarMenu/>
                            </Col>
                            <Col sm={9}>
                                <Routes>
                                    <Route path="/" element={<HotelSearch/>}/>

                                    <Route path="/hotel/:hotelId" element={<HotelView />} />
                                    <Route path="/all-hotels" element={<HotelListView/>}/>
                                    <Route path="/add-hotel" element={<HotelAdd/>}/>
                                    <Route path="/update-hotel/:hotelId" element={<HotelUpdate/>}/>

                                    <Route path="/add-room/:hotelId" element={<RoomAdd/>}/>
                                    <Route path="/update-room/:roomId" element={<RoomUpdate/>}/>

                                    <Route path="/reservations" element={<Reservation/>}/>
                                    <Route path="/reserve-room/:roomId" element={<ReservationForm/>}/>

                                    <Route path="/users" element={<Users/>}/>
                                    <Route path="/requests" element={<Support/>}/>

                                    <Route path="/chat" element={<Chat/>}/>
                                    <Route path="*" element={<Error404/>}/>
                                </Routes>
                            </Col>
                        </Row>
                    </Container>
                </AuthLayer>
            </BrowserRouter>
    )
}

export default App

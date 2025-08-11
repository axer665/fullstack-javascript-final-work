import iziToast from "izitoast";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import API from "@api";
import {useAppSelector} from "@store/hooks.ts";

function ReservationForm() {
    const navigate = useNavigate()
    const userId = useAppSelector(state => state.user.id);
    const currentHotel = useAppSelector(state => state.hotels.currentHotel);
    const currentRoom = useAppSelector(state => state.rooms.currentRoom);

    const [getCurrentHotel, setCurrentHotel] = useState(currentHotel);
    const [getCurrentRoom, setCurrentRoom] = useState(currentRoom);

    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');

    const { roomId } = useParams();
    const {reservationsApi, roomsApi, hotelsAPI} = API();

    if (!getCurrentRoom._id && roomId) {
        roomsApi.findById(roomId).then(response => {
            setCurrentRoom(response.data);
            if (response.data.hotel) {
                hotelsAPI.findById(response.data.hotel).then(resHotel => {
                    setCurrentHotel(resHotel.data);
                }).catch(errHotel => {
                    console.log(errHotel);
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const start = new Date(dateStart);
            const end = new Date(dateEnd);

            if (start >= end) {
                iziToast.error({
                    message: 'Дата окончания не может быть больше даты начала... ну сами подумайте',
                    position: 'topRight',
                });
                return;
            }

            if (start.getDate() < new Date(Date.now()).getDate()) {
                iziToast.error({
                    message: 'Дата начала не может быть меньше текущей даты',
                    position: 'topRight',
                });
                return;
            }

            const data = {
                userId,
                hotelId: currentHotel._id,
                roomId: currentRoom._id,
                dateStart,
                dateEnd,
            };

            reservationsApi.addReservation(data)
                .then(() => {
                    iziToast.success({
                        message: `Вам удалось зарезервировать номер "${currentRoom.title}" в гостинице "${currentHotel.title}"`,
                        position: 'topRight',
                    });
                    navigate(`/reservations?id=${userId}`)
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

    return (
        <div className="bg-white rounded shadow-sm p-2">
            <div>
                <h3 className="fs-2 fw-bold">Зарезервировать номер</h3>
                <p className="text-muted">Гостиница: {getCurrentHotel.title}</p>
                <p className="text-muted">Номер: {getCurrentRoom.title}</p>
                <form className="mb-3" onSubmit={onSubmit}>
                    <div className="form-group mb-3">
                        <label>Дата начала</label>
                        <input type="date" className="form-control mb-3" placeholder="Выберите дату"
                               onChange={(e) => setDateStart(e.target.value)} required/>
                    </div>

                    <div className="form-group mb-3">
                        <label>Дата окончания</label>
                        <input type="date" className="form-control mb-3" placeholder="Выберите дату"
                               onChange={(e) => setDateEnd(e.target.value)} required/>
                    </div>

                    <Button variant="success" type="submit" className="me-2">
                        Забронировать
                    </Button>
                    <Button variant="secondary" type="reset">
                        Очистить
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ReservationForm

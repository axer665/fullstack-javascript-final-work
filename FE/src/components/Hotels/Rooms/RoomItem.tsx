import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "@store/hooks.ts";
import { setRoomsState } from "@store/rooms/roomsSlice.ts";
import { RoomData } from "@interfaces/hotel.ts";
import ImageCarousel from "@components/ImageCarousel.tsx";

function RoomItem({ room }: { room: RoomData }) {
  const role = useAppSelector(state => state.user.role);
  const dispatch = useDispatch();

  return (
    <Container className="bg-white rounded shadow-sm p-2 mb-3">
      <Container>
        <Row className="mt-2">
          <Col>
            <ImageCarousel images={room.images} alt="Room image" />
          </Col>
          <Col>
            <p className="fs-3 text-uppercase">{room.title}</p>
            <textarea style={{ resize: 'none' }} className="room-description w-100" rows={7} disabled defaultValue={room.description}></textarea>
            <Link to={`/reserve-room/${room._id}`} className="text-decoration-none m-1">
              <Button onClick={() => dispatch(setRoomsState({ currentRoom: room }))}>Забронировать</Button>
            </Link>
            {role === 'admin' && 
              <Link to={`/update-room/${room._id}`} className="text-decoration-none m-1">
                <Button variant="warning" onClick={() => dispatch(setRoomsState({ currentRoom: room }))}>Редактировать</Button>
              </Link>
            }
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default RoomItem
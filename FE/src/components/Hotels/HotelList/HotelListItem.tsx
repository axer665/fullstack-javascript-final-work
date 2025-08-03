import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {HotelData} from "@interfaces/hotel.ts";
import ImageCarousel from "@components/ImageCarousel.tsx";

function HotelListItem({hotel, showBtn}: { hotel: HotelData, showBtn: boolean }) {
    return (
        <Container className="bg-white rounded shadow-sm p-2 mb-3">
            <Row className="mt-2">
                <Col>
                    <ImageCarousel images={hotel.images} alt='Hotel image'/>
                </Col>
                <Col>
                    <p className="fs-3 text-uppercase">{hotel.title}</p>
                    <textarea className="w-100" style={{resize: 'none'}} rows={10} defaultValue={hotel.description}
                              disabled></textarea>
                    {showBtn &&
                        <Link to={`/hotel?id=${hotel._id}`} className="text-decoration-none">
                            <Button className="mb-2">Подробности</Button>
                        </Link>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default HotelListItem
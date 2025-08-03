import {Button, Container, Navbar, OverlayTrigger, Popover, Row, Col} from "react-bootstrap"
import {Link} from "react-router-dom"
import Auth from "./Auth.tsx"
import logo from "@images/hotel.png"
import Socket from "@components/Header/Socket.tsx";

function Header() {
    return (
        <Container className="mb-3 mt-3">
            <Container>
                <Row>
                    <Col className="bg-white rounded p-2" sm={3}>
                        <Link className="navbar-brand fw-bold text-uppercase" to="/">
                            <img src={logo} width={35} alt="hotelSercherLogo"/>
                            Hotel Searcher
                        </Link>
                    </Col>
                    <Col className="bg-white rounded p-2" sm={9}>
                        <Navbar>
                            <Navbar.Toggle/>
                            <Navbar.Collapse className="justify-content-end">
                                <OverlayTrigger
                                    trigger="click"
                                    placement="bottom"
                                    rootClose={true}
                                    overlay={
                                        <Popover>
                                            <Popover.Header as="h3">Профиль</Popover.Header>
                                            <Popover.Body>
                                                <Auth/>
                                            </Popover.Body>
                                        </Popover>
                                    }
                                >
                                    <Button>Профиль</Button>
                                </OverlayTrigger>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
            <Socket/>
        </Container>
    )
}

export default Header
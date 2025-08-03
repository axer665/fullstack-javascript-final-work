import {Button, Col, Container, Row} from "react-bootstrap";
import {useAppSelector} from "@store/hooks.ts";
import {useState} from "react";
import useFetchData from "@api";
import {useNavigate} from "react-router-dom";
import iziToast from "izitoast";

interface payloadItem {
    key: string;
    value: string;
}

function RoomAdd() {
    const currentHotel = useAppSelector(state => state.hotels.currentHotel);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [images, setImages] = useState<any>();
    const {roomsApi} = useFetchData();
    const navigate = useNavigate();

    const onSubmit = async (e: any) => {
        try {
            e.preventDefault();

            if (title.length < 5) {
                iziToast.warning({
                    message: 'Наименование номера не может быть короче 5 символов',
                    position: 'topRight',
                });
                return;
            }

            if (title.length > 50) {
                iziToast.warning({
                    message: 'Наименование номера не может быть длиннее 50 символов',
                    position: 'topRight',
                });
                return;
            }

            if (description.length > 0) {
                if (description.length < 100) {
                    iziToast.warning({
                        message: 'Описание номера не может быть короче 100 символов',
                        position: 'topRight',
                    });
                    return;
                }
                if (description.length > 5000) {
                    iziToast.warning({
                        message: 'Описание номера не может быть длиннее 5000 символов',
                        position: 'topRight',
                    });
                    return;
                }
            }

            if (Object.keys(images).length > 10) {
                iziToast.warning({
                    message: 'Нельзя загрузить более 10 изображений',
                    position: 'topRight',
                });
                return;
            }

            let extValid = true;
            if (Object.keys(images).length > 0) {
                for (const key in images) {
                    if (Object.prototype.hasOwnProperty.call(images, key)) {
                        const image = images[key];
                        if (!image.type.includes('image')) {
                            extValid = false;
                            break;
                        }
                    }
                }
            }

            if (!extValid) {
                iziToast.warning({
                    message: 'Для загрузки подходят только изображения (.jpg, .jpeg, ,png, .webp)',
                    position: 'topRight',
                });
                return;
            }

            const formData = new FormData();

            const payload: payloadItem[] = [
                {key: 'hotel', value: currentHotel._id},
                {key: 'title', value: title},
                {key: 'description', value: description}
            ]
            payload.forEach((item: payloadItem) => {
                formData.append(item.key, item.value)
            })

            for (const key in images) {
                if (Object.prototype.hasOwnProperty.call(images, key)) {
                    const image = images[key];
                    formData.append('images', image);
                }
            }

            roomsApi.addRoom(formData)
                .then(result => {
                    iziToast.success({
                        message: `Номер ${result.data.title} успешно добавлен`,
                        position: 'topRight',
                    });

                    navigate(-1);
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
        <Container className="bg-white rounded shadow-sm p-2">
            <Row>
                <Col>
                    <h3 className="fs-2 fw-bold">Добавить номер</h3>
                    <p className="text-muted">Отель: {currentHotel.title}</p>

                    <form className="mb-3" onSubmit={onSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="room_name">Наименование номера</label>
                            <input id="room_name" type="text" className="form-control mb-3" placeholder="Наименование"
                                   onChange={(e) => setTitle(e.target.value)} required/>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="room_description">Описание (не более 5000 символов)</label>
                            <textarea id="room_description" rows={7} className="form-control mb-3" maxLength={5000}
                                      placeholder="Описание номера"
                                      onChange={(e) => setDescription(e.target.value)}/>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="room_images">Изображения номера (не более 10)</label>
                            <input id="room_images" type="file" className="form-control" multiple accept="image/*"
                                   onChange={(e: any) => setImages(e.target.files)}/>
                        </div>

                        <Button variant="success" type="submit" className="me-2">
                            Создать
                        </Button>
                        <Button variant="secondary" type="reset">
                            Очистить
                        </Button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default RoomAdd
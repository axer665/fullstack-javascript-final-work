import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "@store/hooks.ts";
import iziToast from "izitoast";

import React, {ChangeEvent, useState} from "react";
import useFetchData from "@api";


function HotelUpdate() {

    const currentHotel = useAppSelector(state => state.hotels.currentHotel);
    const [title, setTitle] = useState<string>(currentHotel.title);
    const [description, setDescription] = useState<string>(currentHotel.description);
    const [images, setImages] = useState<FileList | null>(null);
    const {hotelsAPI} = useFetchData();
    const navigate = useNavigate();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImages(files);
        } else {
            setImages(null);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            if (title.length < 5) {
                iziToast.warning({
                    message: 'Наименование отеля не может быть короче 5 символов',
                    position: 'topRight',
                });
                return;
            }

            if (title.length > 50) {
                iziToast.warning({
                    message: 'Наименование отеля не может быть длиннее 50 символов',
                    position: 'topRight',
                });
                return;
            }

            if (description.length > 0) {
                if (description.length < 100) {
                    iziToast.warning({
                        message: 'Описание отеля не может быть короче 100 символов',
                        position: 'topRight',
                    });
                    return;
                }
                if (description.length > 5000) {
                    iziToast.warning({
                        message: 'Описание отеля не может быть длиннее 5000 символов',
                        position: 'topRight',
                    });
                    return;
                }
            }

            if (images && Object.keys(images).length > 10) {
                iziToast.warning({
                    message: 'Нельзя загрузить более 10 изображений',
                    position: 'topRight',
                });
                return;
            }

            let extValid = true;
            if (images && Object.keys(images).length > 0) {
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
            formData.append('title', title);
            formData.append('description', description);
            if (images) {
                for (const key in images as FileList) {
                    if (Object.prototype.hasOwnProperty.call(images, key)) {
                        const image = images[key];
                        formData.append('images', image);
                    }
                }
            }

            hotelsAPI.updateHotel(formData, currentHotel._id)
                .then(result => {
                    iziToast.success({
                        message: `Гостиница ${result.data.title} успешно обновлена`,
                        position: 'topRight',
                    });

                    navigate('/all-hotels');
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
                    <h3 className="fs-2 fw-bold">Отредактировать отель</h3>
                    <form className="form-group mb-3" onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label>Наименование отеля</label>
                            <input type="text" className="form-control mb-3" placeholder="Наименование" value={title}
                                   onChange={(e) => setTitle(e.target.value)} required/>
                        </div>

                        <div className="form-group mb-3">
                            <label>Описание (не более 5000 символов)</label>
                            <textarea rows={7} className="form-control mb-3" maxLength={5000}
                                      placeholder="Описание отеля" value={description}
                                      onChange={(e) => setDescription(e.target.value)}/>
                        </div>

                        <div className="form-group mb-3">
                            <label>Изображения отеля (не более 10)</label>
                            <input type="file" className="form-control" multiple accept="image/*"
                                   onChange={handleFileChange}/>
                        </div>

                        <Button variant="success" type="submit" className="me-2">
                            Изменить
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

export default HotelUpdate
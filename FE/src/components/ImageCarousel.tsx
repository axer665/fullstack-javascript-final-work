import {Carousel, Figure} from "react-bootstrap"
import noImage from "@images/no-image.jpg"

function ImageCarousel({images, alt}: { images: string[], alt: string }) {
    return (
        <Carousel data-bs-theme="dark">
            {images.length === 0 ? (
                <Carousel.Item>
                    <Figure>
                        <Figure.Image
                            className="rounded"
                            width={500}
                            height={300}
                            alt={alt}
                            src={noImage}
                        />
                    </Figure>
                </Carousel.Item>
            ) : (
                images.map((elem, i) =>
                    <Carousel.Item key={i}>
                        <Figure>
                            <Figure.Image
                                className="rounded"
                                width={500}
                                height={300}
                                alt={alt}
                                src={window.location.origin + '/hotels/' + elem}
                            />
                        </Figure>
                    </Carousel.Item>
                )
            )}
        </Carousel>
    )
}

export default ImageCarousel

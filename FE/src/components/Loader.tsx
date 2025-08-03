import {Spinner} from "react-bootstrap"

function Loader() {
    return (
        <div className="p-2 d-flex justify-content-center mt-2">
            <Spinner animation="grow" variant="primary"/>
        </div>
    )
}

export default Loader

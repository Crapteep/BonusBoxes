import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">

            <Spinner animation="border" role="status">
                <span className="vissally-hidden"></span>
            </Spinner>
        </div>
    )
}

export default Loading;
import "./DisplaySingleUserImage.css"

const DisplaySingleUserImage = ( {image} ) => {
    return (
        <div className="col-12 col-sm-10 col-md-10 col-lg-4 mb-2 mt-2 d-flex justify-content-center align-items-center">
            <img 
                src={`http://localhost:8000/static/${image}`}
                alt={`Box`}
                className="img-fluid fixed-size-image border border-gray-400"/>
        </div>
    )
}

export default DisplaySingleUserImage;
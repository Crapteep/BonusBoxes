import "./DisplaySingleUserImage.css";

const URL = process.env.REACT_APP_API_URL;

const DisplaySingleUserImage = ({ image }) => {
  return (
    <div className="col-12 col-sm-10 col-md-10 col-lg-4 mb-2 mt-2 d-flex justify-content-center align-items-center">
      <img
        src={`${URL}/static/${image}`}
        alt={image.slice(0, 5)}
        className="img-fluid fixed-size-image border border-gray-400"
      />
    </div>
  );
};

export default DisplaySingleUserImage;

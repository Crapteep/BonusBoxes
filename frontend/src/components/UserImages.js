import React, {useState, useEffect} from "react";
import axios from "axios";

const UserImages = ( {username} ) => {
    const [images, setImages] = useState([]);
        useEffect(() => {
            axios.get(`http://localhost:8000/user/images/${username}`)
            .then((res) => setImages(res.data.images))
            .catch((error) => console.error(error));
            
        }, [username, setImages]);


    return (
        <div className="row d-flex justify-content-center">
            {images.map((image, index) => (
                <div className="col-12 col-sm-10 col-md-10 col-lg-4 mb-2 mt-2" key={image}>
                    <img 
                        key={index}
                        src={`http://localhost:8000/static/${image}`}
                        alt={`Image ${index}`}
                        className="img-fluid border border-gray-400"/>
                </div>

            ))}
            
        </div>
    );
}

export default UserImages;
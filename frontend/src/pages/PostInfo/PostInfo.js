
import axios from "axios";
import React from "react";
import './PostInfo.css';

import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import UserImages from "../../components/UserImages";


const PostInfo = () => {
    const { id } = useParams();
    const [post, setPost] = useState([{}])
    const [isLoading, setIsLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost:8000/posts/${id}`).then(res =>
        setPost(res.data))
        setIsLoading(false);
      }, [id]);
      
    
      if (isLoading) {
        return <Loading />;
        
    }

    let hoverTimeout;
    const handleCardMouseEnter = () => {
        setIsHovered(true);
        clearTimeout(hoverTimeout);

    };

    const handleCardMouseLeave = () => {
        hoverTimeout = setTimeout(() => setIsHovered(false), 600);
    };

    return (
        <div className="container">
        {post?.users?.map((user) => (
        <div className="row " key={user.name}>
            <div className={`card my-3 border-2 border-dark fw-bold ${isHovered ? "hover-zoom" : ""}`}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
            >

            <h5 className="card-header ">{user.name}</h5>
            <div className="card-body ">
          
                <UserImages 
                    username={user.name}
                />

            </div>
            </div>
        </div>
        ))}
    </div>
    );
    };


export default PostInfo;

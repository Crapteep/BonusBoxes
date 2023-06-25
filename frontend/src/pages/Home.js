import React from "react";
import axios from 'axios'
import {useEffect, useState} from 'react'
import { Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Loading from "../components/Loading";

const Home = () => {

    const [postList, setPostList] = useState([{}])
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllPosts = () => {
        axios.get('http://localhost:8000/posts').then(res => {
          setPostList(res.data)
          setIsLoading(false);
        })
      };
    
      useEffect(() => {
        fetchAllPosts()
      }, []);


    return (
      <Container className="col-lg-8" fluid>

        <ListGroup numbered className="mt-3 font-size-lg" >
            {isLoading ? (
              <Loading />
            
            ) : (
              postList.map((post) => (
                <ListGroup.Item 
                key={post.id}
                action href={`/posts/${post.title}` } 
                variant='dark'
                className="text-center mb-1">
                    {post.title}
                </ListGroup.Item>
            )
            )  
            )}
        </ListGroup>
      </Container>
    );
}


export default Home;
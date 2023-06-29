import React from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { FiUsers } from 'react-icons/fi';
import usePostsData from '../hooks/usePostsData'


const Home = () => {

    const { isLoading, data } = usePostsData()

    return (

      <div className="container">
        {isLoading ? (<Loading />) : (

        data?.map((post) => (
          <Link to={`/posts/${post.title}`} style={{ textDecoration: "none" }}>
            <div className="row card my-3 border-1 ">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5>{post.title}</h5>
                  
                
                <div className="d-flex align-items-center">
                  {post.users.length}
                    <FiUsers className="m1-auto"/>
                </div>
              </div>
            
              <div className="card-body">
                {post.description ? post.description : "There is no description."}
              
              </div>
            </div>
            </Link>
        ))
      )}
  </div>


    );
}


export default Home;
import React from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import usePostsData from "../hooks/usePostsData";
// import AvailabilityStatus from "../components/AvailabilityStatus/AvailabilityStatus";

const Home = () => {
  const { isLoading, data } = usePostsData();
  document.title = "BonusBoxes - Home";
  if (isLoading) {
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container">
      {data?.length > 0 ? (
        data.map((post, index) => (
          <Link
            to={`/posts/${post.title}`}
            style={{ textDecoration: "none" }}
            key={index}
          >
            <div className="row card my-3 border-1">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <h5>{post.title}</h5>
                  {post.expired && (
                    <p
                      className="text-red-700 text-sm my-2"
                      style={{
                        textAlign: "right",
                        color: "red",
                        fontSize: "0.7rem",
                        marginLeft: "10px",
                      }}
                    >
                      Expired!
                    </p>
                  )}
                </div>
                <div className="d-flex align-items-center">
                  {post.users.length}
                  <FiUsers className="m1-auto" />
                </div>
              </div>

              <div className="card-body">
                {post.description
                  ? post.description
                  : "There is no description."}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="container my-5 d-flex justify-content-center align-items-center">
          <p>There are no available posts.</p>
        </div>
      )}
      <div style={{ marginBottom: "80px" }}></div>
    </div>
  );
};

export default Home;

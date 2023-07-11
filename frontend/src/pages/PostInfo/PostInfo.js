import React from "react";
import "./PostInfo.css";

import { useState } from "react";
import Loading from "../../components/Loading";
import UserImages from "../../components/UserImages";
import usePostData from "../../hooks/usePostData";

const PostInfo = () => {
  const [isHovered, setIsHovered] = useState(false);

  const { isLoading, data } = usePostData();

  let hoverTimeout;
  const handleCardMouseEnter = () => {
    setIsHovered(true);
    clearTimeout(hoverTimeout);
  };

  const handleCardMouseLeave = () => {
    hoverTimeout = setTimeout(() => setIsHovered(false), 600);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      {data?.users?.map((user) => (
        <div
          className={`row card my-3 border-2 border-dark fw-bold ${
            isHovered ? "hover-zoom" : ""
          }`}
          key={user.name}
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
        >
          <h5 className="card-header ">{user.name}</h5>
          <div className="card-body ">
            <UserImages user={user} />
          </div>
        </div>
      ))}

      <div style={{ "marginBottom": "80px" }}></div>
    </div>
  );
};

export default PostInfo;

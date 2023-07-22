import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./PostInfo.css";

import Loading from "../../components/Loading";
import UserImages from "../../components/UserImages";
import usePostData from "../../hooks/usePostData";

const PostInfo = () => {
  const URL = process.env.REACT_APP_API_URL;

  const [isHovered, setIsHovered] = useState(false);
  const [userIds, setUserIds] = useState([]);
  const { isLoading, data } = usePostData();
  const [accountInfo, setAccountInfo] = useState([]);

  let hoverTimeout;

  const handleCardMouseEnter = () => {
    setIsHovered(true);
    clearTimeout(hoverTimeout);
  };

  const handleCardMouseLeave = () => {
    hoverTimeout = setTimeout(() => setIsHovered(false), 600);
  };

  const fetchAllUsernames = useCallback(() => {
    axios.put(`${URL}/accounts/info`, userIds).then((response) => {
      setAccountInfo(response.data);
    });
  }, [URL, userIds]);

  useEffect(() => {
    fetchAllUsernames();
  }, [userIds]);

  useEffect(() => {
    if (data) {
      const Ids = data.users.map((user) => user.user_id);
      setUserIds(Ids);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  function getUsernameById(userId) {
    const user = accountInfo?.find((user) => user.id === userId);
    return user ? user.username : null;
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
          <h5 className="card-header ">{getUsernameById(user.user_id)}</h5>
          <div className="card-body ">
            <UserImages user={user} />
          </div>
        </div>
      ))}

      <div style={{ marginBottom: "80px" }}></div>
    </div>
  );
};

export default PostInfo;

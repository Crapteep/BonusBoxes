import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import useItemsData from "../hooks/useItemsData";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Typography,
  CircularProgress,
  Grid,
  styled,
  CardMedia,
} from "@mui/material";

const StyledCard = styled(Card)({
  margin: "15px",
});

const Dot = styled('span')({
  height: "20px",
  width: "20px",
  borderRadius: "50%",
  display: "inline-block",
  marginLeft: "5px",
  float: "right"
});

const StyledExpiredText = styled(Typography)({
  color: "red",
  fontSize: "0.7rem",
  marginLeft: "10px",
});

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
};

const PostCard = ({ post, currentTime }) => {
  const URL = process.env.REACT_APP_API_URL;

  const timeRemaining = formatTimeRemaining(currentTime, new Date(post.created_at));
  const isExpired = post.expired || formatTimeRemaining(currentTime, new Date(post.created_at)) === 'Expired!';
  const hours = parseInt(timeRemaining.split(':')[0], 10);
  const isAlmostExpired = hours < 6;
  

  return (
    <StyledCard 
      variant="outlined" 
      style={isExpired ? { position: 'relative', backgroundColor: "#f0f0f0" } : {}}
    >
      <CardHeader
        title={
          <Typography variant="h6">
            {post.name} 
            {post.disc_type === 'legendary' ? (
              <Dot style={{ backgroundColor: '#0070CC' }} />
            ) : post.disc_type === 'unique' ? (
              <Dot style={{ backgroundColor: '#6930F0' }} />
            ) : null}
          </Typography>
        }
        subheader={
          <div>
            <Typography variant="body2" color={isAlmostExpired ? 'error' : 'textSecondary'} component="p">
              {formatTimeRemaining(currentTime, new Date(post.created_at))}
            </Typography>
          </div>
        }
      />
      <div style={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={`${URL}/static/${post.image}`}
          alt={post.name}
          style={{ objectFit: 'contain', height: '220px' }}
        />
        {isExpired && (
          <div style={overlayStyle}>
            <Typography variant="h6" color="error">
              Expired!
            </Typography>
          </div>
        )}
      </div>
    </StyledCard>
  );
};

const Home = () => {
  const { isLoading, data } = useItemsData();
  document.title = "BonusBoxes - Home";

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
        <Grid container spacing={0}>
          {data.map((post, index) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
              <PostCard post={post} currentTime={currentTime} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="container my-5 d-flex justify-content-center align-items-center">
          <p>There are no available posts.</p>
        </div>
      )}
      <div style={{ marginBottom: "80px" }}></div>
    </div>
  );
};

const formatTimeRemaining = (currentTime, createdAt) => {
  const diffInMs = new Date(createdAt).getTime() + 12 * 60 * 60 * 1000 - currentTime.getTime();

  if (diffInMs <= 0) {
    return 'Expired!';
  }

  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default Home;

import { useEffect, React, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useNavigate } from "react-router-dom";

export default function Cards({ data, onDataFromChild }) {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  // Function to handle click event and send data to the parent component
  const sendDataToParent = (ID) => {
    // Assuming you want to send the 'childData' to the parent
    onDataFromChild(ID);
  };
  const navigateTo = (task) => {
    console.log("==========>", task)
    navigate(`modalList/?data=${encodeURIComponent(task)}`)
  }

  const cardStyle = {
    display: 'block',
    transitionDuration: '0.3s',
  };


  return (
    <Card
      style={{ ...cardStyle }}
      elevation={4}
      sx={{
        alignItems: 'center',
        marginBottom: 5,
        minHeight: 180,
        minWidth: 180,
        position: 'relative',
        transition: 'transform 0.3s',
        '&:hover': {
          cursor: 'pointer',
          transform: 'scale(1.1)',
        },
      }}
    >
      <CardContent>
        <Typography sx={{ color: 'darkblack' }} variant="h6" gutterBottom fontFamily="Roboto-Medium">{data.Task}</Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{
            fontSize: 14,
            cursor: 'pointer',
          }}
          onClick={() => setShowMore(!showMore)}
          fontFamily="Roboto-Light"
        >
          {showMore ? data.Description : `${data.Description.substring(0, 20)}...`}
          <span style={{ color: 'blue' }}>
            {showMore ? ' Show less' : ' Show more'}
          </span>
        </Typography>
      </CardContent>

      <div style={{ position: 'absolute', bottom: 0, right: 0, marginRight: 10, cursor: 'pointer' }}>
        <ArrowCircleRightIcon color="success" fontSize="large" onClick={() => sendDataToParent(data.ID)} />
      </div>
    </Card>
  );
}

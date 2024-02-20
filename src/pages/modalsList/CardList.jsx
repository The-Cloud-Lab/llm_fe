import { useEffect, React, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import MetaIcon from '../../assets/meta.png'



export const CardList = ({ data, sendDataToParent }) => {
  const [showMore, setShowMore] = useState(false);



  var cardStyle = {
    display: 'block',
    transitionDuration: '0.3s',


  }
  const handleClick = (data) => {
    sendDataToParent(data);

  };


  return (
    <Card style={cardStyle} elevation={4} sx={{
      alignItems: 'center', marginBottom: 5, minHeight: 270, minWidth: 180, position: 'relative'
    }}>
      <CardContent sx={{ justifyContent: 'center', textAlign: 'center' }}>
        <img src={MetaIcon} alt="MetaIcon" style={{ maxWidth: '20%', maxHeight: '20%', objectFit: 'contain' }} />
        <Typography sx={{ color: '#000000' }} variant="h6" gutterBottom>{data.model_id}</Typography>
        <div style={{marginTop:30}}>
        <Typography sx={{ color: '#000000' }} variant="h8" gutterBottom>Downloads: {data.hits}</Typography>
        </div>
        <div>
        <Typography sx={{ color: '#000000' }} variant="h8" gutterBottom>Ram Required: {data.memory}</Typography>
        </div>


          <span style={{ color: 'blue' }}>
            <div style={{ position: 'absolute', bottom: 0, right: 0, marginRight: 10, cursor: 'pointer' }}>
              <ArrowCircleRightIcon color="success" fontSize="large" onClick={()=>handleClick(data.model_id)} />
            </div>

          </span>
  
      </CardContent>
    </Card>

  )
}